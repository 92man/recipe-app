import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { FeedbackEntry } from '@/types';
import { getAuthUser, unauthorizedResponse } from '@/lib/auth';

const anthropic = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) return unauthorizedResponse();

    const { transcript, feedbackHistory } = await request.json();

    if (!transcript) {
      return NextResponse.json({ error: '음성 텍스트가 필요합니다.' }, { status: 400 });
    }

    // 피드백 히스토리를 프롬프트에 포함
    let feedbackContext = '';
    if (feedbackHistory && feedbackHistory.length > 0) {
      feedbackContext = `
참고: 이전에 사용자가 수정한 내용입니다. 이를 바탕으로 더 정확하게 분석해주세요:
${(feedbackHistory as FeedbackEntry[]).map((f) => `
- 원본: ${JSON.stringify(f.originalData)}
- 수정됨: ${JSON.stringify(f.correctedData)}
`).join('\n')}
`;
    }

    console.log('Transcript received:', transcript);

    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `당신은 요리 레시피 전문가입니다. 다음 음성 녹음 텍스트를 분석하여 레시피로 정리해주세요.

음성 텍스트:
"${transcript}"

${feedbackContext}

다음 JSON 형식으로만 응답해주세요 (다른 텍스트 없이):
{
  "title": "요리 이름",
  "description": "간단한 설명 (1-2문장)",
  "ingredients": [
    {"name": "재료명", "amount": "양", "unit": "단위"}
  ],
  "steps": [
    {"order": 1, "instruction": "조리 단계", "duration": "소요시간(선택)", "tip": "팁(선택)"}
  ],
  "confidence": 0.0 ~ 1.0 (분석 신뢰도)
}

- 양과 단위가 명확하지 않으면 "적당량", "약간" 등으로 표시
- 조리 순서는 논리적으로 정리
- 한국어로 자연스럽게 작성`,
        },
      ],
    });

    console.log('API response:', JSON.stringify(message.content));

    const content = message.content[0];
    if (content.type !== 'text') {
      return NextResponse.json({ error: '응답 형식 오류' }, { status: 500 });
    }

    // JSON 파싱
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'JSON 파싱 실패' }, { status: 500 });
    }

    const result = JSON.parse(jsonMatch[0]);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Voice analysis error:', error);
    return NextResponse.json(
      { error: '분석 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
