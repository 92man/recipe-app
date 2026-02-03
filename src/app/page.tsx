'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { useAuth } from '@/components/AuthProvider';
import VoiceRecorder from '@/components/VoiceRecorder';
import ImageAnalyzer from '@/components/ImageAnalyzer';
import RecipeList from '@/components/RecipeList';
import RecipeSearch from '@/components/RecipeSearch';
import TabNavigation from '@/components/TabNavigation';
import AuthForm from '@/components/AuthForm';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';

// 인기 레시피 데이터
const featuredRecipes = [
  { id: 'kimchi-jjigae', title: '김치찌개', emoji: '🍲', time: '30분', category: '한식' },
  { id: 'bulgogi', title: '불고기', emoji: '🥩', time: '40분', category: '한식' },
  { id: 'carbonara', title: '카르보나라', emoji: '🍝', time: '25분', category: '양식' },
  { id: 'fried-rice', title: '볶음밥', emoji: '🍚', time: '15분', category: '중식' },
];

// 요리 팁 데이터
const quickTips = [
  { icon: '🧂', title: '소금 간은 마지막에', desc: '조리 중 수분이 증발하므로 간은 마지막에 맞추세요' },
  { icon: '🔥', title: '팬 예열의 중요성', desc: '충분히 달궈진 팬에서 재료를 볶아야 식감이 살아요' },
  { icon: '🥬', title: '채소 보관법', desc: '키친타올로 감싸 보관하면 신선도가 오래 유지됩니다' },
  { icon: '🍖', title: '고기 해동 팁', desc: '냉장실에서 천천히 해동하면 육즙 손실이 적어요' },
];

// 계절 추천 레시피
const seasonalRecipes = [
  { title: '따뜻한 국물 요리', items: ['김치찌개', '된장찌개', '육개장', '순두부찌개'], icon: '🍜' },
  { title: '간편한 한 그릇', items: ['비빔밥', '덮밥', '볶음밥', '국수'], icon: '🍚' },
  { title: '건강한 반찬', items: ['나물무침', '두부조림', '계란찜', '멸치볶음'], icon: '🥗' },
];

// 앱 기능 소개
const appFeatures = [
  {
    icon: '🎤',
    title: '음성 레시피 기록',
    desc: '요리하면서 음성으로 레시피를 기록하세요. AI가 자동으로 정리해드립니다.',
  },
  {
    icon: '📸',
    title: 'AI 사진 분석',
    desc: '완성된 요리 사진을 업로드하면 AI가 재료와 조리법을 추측해드립니다.',
  },
  {
    icon: '🔍',
    title: '레시피 검색',
    desc: '요리 이름으로 검색하면 상세한 레시피 정보를 확인할 수 있습니다.',
  },
  {
    icon: '📖',
    title: '내 레시피 저장',
    desc: '기록한 레시피를 저장하고 언제든지 다시 확인할 수 있습니다.',
  },
];

export default function Home() {
  const { activeTab } = useStore();
  const { user, loading, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // 로딩 중
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center grain" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center animate-fade-in">
          <div className="relative mb-4">
            <span className="text-8xl block animate-float drop-shadow-lg">🍳</span>
            <div className="absolute inset-0 blur-3xl rounded-full" style={{ background: 'var(--accent-200)', opacity: 0.3 }} />
          </div>
          <h1 className="font-handwriting text-3xl mb-1" style={{ color: 'var(--text-primary)' }}>
            맛있는 기록
          </h1>
          <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--text-muted)' }}>
            AI Recipe Note
          </p>
          <div className="flex items-center justify-center gap-1">
            <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--accent-400)', animationDelay: '0ms' }} />
            <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--accent-400)', animationDelay: '150ms' }} />
            <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--accent-400)', animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  // 로그인 모달
  if (showAuthModal && !user) {
    return (
      <div className="relative grain">
        <button
          onClick={() => setShowAuthModal(false)}
          className="absolute top-6 right-6 z-50 icon-btn"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <AuthForm />
      </div>
    );
  }

  const tabDescriptions: Record<string, { title: string; subtitle: string; icon: string }> = {
    voice: { title: '음성 레시피', subtitle: '요리하며 음성으로 기록하세요', icon: '🎤' },
    image: { title: 'AI 분석', subtitle: '사진으로 레시피를 분석해요', icon: '📸' },
    search: { title: '레시피 검색', subtitle: '요리 이름으로 검색하세요', icon: '🔍' },
    list: { title: '내 레시피', subtitle: '저장된 레시피를 확인하세요', icon: '📖' },
  };

  return (
    <main className="min-h-screen max-w-md mx-auto relative grain">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 pt-safe">
        <div className="glass border-b" style={{ borderColor: 'var(--border-light)' }}>
          <div className="px-5 pt-5 pb-4">
            {/* 상단 헤더 - 3열 레이아웃 */}
            <div className="flex items-center justify-between mb-4 opacity-0 animate-fade-in-up">
              {/* 왼쪽: 테마 토글 */}
              <div className="w-20 flex justify-start">
                <ThemeToggle />
              </div>

              {/* 가운데: 로고 */}
              <Link href="/" className="flex flex-col items-center group">
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg animate-float mb-1">
                  🍳
                </span>
                <h1 className="font-handwriting text-2xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  맛있는 기록
                </h1>
                <p className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
                  AI Recipe Note
                </p>
              </Link>

              {/* 오른쪽: 로그인/로그아웃 */}
              <div className="w-20 flex flex-col items-end">
                {user ? (
                  <>
                    <span
                      className="text-[10px] font-medium truncate max-w-[80px] mb-0.5"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {user.email?.split('@')[0]}
                    </span>
                    <button
                      onClick={signOut}
                      className="btn-ghost text-xs whitespace-nowrap py-1 px-2"
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="btn-primary text-xs py-2 px-3 whitespace-nowrap"
                  >
                    로그인
                  </button>
                )}
              </div>
            </div>

            {/* 네비게이션 메뉴 */}
            <nav className="grid grid-cols-3 gap-2 opacity-0 animate-fade-in-up delay-1">
              <Link
                href="/recipes"
                className="content-card py-2.5 px-2 text-center hover:shadow-md transition-all"
              >
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>인기 레시피</span>
              </Link>
              <Link
                href="/guide"
                className="content-card py-2.5 px-2 text-center hover:shadow-md transition-all"
              >
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>요리 가이드</span>
              </Link>
              <Link
                href="/tips"
                className="content-card py-2.5 px-2 text-center hover:shadow-md transition-all"
              >
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>요리 팁</span>
              </Link>
            </nav>
          </div>

          {/* 현재 탭 설명 */}
          <div className="px-5 pb-4 opacity-0 animate-fade-in-up delay-2">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: 'var(--accent-100)' }}
              >
                {tabDescriptions[activeTab]?.icon}
              </div>
              <div>
                <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {tabDescriptions[activeTab]?.title}
                </h2>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {tabDescriptions[activeTab]?.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 탭 콘텐츠 */}
      <div className="relative opacity-0 animate-fade-in-up delay-3">
        {!user && (activeTab === 'voice' || activeTab === 'image' || activeTab === 'list') ? (
          <div className="p-5">
            {/* 로그인 필요 안내 */}
            <div className="recipe-card p-8 text-center mb-6">
              <div
                className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center"
                style={{ background: 'var(--accent-100)' }}
              >
                <svg className="w-8 h-8" style={{ color: 'var(--accent-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                로그인이 필요해요
              </h2>
              <p className="text-sm mb-6 leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-muted)' }}>
                {activeTab === 'voice' && '음성으로 레시피를 기록하려면\n로그인해주세요.'}
                {activeTab === 'image' && 'AI 레시피 분석 기능을\n사용하려면 로그인해주세요.'}
                {activeTab === 'list' && '저장된 레시피를 확인하려면\n로그인해주세요.'}
              </p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="btn-primary"
              >
                로그인하기
              </button>
            </div>

            {/* 비로그인 사용자를 위한 콘텐츠 */}
            <HomeContent />
          </div>
        ) : (
          <>
            {activeTab === 'voice' && <VoiceRecorder />}
            {activeTab === 'image' && <ImageAnalyzer />}
            {activeTab === 'search' && (
              <div>
                <RecipeSearch />
                <div className="px-5 pb-6">
                  <HomeContent />
                </div>
              </div>
            )}
            {activeTab === 'list' && <RecipeList />}
          </>
        )}
      </div>

      {/* 푸터 */}
      <Footer />

      {/* 하단 네비게이션 */}
      <TabNavigation />
    </main>
  );
}

// 홈 콘텐츠 컴포넌트 (풍부한 콘텐츠를 위해 분리)
function HomeContent() {
  return (
    <div className="space-y-8">
      {/* 인기 레시피 섹션 */}
      <section className="opacity-0 animate-fade-in-up delay-4">
        <div className="section-header">
          <h3 className="section-title flex items-center gap-2">
            <span>🔥</span> 인기 레시피
          </h3>
          <Link href="/recipes" className="section-link">
            더보기 →
          </Link>
        </div>
        <div className="horizontal-scroll -mx-5 px-5">
          {featuredRecipes.map((recipe, idx) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="recipe-card p-4 w-36 opacity-0 animate-slide-in-right"
              style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
            >
              <div className="text-4xl mb-3">{recipe.emoji}</div>
              <h4 className="font-medium text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                {recipe.title}
              </h4>
              <div className="flex items-center gap-2">
                <span className="badge-subtle text-xs">{recipe.category}</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{recipe.time}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 앱 기능 소개 섹션 */}
      <section className="opacity-0 animate-fade-in-up delay-5">
        <h3 className="section-title flex items-center gap-2 mb-4">
          <span>✨</span> 이렇게 사용하세요
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {appFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="content-card p-4"
            >
              <div className="feature-icon mb-3">{feature.icon}</div>
              <h4 className="font-medium text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                {feature.title}
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 요리 팁 섹션 */}
      <section className="opacity-0 animate-fade-in-up delay-6">
        <div className="section-header">
          <h3 className="section-title flex items-center gap-2">
            <span>💡</span> 오늘의 요리 팁
          </h3>
          <Link href="/tips" className="section-link">
            더보기 →
          </Link>
        </div>
        <div className="space-y-3">
          {quickTips.slice(0, 2).map((tip, idx) => (
            <div
              key={idx}
              className="content-card p-4 flex items-start gap-3"
            >
              <div className="feature-icon flex-shrink-0">{tip.icon}</div>
              <div>
                <h4 className="font-medium text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                  {tip.title}
                </h4>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 계절 추천 섹션 */}
      <section>
        <h3 className="section-title flex items-center gap-2 mb-4">
          <span>🍂</span> 추천 카테고리
        </h3>
        <div className="space-y-3">
          {seasonalRecipes.map((category, idx) => (
            <div
              key={idx}
              className="feature-card p-4"
            >
              <div className="relative z-10 flex items-center gap-3">
                <div className="text-3xl">{category.icon}</div>
                <div>
                  <h4 className="font-medium text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                    {category.title}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {category.items.map((item, i) => (
                      <span key={i} className="tag text-xs">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 앱 소개 배너 */}
      <section className="recipe-card p-6 text-center" style={{ background: 'var(--gradient-warm)' }}>
        <div className="text-4xl mb-3">🍳</div>
        <h3 className="font-handwriting text-xl mb-2" style={{ color: 'var(--text-primary)' }}>
          나만의 레시피 노트를 만들어보세요
        </h3>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          음성으로 기록하고, 사진으로 분석하고,<br />
          소중한 레시피를 저장하세요.
        </p>
        <div className="flex justify-center gap-2">
          <span className="tag-accent">무료 사용</span>
          <span className="tag-accent">AI 분석</span>
          <span className="tag-accent">클라우드 저장</span>
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="grid grid-cols-3 gap-3">
        <div className="content-card p-4 text-center">
          <div className="stat-value" style={{ color: 'var(--accent-600)' }}>100+</div>
          <div className="stat-label">레시피</div>
        </div>
        <div className="content-card p-4 text-center">
          <div className="stat-value" style={{ color: 'var(--accent-600)' }}>AI</div>
          <div className="stat-label">자동 분석</div>
        </div>
        <div className="content-card p-4 text-center">
          <div className="stat-value" style={{ color: 'var(--accent-600)' }}>24h</div>
          <div className="stat-label">언제든지</div>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section>
        <h3 className="section-title flex items-center gap-2 mb-4">
          <span>❓</span> 자주 묻는 질문
        </h3>
        <div className="space-y-3">
          <details className="content-card">
            <summary className="p-4 cursor-pointer font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
              음성 기록은 어떻게 사용하나요?
            </summary>
            <div className="px-4 pb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
              하단의 음성 탭을 선택한 후 마이크 버튼을 누르고 요리 과정을 설명해주세요.
              AI가 자동으로 재료와 조리 순서를 정리해드립니다.
            </div>
          </details>
          <details className="content-card">
            <summary className="p-4 cursor-pointer font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
              사진 분석의 정확도는 어떤가요?
            </summary>
            <div className="px-4 pb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
              AI가 완성된 요리 사진을 분석하여 예상되는 재료와 조리법을 추측합니다.
              분석 결과는 수정할 수 있으며, 피드백을 통해 점점 더 정확해집니다.
            </div>
          </details>
          <details className="content-card">
            <summary className="p-4 cursor-pointer font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
              저장된 레시피는 안전한가요?
            </summary>
            <div className="px-4 pb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
              모든 레시피는 클라우드에 안전하게 저장됩니다.
              계정에 로그인하면 어느 기기에서든 레시피를 확인할 수 있습니다.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
