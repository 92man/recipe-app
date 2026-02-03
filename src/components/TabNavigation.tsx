'use client';

import { useStore } from '@/store/useStore';

export default function TabNavigation() {
  const { activeTab, setActiveTab, recipes } = useStore();

  const tabs = [
    {
      id: 'voice' as const,
      label: '음성',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
    },
    {
      id: 'image' as const,
      label: 'AI분석',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'search' as const,
      label: '검색',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      id: 'list' as const,
      label: '레시피',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      badge: recipes.length > 0 ? recipes.length : undefined,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 safe-area-bottom">
      <div className="max-w-md mx-auto px-4 pb-2">
        <div className="glass rounded-2xl border border-warm-200/50 shadow-lifted">
          <div className="flex justify-around py-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex flex-col items-center py-2 px-5 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'text-accent-600'
                      : 'text-warm-400 hover:text-warm-600'
                  }`}
                >
                  {/* 활성 배경 */}
                  {isActive && (
                    <span className="absolute inset-0 bg-accent-100/60 rounded-xl" />
                  )}

                  {/* 아이콘 */}
                  <span className={`relative transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                    {tab.icon}
                  </span>

                  {/* 라벨 */}
                  <span className={`relative text-[10px] mt-1 font-medium tracking-tight ${
                    isActive ? 'text-accent-700' : ''
                  }`}>
                    {tab.label}
                  </span>

                  {/* 배지 */}
                  {tab.badge && (
                    <span className="badge absolute -top-0.5 -right-0.5">
                      {tab.badge > 99 ? '99+' : tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
