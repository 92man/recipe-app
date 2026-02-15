import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

const PUBLIC_PATHS = ['/', '/login', '/signup', '/auth'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 공개 경로 및 API 인증 불필요 경로는 미들웨어 건너뛰기
  if (PUBLIC_PATHS.some(p => pathname === p) || pathname.startsWith('/auth/')) {
    return NextResponse.next();
  }

  try {
    return await updateSession(request);
  } catch {
    // Supabase 연결 실패 시 요청을 차단하지 않고 통과시킴
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest\\.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
