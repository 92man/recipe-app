import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

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

interface VideoInfo {
  title: string;
  description: string;
  transcript: string | null;
}

async function getVideoInfo(videoId: string): Promise<VideoInfo | null> {
  try {
    // YouTube 페이지에서 정보 추출
    const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8'
      }
    });
    const html = await response.text();

    // ytInitialPlayerResponse에서 정보 추출
    const playerMatch = html.match(/ytInitialPlayerResponse\s*=\s*(\{.+?\});/s);
    if (!playerMatch) {
      return null;
    }

    const playerData = JSON.parse(playerMatch[1]);
    const videoDetails = playerData.videoDetails;

    if (!videoDetails) {
      return null;
    }

    // 자막 가져오기 시도
    let transcript: string | null = null;
    const captions = playerData.captions?.playerCaptionsTracklistRenderer?.captionTracks;

    if (captions && captions.length > 0) {
      const track = captions.find((c: { languageCode: string }) => c.languageCode === 'ko') || captions[0];

      // 다양한 방식으로 자막 가져오기 시도
      try {
        // json3 형식으로 시도
        const captionUrl = track.baseUrl + '&fmt=json3';
        const captionRes = await fetch(captionUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Referer': `https://www.youtube.com/watch?v=${videoId}`
          }
        });

        if (captionRes.ok) {
          const captionData = await captionRes.json();
          if (captionData.events) {
            const texts = captionData.events
              .filter((e: { segs?: Array<{ utf8?: string }> }) => e.segs)
              .map((e: { segs: Array<{ utf8?: string }> }) => e.segs.map((s: { utf8?: string }) => s.utf8 || '').join(''))
              .join(' ');
            if (texts.length > 50) {
              transcript = texts;
            }
          }
        }
      } catch {
        // 자막 가져오기 실패 - description으로 대체
      }
    }

    return {
      title: videoDetails.title || '',
      description: videoDetails.shortDescription || '',
      transcript
    };
  } catch (error) {
    console.error('Failed to get video info:', error);
    return null;
  }
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

    // 영상 정보 가져오기
    const videoInfo = await getVideoInfo(videoId);
    if (!videoInfo) {
      return NextResponse.json({
        error: '영상 정보를 가져올 수 없습니다. URL을 확인해주세요.'
      }, { status: 400 });
    }

    // 자막 또는 설명 중 하나 이상 있어야 함
    const hasContent = (videoInfo.transcript && videoInfo.transcript.length > 50) ||
      (videoInfo.description && videoInfo.description.length > 100);

    if (!hasContent) {
      return NextResponse.json({
        error: '영상에서 레시피 정보를 찾을 수 없습니다. 자막이나 설명이 있는 요리 영상을 시도해주세요.'
      }, { status: 400 });
    }

    // Gemini로 레시피 추출
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const contentSource = videoInfo.transcript
      ? `자막 내용:\n${videoInfo.transcript.slice(0, 8000)}`
      : `영상 설명:\n${videoInfo.description.slice(0, 4000)}`;

    const prompt = `당신은 요리 영상의 내용을 분석하여 레시피를 추출하는 전문가입니다.

다음 YouTube 요리 영상의 정보를 분석하여 레시피를 정리해주세요.

영상 제목: ${videoInfo.title}

${contentSource}

다음 JSON 형식으로 응답해주세요:
{
  "title": "요리 이름",
  "description": "요리에 대한 간단한 설명 (1-2문장)",
  "ingredients": ["재료1 (용량)", "재료2 (용량)", ...],
  "steps": ["조리 단계 1", "조리 단계 2", ...]
}

규칙:
1. 내용에서 언급된 재료와 용량을 최대한 정확하게 추출하세요
2. 조리 단계는 명확하고 따라하기 쉽게 정리하세요
3. 요리 팁이나 주의사항도 단계에 포함시키세요
4. 자막이 불완전해도 문맥을 파악하여 레시피를 구성하세요
5. 영상 제목을 참고하여 요리 이름을 정확하게 파악하세요
6. 요리 관련 내용이 없으면 에러 메시지를 포함한 JSON을 반환하세요
7. 반드시 유효한 JSON만 응답하세요`;

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

    // 에러 체크
    if (recipeData.error) {
      return NextResponse.json({
        error: recipeData.error
      }, { status: 400 });
    }

    return NextResponse.json({
      title: recipeData.title || videoInfo.title || '유튜브 레시피',
      description: recipeData.description || '',
      ingredients: recipeData.ingredients || [],
      steps: recipeData.steps || [],
      source: 'youtube',
      videoId,
      usedTranscript: !!videoInfo.transcript
    });

  } catch (error) {
    console.error('YouTube analysis error:', error);
    return NextResponse.json({
      error: '영상 분석 중 오류가 발생했습니다. 다시 시도해주세요.'
    }, { status: 500 });
  }
}
