import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { FeedbackEntry } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // API 키 확인
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      console.error('GOOGLE_AI_API_KEY is not set');
      return NextResponse.json(
        { error: 'Google AI API 키가 설정되지 않았습니다. .env.local 파일을 확인해주세요.' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

    const { imageBase64, mimeType, feedbackHistory } = await request.json();

    if (!imageBase64) {
      return NextResponse.json({ error: '이미지가 필요합니다.' }, { status: 400 });
    }

    // 피드백 히스토리를 프롬프트에 포함 (스마트 요약)
    let feedbackContext = '';
    if (feedbackHistory && feedbackHistory.length > 0) {
      const feedbackList = feedbackHistory as FeedbackEntry[];

      // 피드백을 패턴별로 분석
      const corrections: string[] = [];

      feedbackList.forEach((f) => {
        // 제목 수정 패턴
        if (f.originalData.title && f.correctedData.title && f.originalData.title !== f.correctedData.title) {
          corrections.push(`"${f.originalData.title}"는 실제로 "${f.correctedData.title}"입니다.`);
        }

        // 재료 수정 패턴 (추가/삭제/변경)
        const origIngNames = (f.originalData.ingredients || []).map(i => i.name);
        const corrIngNames = (f.correctedData.ingredients || []).map(i => i.name);
        const addedIngs = corrIngNames.filter(n => !origIngNames.includes(n) && n);
        const removedIngs = origIngNames.filter(n => !corrIngNames.includes(n) && n);

        if (addedIngs.length > 0) {
          corrections.push(`${f.title || f.correctedData.title}: 누락된 재료 - ${addedIngs.join(', ')}`);
        }
        if (removedIngs.length > 0) {
          corrections.push(`${f.title || f.correctedData.title}: 잘못 추측한 재료 - ${removedIngs.join(', ')}`);
        }
      });

      if (corrections.length > 0) {
        feedbackContext = `
중요 - 이전 사용자 피드백 (총 ${feedbackList.length}건):
${corrections.slice(0, 15).map((c, i) => `${i + 1}. ${c}`).join('\n')}

위 피드백을 참고하여 더 정확하게 분석해주세요.
`;
      }
    }

    const prompt = `당신은 요리 전문가입니다. 이 음식 사진을 분석하여 레시피를 추측해주세요.

${feedbackContext}

다음 JSON 형식으로만 응답해주세요 (다른 텍스트 없이):
{
  "title": "요리 이름",
  "description": "요리 설명 (1-2문장)",
  "ingredients": [
    {"name": "재료명", "amount": "추정량", "unit": "단위"}
  ],
  "steps": [
    {"order": 1, "instruction": "추정 조리 단계", "duration": "예상 시간(선택)", "tip": "팁(선택)"}
  ],
  "confidence": 0.0 ~ 1.0 (추측 신뢰도)
}

- 보이는 재료를 기반으로 추측
- 한국 요리일 가능성이 높으면 한국식 레시피로
- 확실하지 않은 부분은 신뢰도를 낮게 설정
- 한국어로 자연스럽게 작성`;

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: imageBase64,
        },
      },
      prompt,
    ]);

    const response = result.response;
    const text = response.text();

    // JSON 파싱
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('JSON parsing failed, response:', text);
      return NextResponse.json({ error: 'JSON 파싱 실패' }, { status: 500 });
    }

    const parsedResult = JSON.parse(jsonMatch[0]);
    return NextResponse.json(parsedResult);
  } catch (error) {
    console.error('Image analysis error:', error);

    let errorMessage = '분석 중 오류가 발생했습니다.';
    if (error instanceof Error) {
      if (error.message.includes('API_KEY') || error.message.includes('401')) {
        errorMessage = 'API 키가 유효하지 않습니다. 설정을 확인해주세요.';
      } else if (error.message.includes('429') || error.message.includes('quota')) {
        errorMessage = 'API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.';
      }
      console.error('Error details:', error.message);
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
