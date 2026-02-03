import Link from 'next/link';

export const metadata = {
  title: '인기 레시피 모음 - 맛있는 기록 | 한식, 양식, 중식 레시피',
  description: '가장 인기 있는 한식, 양식, 중식 레시피를 만나보세요. 초보자도 쉽게 따라할 수 있는 상세한 레시피와 조리법을 제공합니다. 김치찌개, 불고기, 카르보나라 등 다양한 요리 레시피.',
  keywords: ['레시피', '한식', '양식', '중식', '요리법', '김치찌개', '불고기', '카르보나라', '요리 초보'],
};

const popularRecipes = [
  {
    id: 'kimchi-jjigae',
    title: '김치찌개',
    description: '깊은 맛이 일품인 한국인의 소울푸드. 잘 익은 김치와 돼지고기의 조화가 완벽한 국물 요리입니다.',
    category: '한식',
    difficulty: '쉬움',
    time: '30분',
    emoji: '🍲',
    tags: ['국물요리', '돼지고기', '김치'],
  },
  {
    id: 'doenjang-jjigae',
    title: '된장찌개',
    description: '구수한 된장향이 가득한 건강식. 두부와 채소가 어우러진 영양 만점 찌개입니다.',
    category: '한식',
    difficulty: '쉬움',
    time: '25분',
    emoji: '🥘',
    tags: ['국물요리', '두부', '채소'],
  },
  {
    id: 'bulgogi',
    title: '불고기',
    description: '달콤한 양념에 재운 부드러운 소고기. 밥반찬으로도, 쌈으로도 완벽한 메인 요리입니다.',
    category: '한식',
    difficulty: '보통',
    time: '40분',
    emoji: '🥩',
    tags: ['소고기', '메인요리', '밥반찬'],
  },
  {
    id: 'japchae',
    title: '잡채',
    description: '명절에 빠질 수 없는 잔치 음식. 당면과 다양한 채소, 고기가 어우러진 영양식입니다.',
    category: '한식',
    difficulty: '보통',
    time: '45분',
    emoji: '🍜',
    tags: ['당면', '잔치음식', '명절'],
  },
  {
    id: 'carbonara',
    title: '카르보나라',
    description: '크리미한 이탈리안 파스타의 정석. 베이컨과 달걀, 치즈의 풍미가 일품입니다.',
    category: '양식',
    difficulty: '보통',
    time: '25분',
    emoji: '🍝',
    tags: ['파스타', '이탈리안', '베이컨'],
  },
  {
    id: 'fried-rice',
    title: '볶음밥',
    description: '남은 재료로 뚝딱 만드는 한 그릇. 간단하지만 맛있는 한 끼 식사가 됩니다.',
    category: '중식',
    difficulty: '쉬움',
    time: '15분',
    emoji: '🍚',
    tags: ['간편식', '볶음', '한그릇'],
  },
];

const categories = [
  { name: '한식', emoji: '🇰🇷', count: 45, color: 'var(--accent-100)' },
  { name: '양식', emoji: '🍝', count: 28, color: 'var(--info-bg)' },
  { name: '중식', emoji: '🥡', count: 22, color: 'var(--error-bg)' },
  { name: '일식', emoji: '🍣', count: 18, color: 'var(--success-bg)' },
];

const cookingTips = [
  { title: '김치찌개 꿀팁', tip: '김치를 먼저 볶아주면 더 깊은 맛이 납니다' },
  { title: '불고기 꿀팁', tip: '배즙을 넣으면 고기가 더 부드러워집니다' },
  { title: '파스타 꿀팁', tip: '면수를 조금 넣으면 소스가 더 잘 어우러집니다' },
];

export default function RecipesPage() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto p-6 pb-20">
      {/* 뒤로가기 */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-6 text-sm font-medium transition-colors"
        style={{ color: 'var(--accent-600)' }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        홈으로
      </Link>

      {/* 헤더 */}
      <header className="mb-8">
        <h1
          className="font-handwriting text-3xl mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          인기 레시피 모음
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          가장 많이 찾는 레시피들을 모았습니다. 상세한 조리법과 함께 맛있는 요리를 만들어보세요.
        </p>
      </header>

      {/* 카테고리 */}
      <section className="mb-8">
        <h2 className="section-title mb-4">카테고리별 레시피</h2>
        <div className="grid grid-cols-4 gap-3">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="content-card p-4 text-center cursor-pointer hover:shadow-md transition-all"
            >
              <span className="text-2xl block mb-2">{cat.emoji}</span>
              <span className="text-sm font-medium block" style={{ color: 'var(--text-primary)' }}>
                {cat.name}
              </span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {cat.count}개
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 레시피 목록 */}
      <section className="mb-10">
        <h2 className="section-title mb-4">전체 레시피</h2>
        <div className="grid gap-4">
          {popularRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="recipe-card p-5 flex gap-4"
            >
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--accent-100)' }}
              >
                <span className="text-3xl">{recipe.emoji}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3
                    className="font-semibold truncate"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {recipe.title}
                  </h3>
                  <span className="badge-subtle text-xs flex-shrink-0">
                    {recipe.category}
                  </span>
                </div>
                <p
                  className="text-sm mb-2 line-clamp-2"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {recipe.description}
                </p>
                <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                  <span>난이도: {recipe.difficulty}</span>
                  <span>소요시간: {recipe.time}</span>
                </div>
                <div className="flex gap-1.5 mt-2">
                  {recipe.tags.map((tag) => (
                    <span key={tag} className="tag text-xs py-1 px-2">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 요리 팁 */}
      <section className="mb-10">
        <h2 className="section-title mb-4">요리 꿀팁</h2>
        <div className="space-y-3">
          {cookingTips.map((item, idx) => (
            <div
              key={idx}
              className="content-card p-4 flex items-start gap-3"
            >
              <span className="text-xl">💡</span>
              <div>
                <h4
                  className="font-medium text-sm mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.title}
                </h4>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  {item.tip}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA 배너 */}
      <section
        className="recipe-card p-6 text-center"
        style={{ background: 'var(--gradient-warm)' }}
      >
        <h3
          className="font-handwriting text-xl mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          더 많은 레시피가 필요하신가요?
        </h3>
        <p
          className="text-sm mb-4"
          style={{ color: 'var(--text-secondary)' }}
        >
          앱에서 레시피 검색 기능을 이용하시면 수천 가지 요리의 레시피를 확인할 수 있습니다.
        </p>
        <Link href="/" className="btn-primary inline-block">
          앱에서 검색하기
        </Link>
      </section>

      {/* SEO 콘텐츠 */}
      <section className="mt-10">
        <h2 className="section-title mb-4">요리 가이드</h2>
        <div className="prose prose-sm" style={{ color: 'var(--text-tertiary)' }}>
          <p className="mb-4">
            맛있는 기록은 여러분의 요리 생활을 더욱 풍요롭게 만들어드립니다.
            초보자부터 숙련된 요리사까지, 누구나 쉽게 따라할 수 있는 레시피를 제공합니다.
          </p>
          <p className="mb-4">
            <strong style={{ color: 'var(--text-secondary)' }}>한식</strong>: 김치찌개, 된장찌개, 불고기 등 전통 한국 요리의 정수를 담았습니다.
            정확한 계량과 조리 순서로 본연의 맛을 재현할 수 있습니다.
          </p>
          <p className="mb-4">
            <strong style={{ color: 'var(--text-secondary)' }}>양식</strong>: 파스타, 스테이크, 샐러드 등 서양 요리를 가정에서도 쉽게 만들어보세요.
            레스토랑 못지않은 맛을 경험하실 수 있습니다.
          </p>
          <p>
            <strong style={{ color: 'var(--text-secondary)' }}>중식</strong>: 볶음밥, 짜장면, 탕수육 등 중국 요리의 풍미를 집에서 즐겨보세요.
            간단한 재료로도 풍성한 한 끼를 만들 수 있습니다.
          </p>
        </div>
      </section>
    </main>
  );
}
