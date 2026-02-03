'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-8 px-5 mb-24">
      <div className="max-w-md mx-auto">
        {/* 브랜드 */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="text-2xl">🍳</span>
          <span className="font-handwriting text-lg text-warm-700">맛있는 기록</span>
        </div>

        {/* 링크들 */}
        <div className="flex justify-center gap-4 text-xs text-warm-500 mb-5">
          <Link href="/about" className="hover:text-accent-600 transition-colors">
            서비스 소개
          </Link>
          <span className="text-warm-300">·</span>
          <Link href="/privacy" className="hover:text-accent-600 transition-colors">
            개인정보처리방침
          </Link>
          <span className="text-warm-300">·</span>
          <Link href="/terms" className="hover:text-accent-600 transition-colors">
            이용약관
          </Link>
        </div>

        {/* 저작권 */}
        <p className="text-center text-[11px] text-warm-400">
          © 2024 맛있는 기록. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
