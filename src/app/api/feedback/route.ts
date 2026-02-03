import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';
import { FeedbackEntry } from '@/types';

const FEEDBACK_KEY = 'recipe:feedback';
const MAX_FEEDBACK = 200; // 최대 200개 피드백 저장

// Redis 클라이언트를 lazy 초기화
function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (!url || !token) {
    throw new Error('Redis 환경 변수가 설정되지 않았습니다.');
  }

  return new Redis({ url, token });
}

// 피드백 조회
export async function GET(request: NextRequest) {
  try {
    const redis = getRedis();
    const { searchParams } = new URL(request.url);
    const source = searchParams.get('source'); // 'image' | 'voice' | null
    const limit = parseInt(searchParams.get('limit') || '10');

    const feedbackList = await redis.lrange<FeedbackEntry>(FEEDBACK_KEY, 0, MAX_FEEDBACK - 1);

    let filtered = feedbackList || [];

    // source 필터링
    if (source) {
      filtered = filtered.filter(f => f.source === source);
    }

    return NextResponse.json({
      feedback: filtered.slice(0, limit),
      total: filtered.length,
    });
  } catch (error) {
    console.error('Feedback GET error:', error);
    return NextResponse.json({ error: '피드백 조회 실패' }, { status: 500 });
  }
}

// 피드백 저장
export async function POST(request: NextRequest) {
  try {
    const redis = getRedis();
    const feedback: FeedbackEntry = await request.json();

    if (!feedback.id || !feedback.title) {
      return NextResponse.json({ error: '필수 필드 누락' }, { status: 400 });
    }

    // 리스트 앞에 추가
    await redis.lpush(FEEDBACK_KEY, feedback);

    // 최대 개수 유지
    await redis.ltrim(FEEDBACK_KEY, 0, MAX_FEEDBACK - 1);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Feedback POST error:', error);
    return NextResponse.json({ error: '피드백 저장 실패' }, { status: 500 });
  }
}
