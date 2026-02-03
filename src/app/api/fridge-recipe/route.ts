import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { ingredients, preference } = await request.json();

    if (!ingredients || ingredients.length === 0) {
      return NextResponse.json(
        { error: '재료를 1개 이상 입력해주세요.' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `당신은 한국 요리 전문가입니다. 사용자가 가진 재료로 만들 수 있는 레시피를 추천해주세요.

사용자가 가진 재료: ${ingredients.join(', ')}
${preference ? `사용자가 원하는 음식 종류/스타일: ${preference}` : ''}

다음 조건을 만족하는 레시피 3개를 추천해주세요:
1. 가능하면 사용자가 가진 재료만으로 만들 수 있는 요리
2. 부족한 재료가 있다면 일반적으로 집에 있는 기본 양념(소금, 간장, 설탕, 참기름, 고추장, 된장 등)은 있다고 가정
3. 한국 가정에서 쉽게 만들 수 있는 요리 위주
4. 난이도와 조리시간을 고려하여 다양하게 추천

반드시 아래 JSON 형식으로만 응답하세요. 다른 텍스트 없이 JSON만 출력하세요:
{
  "recommendations": [
    {
      "name": "요리 이름",
      "description": "요리에 대한 간단한 설명 (1-2문장)",
      "matchedIngredients": ["사용자가 가진 재료 중 이 요리에 사용되는 것들"],
      "missingIngredients": ["이 요리에 필요하지만 사용자가 없는 재료들 (기본 양념 제외)"],
      "difficulty": "쉬움/보통/어려움",
      "cookingTime": "예: 20분, 30분",
      "steps": [
        "조리 순서 1",
        "조리 순서 2",
        "조리 순서 3"
      ]
    }
  ]
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // JSON 파싱
    let jsonText = text;

    // 마크다운 코드 블록 제거
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }

    // JSON 파싱 시도
    const parsed = JSON.parse(jsonText.trim());

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Fridge recipe error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'AI 응답을 처리하는 중 오류가 발생했습니다. 다시 시도해주세요.' },
        { status: 500 }
      );
    }

    // API key 관련 에러
    if (errorMessage.includes('API key') || errorMessage.includes('API_KEY')) {
      return NextResponse.json(
        { error: 'API 설정 오류입니다. 관리자에게 문의해주세요.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: `레시피 추천 중 오류가 발생했습니다: ${errorMessage}` },
      { status: 500 }
    );
  }
}
