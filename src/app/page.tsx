'use client';

import { useStore } from '@/store/useStore';
import { useAuth } from '@/components/AuthProvider';
import VoiceRecorder from '@/components/VoiceRecorder';
import ImageAnalyzer from '@/components/ImageAnalyzer';
import RecipeList from '@/components/RecipeList';
import RecipeSearch from '@/components/RecipeSearch';
import TabNavigation from '@/components/TabNavigation';
import AuthForm from '@/components/AuthForm';
import Footer from '@/components/Footer';

export default function Home() {
  const { activeTab } = useStore();
  const { user, loading, signOut } = useAuth();

  // 로딩 중
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-50 to-orange-50">
        <div className="text-center">
          <span className="text-5xl animate-bounce inline-block">🍳</span>
          <p className="text-warm-500 mt-4">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 로그인 안 된 경우
  if (!user) {
    return <AuthForm />;
  }

  return (
    <main className="min-h-screen max-w-md mx-auto relative">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 bg-gradient-to-b from-warm-50 via-warm-50 to-transparent pt-safe">
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between">
            <h1 className="font-handwriting text-2xl text-warm-800 flex items-center gap-2">
              <span className="text-3xl">🍳</span>
              맛있는 기록
            </h1>
            <button
              onClick={signOut}
              className="text-sm text-warm-500 hover:text-warm-700 transition-colors"
            >
              로그아웃
            </button>
          </div>
          <p className="text-sm text-warm-500 mt-1">
            {activeTab === 'voice' && '음성으로 레시피를 기록하세요'}
            {activeTab === 'image' && '사진으로 레시피를 분석하세요'}
            {activeTab === 'search' && '요리 이름으로 레시피를 검색하세요'}
            {activeTab === 'list' && '저장된 레시피를 확인하세요'}
          </p>
        </div>
        <div className="h-4 bg-gradient-to-b from-warm-50/80 to-transparent" />
      </header>

      {/* 탭 콘텐츠 */}
      <div className="relative">
        {activeTab === 'voice' && <VoiceRecorder />}
        {activeTab === 'image' && <ImageAnalyzer />}
        {activeTab === 'search' && <RecipeSearch />}
        {activeTab === 'list' && <RecipeList />}
      </div>

      {/* 푸터 */}
      <Footer />

      {/* 하단 네비게이션 */}
      <TabNavigation />
    </main>
  );
}
