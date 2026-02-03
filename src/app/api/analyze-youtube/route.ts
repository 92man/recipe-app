import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { YoutubeTranscript } from 'youtube-transcript';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

async function fetchTranscript(videoId: string): Promise<string | null> {
  // 시도할 언어 목록 (자동 생성 자막 포함)
  const languages = ['ko', 'en', 'ja', 'zh-Hans', 'zh-Hant'];

  // 1. 먼저 언어 지정 없이 시도 (자동 생성 자막 포함)
  try {
    const items = await YoutubeTranscript.fetchTranscript(videoId);
    if (items && items.length > 0) {
      return items.map(item => item.text).join(' ');
    }
  } catch {
    // 실패하면 다음 시도
  }

  // 2. 각 언어별로 시도
  for (const lang of languages) {
    try {
      const items = await YoutubeTranscript.fetchTranscript(videoId, { lang });
      if (items && items.length > 0) {
        return items.map(item => item.text).join(' ');
      }
    } catch {
      // 실패하면 다음 언어 시도
      continue;
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const { youtubeUrl } = await request.json();

    if (!youtubeUrl) {
      return NextResponse.json({ error: 'YouTube URL이 필요합니다.' }, { status: 400 });
    }

    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      return NextResponse.json({ error: '유효한 YouTube URL이 아닙니다.' }, { status: 400 });
    }

    // YouTube 자막 가져오기 (자동 생성 자막 포함)
    const transcript = await fetchTranscript(videoId);

    if (!transcript) {
      return NextResponse.json({
        error: '자막을 가져올 수 없습니다. 이 영상에는 자막(자동 생성 포함)이 없거나 비공개 상태입니다.'
      }, { status: 400 });
    }

    if (transcript.trim().length < 50) {
      return NextResponse.json({
        error: '자막 내용이 너무 짧습니다. 다른 영상을 시도해주세요.'
      }, { status: 400 });
    }

    // Gemini로 레시피 추출
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `당신은 요리 영상의 자막을 분석하여 레시피를 추출하는 전문가입니다.

다음 YouTube 요리 영상의 자막을 분석하여 레시피를 정리해주세요.
자막은 자동 생성된 것일 수 있어서 오타나 불완전한 문장이 있을 수 있습니다.
문맥을 파악하여 최대한 정확하게 레시피를 추출해주세요.

자막 내용:
${transcript.slice(0, 10000)}

다음 JSON 형식으로 응답해주세요:
{
  "title": "요리 이름",
  "description": "요리에 대한 간단한 설명 (1-2문장)",
  "ingredients": ["재료1 (용량)", "재료2 (용량)", ...],
  "steps": ["조리 단계 1", "조리 단계 2", ...]
}

규칙:
1. 자막에서 언급된 재료와 용량을 최대한 정확하게 추출하세요
2. 조리 단계는 명확하고 따라하기 쉽게 정리하세요
3. 요리 팁이나 주의사항도 단계에 포함시키세요
4. 자막이 불완전해도 문맥을 파악하여 레시피를 구성하세요
5. 자막에 요리 관련 내용이 전혀 없으면 에러를 반환하세요
6. 반드시 유효한 JSON만 응답하세요`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // JSON 추출
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({
        error: '영상에서 레시피를 추출할 수 없습니다. 요리 영상인지 확인해주세요.'
      }, { status: 400 });
    }

    const recipeData = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      title: recipeData.title || '유튜브 레시피',
      description: recipeData.description || '',
      ingredients: recipeData.ingredients || [],
      steps: recipeData.steps || [],
      source: 'youtube',
      videoId
    });

  } catch (error) {
    console.error('YouTube analysis error:', error);
    return NextResponse.json({
      error: '영상 분석 중 오류가 발생했습니다. 다시 시도해주세요.'
    }, { status: 500 });
  }
}
