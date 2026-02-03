import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';
import { Recipe } from '@/types';

const RECIPES_KEY = 'recipe:recipes';
const MAX_RECIPES = 500;

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (!url || !token) {
    throw new Error('Redis 환경 변수가 설정되지 않았습니다.');
  }

  return new Redis({ url, token });
}

// 레시피 목록 조회
export async function GET() {
  try {
    const redis = getRedis();
    const recipes = await redis.lrange<Recipe>(RECIPES_KEY, 0, MAX_RECIPES - 1);

    return NextResponse.json({
      recipes: recipes || [],
      total: recipes?.length || 0,
    });
  } catch (error) {
    console.error('Recipes GET error:', error);
    return NextResponse.json({ error: '레시피 조회 실패' }, { status: 500 });
  }
}

// 레시피 저장
export async function POST(request: NextRequest) {
  try {
    const redis = getRedis();
    const recipe: Recipe = await request.json();

    if (!recipe.id || !recipe.title) {
      return NextResponse.json({ error: '필수 필드 누락' }, { status: 400 });
    }

    // 기존 레시피 가져오기
    const existingRecipes = await redis.lrange<Recipe>(RECIPES_KEY, 0, MAX_RECIPES - 1) || [];

    // 중복 제거 (같은 ID면 업데이트)
    const filteredRecipes = existingRecipes.filter(r => r.id !== recipe.id);

    // 새 레시피를 맨 앞에 추가
    const newRecipes = [recipe, ...filteredRecipes].slice(0, MAX_RECIPES);

    // 전체 덮어쓰기
    await redis.del(RECIPES_KEY);
    if (newRecipes.length > 0) {
      await redis.rpush(RECIPES_KEY, ...newRecipes);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Recipes POST error:', error);
    return NextResponse.json({ error: '레시피 저장 실패' }, { status: 500 });
  }
}

// 레시피 삭제
export async function DELETE(request: NextRequest) {
  try {
    const redis = getRedis();
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID 필요' }, { status: 400 });
    }

    // 기존 레시피 가져오기
    const existingRecipes = await redis.lrange<Recipe>(RECIPES_KEY, 0, MAX_RECIPES - 1) || [];

    // 해당 ID 제외
    const filteredRecipes = existingRecipes.filter(r => r.id !== id);

    // 전체 덮어쓰기
    await redis.del(RECIPES_KEY);
    if (filteredRecipes.length > 0) {
      await redis.rpush(RECIPES_KEY, ...filteredRecipes);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Recipes DELETE error:', error);
    return NextResponse.json({ error: '레시피 삭제 실패' }, { status: 500 });
  }
}
