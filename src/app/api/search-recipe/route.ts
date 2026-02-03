import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error('GROQ_API_KEY is not set');
      return NextResponse.json(
        { error: 'API 설정 오류입니다. 관리자에게 문의해주세요.' },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey });

    const { dishName } = await request.json();

    if (!dishName || dishName.trim().length === 0) {
      return NextResponse.json({ error: '요리 이름을 입력해주세요.' }, { status: 400 });
    }

    const prompt = `당신은 요리 레시피 전문가입니다. "${dishName}" 레시피를 알려주세요.

다음 JSON 형식으로만 응답해주세요 (다른 텍스트 없이):
{
  "title": "정확한 요리 이름",
  "description": "요리 소개 (2-3문장, 역사나 특징 포함)",
  "ingredients": [
    {"name": "재료명", "amount": "양", "unit": "단위"}
  ],
  "steps": [
    {"order": 1, "instruction": "상세한 조리 단계", "duration": "소요시간", "tip": "팁(선택)"}
  ],
  "servings": "몇 인분",
  "totalTime": "총 조리시간",
  "difficulty": "난이도 (쉬움/보통/어려움)",
  "confidence": 1.0
}

요구사항:
- 실제로 존재하는 요리라면 정확한 레시피를 제공
- 재료는 2인분 기준으로 구체적인 양 명시
- 조리 단계는 초보자도 따라할 수 있도록 상세히
- 각 단계별 대략적인 소요시간 포함
- 중요한 팁이나 주의사항 포함
- 한국어로 자연스럽게 작성
- 만약 알 수 없는 요리라면 가장 유사한 요리를 추천`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 2048,
    });

    const text = completion.choices[0]?.message?.content || '';

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('JSON parsing failed, response:', text);
      return NextResponse.json({ error: 'JSON 파싱 실패' }, { status: 500 });
    }

    const parsedResult = JSON.parse(jsonMatch[0]);
    return NextResponse.json(parsedResult);
  } catch (error) {
    console.error('Recipe search error:', error);

    let errorMessage = '레시피 검색 중 오류가 발생했습니다.';
    if (error instanceof Error) {
      if (error.message.includes('API_KEY') || error.message.includes('401')) {
        errorMessage = 'API 키가 유효하지 않습니다.';
      } else if (error.message.includes('429') || error.message.includes('quota') || error.message.includes('rate')) {
        errorMessage = 'API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.';
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
