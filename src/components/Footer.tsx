'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-10 px-5 mb-24">
      <div className="max-w-md mx-auto">
        {/* 브랜드 */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-3xl">🍳</span>
          <div className="text-center">
            <span className="font-handwriting text-xl block" style={{ color: 'var(--text-primary)' }}>
              맛있는 기록
            </span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              AI 레시피 노트
            </span>
          </div>
        </div>

        {/* 설명 */}
        <p
          className="text-center text-sm mb-6 leading-relaxed max-w-xs mx-auto"
          style={{ color: 'var(--text-tertiary)' }}
        >
          음성으로 레시피를 기록하고, 사진으로 요리를 분석하세요.
          AI가 당신의 요리를 더 쉽게 만들어드립니다.
        </p>

        {/* 링크들 - 1행 */}
        <div className="flex justify-center gap-4 text-sm mb-3">
          <Link
            href="/about"
            className="transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-600)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            서비스 소개
          </Link>
          <span style={{ color: 'var(--border-medium)' }}>·</span>
          <Link
            href="/faq"
            className="transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-600)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            자주 묻는 질문
          </Link>
          <span style={{ color: 'var(--border-medium)' }}>·</span>
          <Link
            href="/contact"
            className="transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-600)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            문의하기
          </Link>
        </div>

        {/* 링크들 - 2행 */}
        <div className="flex justify-center gap-4 text-sm mb-6">
          <Link
            href="/privacy"
            className="transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-600)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            개인정보처리방침
          </Link>
          <span style={{ color: 'var(--border-medium)' }}>·</span>
          <Link
            href="/terms"
            className="transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-600)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            이용약관
          </Link>
        </div>

        {/* 소셜 & 지원 */}
        <div className="flex justify-center gap-3 mb-6">
          <Link
            href="/guide"
            className="content-card px-4 py-2 text-xs font-medium flex items-center gap-1.5"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span>📚</span> 가이드
          </Link>
          <Link
            href="/tips"
            className="content-card px-4 py-2 text-xs font-medium flex items-center gap-1.5"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span>💡</span> 요리 팁
          </Link>
          <Link
            href="/recipes"
            className="content-card px-4 py-2 text-xs font-medium flex items-center gap-1.5"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span>🍲</span> 레시피
          </Link>
        </div>

        {/* 구분선 */}
        <div className="divider mb-6" />

        {/* 저작권 */}
        <p className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} 맛있는 기록. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
