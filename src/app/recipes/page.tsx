import Link from 'next/link';

export const metadata = {
  title: '인기 레시피 모음 - 맛있는 기록 | 한식, 양식, 중식 레시피',
  description: '가장 인기 있는 한식, 양식, 중식 레시피를 만나보세요. 초보자도 쉽게 따라할 수 있는 상세한 레시피와 조리법을 제공합니다. 김치찌개, 불고기, 카르보나라 등 다양한 요리 레시피.',
  keywords: ['레시피', '한식', '양식', '중식', '요리법', '김치찌개', '불고기', '카르보나라', '요리 초보'],
  alternates: { canonical: '/recipes' },
  openGraph: { url: '/recipes' },
};

const popularRecipes = [
  // 한식
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
    id: 'bibimbap',
    title: '비빔밥',
    description: '형형색색 나물과 고추장의 조화. 영양 균형이 완벽한 한국 대표 음식입니다.',
    category: '한식',
    difficulty: '보통',
    time: '40분',
    emoji: '🍚',
    tags: ['밥요리', '나물', '건강식'],
  },
  {
    id: 'samgyeopsal',
    title: '삼겹살 구이',
    description: '두툼한 삼겹살을 노릇하게 구워 쌈채소와 함께. 한국인이 사랑하는 고기 요리입니다.',
    category: '한식',
    difficulty: '쉬움',
    time: '30분',
    emoji: '🥓',
    tags: ['고기', '구이', '회식'],
  },
  {
    id: 'tteokbokki',
    title: '떡볶이',
    description: '매콤달콤한 국민 간식. 쫄깃한 떡과 어묵이 어우러진 추억의 분식입니다.',
    category: '한식',
    difficulty: '쉬움',
    time: '25분',
    emoji: '🍢',
    tags: ['분식', '떡', '매운맛'],
  },
  {
    id: 'sundubu-jjigae',
    title: '순두부찌개',
    description: '부드러운 순두부와 얼큰한 국물. 속이 확 풀리는 건강한 한 끼 식사입니다.',
    category: '한식',
    difficulty: '쉬움',
    time: '20분',
    emoji: '🥣',
    tags: ['국물요리', '두부', '얼큰'],
  },
  {
    id: 'gimbap',
    title: '김밥',
    description: '한 입에 쏙 들어가는 한국식 롤. 소풍과 나들이에 빠질 수 없는 도시락 메뉴입니다.',
    category: '한식',
    difficulty: '보통',
    time: '40분',
    emoji: '🍙',
    tags: ['도시락', '김', '간편식'],
  },
  {
    id: 'jeyuk-bokkeum',
    title: '제육볶음',
    description: '매콤한 양념에 볶은 돼지고기의 불맛. 밥 한 공기 뚝딱 비우게 만드는 밥도둑입니다.',
    category: '한식',
    difficulty: '보통',
    time: '30분',
    emoji: '🔥',
    tags: ['돼지고기', '매운맛', '밥반찬'],
  },
  {
    id: 'dakgalbi',
    title: '닭갈비',
    description: '매콤한 양념에 닭고기와 채소를 볶은 춘천 대표 음식. 치즈를 올리면 더욱 맛있습니다.',
    category: '한식',
    difficulty: '보통',
    time: '35분',
    emoji: '🍗',
    tags: ['닭고기', '매운맛', '철판'],
  },
  {
    id: 'gamjatang',
    title: '감자탕',
    description: '돼지 등뼈를 푹 끓인 진한 국물의 탕 요리. 해장에도 좋은 든든한 한 끼입니다.',
    category: '한식',
    difficulty: '보통',
    time: '50분',
    emoji: '🥘',
    tags: ['국물요리', '돼지고기', '해장'],
  },
  {
    id: 'gyeran-jjim',
    title: '계란찜',
    description: '폭신폭신 부드러운 달걀 반찬. 아이부터 어른까지 좋아하는 가정식 메뉴입니다.',
    category: '한식',
    difficulty: '쉬움',
    time: '15분',
    emoji: '🥚',
    tags: ['반찬', '달걀', '간편식'],
  },
  {
    id: 'janchi-guksu',
    title: '잔치국수',
    description: '맑은 멸치 육수에 소면을 말아 먹는 따뜻한 국수. 정겨운 잔치의 맛입니다.',
    category: '한식',
    difficulty: '쉬움',
    time: '20분',
    emoji: '🍜',
    tags: ['면요리', '국물', '잔치'],
  },
  {
    id: 'dakbokkeum-tang',
    title: '닭볶음탕',
    description: '매콤하게 조린 닭과 감자의 든든한 한 냄비. 온 가족 함께 먹기 좋은 요리입니다.',
    category: '한식',
    difficulty: '보통',
    time: '45분',
    emoji: '🍗',
    tags: ['닭고기', '매운맛', '탕'],
  },
  // 양식
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
    id: 'tomato-pasta',
    title: '토마토 파스타',
    description: '새콤달콤한 토마토 소스와 쫄깃한 면발. 기본에 충실한 클래식 파스타입니다.',
    category: '양식',
    difficulty: '쉬움',
    time: '25분',
    emoji: '🍅',
    tags: ['파스타', '토마토', '이탈리안'],
  },
  {
    id: 'cream-pasta',
    title: '크림 파스타',
    description: '부드럽고 고소한 크림 소스. 아이들도 좋아하는 달콤한 파스타입니다.',
    category: '양식',
    difficulty: '쉬움',
    time: '25분',
    emoji: '🥛',
    tags: ['파스타', '크림', '부드러움'],
  },
  {
    id: 'steak',
    title: '스테이크',
    description: '겉바속촉 완벽한 굽기의 비프 스테이크. 특별한 날을 위한 고급 메인 요리입니다.',
    category: '양식',
    difficulty: '어려움',
    time: '30분',
    emoji: '🥩',
    tags: ['소고기', '메인요리', '특별한날'],
  },
  {
    id: 'omurice',
    title: '오므라이스',
    description: '부드러운 달걀에 감싸진 케첩 볶음밥. 아이 어른 모두가 좋아하는 메뉴입니다.',
    category: '양식',
    difficulty: '보통',
    time: '25분',
    emoji: '🍳',
    tags: ['볶음밥', '달걀', '케첩'],
  },
  {
    id: 'gambas',
    title: '감바스',
    description: '마늘향 가득한 올리브오일에 새우를 볶은 스페인 타파스. 바게트와 함께 즐기세요.',
    category: '양식',
    difficulty: '쉬움',
    time: '15분',
    emoji: '🦐',
    tags: ['새우', '타파스', '와인안주'],
  },
  {
    id: 'risotto',
    title: '리조또',
    description: '크리미한 이탈리안 쌀 요리. 버터와 치즈의 풍미가 어우러진 부드러운 한 그릇입니다.',
    category: '양식',
    difficulty: '보통',
    time: '35분',
    emoji: '🍚',
    tags: ['쌀요리', '이탈리안', '크림'],
  },
  {
    id: 'french-toast',
    title: '프렌치토스트',
    description: '계란물에 적신 빵을 버터에 구운 달콤한 브런치. 메이플시럽과 함께 즐기세요.',
    category: '양식',
    difficulty: '쉬움',
    time: '15분',
    emoji: '🍞',
    tags: ['브런치', '달콤', '아침식사'],
  },
  {
    id: 'hamburg-steak',
    title: '함박스테이크',
    description: '육즙 가득한 수제 햄버그 스테이크. 데미글라스 소스를 곁들인 정통 양식입니다.',
    category: '양식',
    difficulty: '보통',
    time: '30분',
    emoji: '🍖',
    tags: ['소고기', '메인요리', '소스'],
  },
  // 중식
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
  {
    id: 'jjajangmyeon',
    title: '짜장면',
    description: '춘장의 깊은 맛이 배인 면요리. 배달음식 1위, 집에서 만드는 정통 짜장면입니다.',
    category: '중식',
    difficulty: '보통',
    time: '35분',
    emoji: '🍜',
    tags: ['면요리', '춘장', '배달음식'],
  },
  {
    id: 'jjamppong',
    title: '짬뽕',
    description: '얼큰한 해물 국물에 쫄깃한 면. 시원하게 땀 흘리며 먹는 중화 요리입니다.',
    category: '중식',
    difficulty: '보통',
    time: '40분',
    emoji: '🌶️',
    tags: ['면요리', '해물', '얼큰'],
  },
  {
    id: 'tangsuyuk',
    title: '탕수육',
    description: '바삭한 튀김옷과 새콤달콤 소스. 찍먹 vs 부먹 논쟁의 주인공입니다.',
    category: '중식',
    difficulty: '어려움',
    time: '50분',
    emoji: '🍖',
    tags: ['튀김', '돼지고기', '파티음식'],
  },
  {
    id: 'mapo-tofu',
    title: '마파두부',
    description: '얼얼하고 매콤한 사천식 두부 요리. 부드러운 두부와 매운 소스가 밥과 완벽한 궁합입니다.',
    category: '중식',
    difficulty: '보통',
    time: '25분',
    emoji: '🌶️',
    tags: ['두부', '매운맛', '사천'],
  },
  {
    id: 'kkangpung-gi',
    title: '깐풍기',
    description: '바삭한 튀김 닭에 매콤달콤 소스를 입힌 요리. 밥반찬이나 안주로 최고입니다.',
    category: '중식',
    difficulty: '어려움',
    time: '40분',
    emoji: '🍗',
    tags: ['닭고기', '튀김', '매콤달콤'],
  },
  // 일식
  {
    id: 'katsudon',
    title: '카츠동',
    description: '바삭한 돈카츠와 부드러운 달걀. 일본식 덮밥의 대표 메뉴입니다.',
    category: '일식',
    difficulty: '보통',
    time: '35분',
    emoji: '🍱',
    tags: ['덮밥', '돈카츠', '달걀'],
  },
  {
    id: 'udon',
    title: '우동',
    description: '쫄깃한 면발과 깔끔한 국물. 추운 날 몸을 녹여주는 따뜻한 면 요리입니다.',
    category: '일식',
    difficulty: '쉬움',
    time: '20분',
    emoji: '🍜',
    tags: ['면요리', '국물', '따뜻함'],
  },
  {
    id: 'curry-rice',
    title: '카레라이스',
    description: '향신료 가득한 일본식 카레. 온 가족이 좋아하는 편안한 한 끼입니다.',
    category: '일식',
    difficulty: '쉬움',
    time: '40분',
    emoji: '🍛',
    tags: ['카레', '밥요리', '가족식사'],
  },
  {
    id: 'takoyaki',
    title: '타코야키',
    description: '동글동글 귀여운 문어빵. 겉바속촉 일본 길거리 간식의 대명사입니다.',
    category: '일식',
    difficulty: '보통',
    time: '30분',
    emoji: '🐙',
    tags: ['간식', '문어', '길거리음식'],
  },
  {
    id: 'gyudon',
    title: '규동',
    description: '달콤짭짤한 소고기 덮밥. 간단하지만 든든한 일본식 패스트푸드입니다.',
    category: '일식',
    difficulty: '쉬움',
    time: '25분',
    emoji: '🥩',
    tags: ['덮밥', '소고기', '간편식'],
  },
  {
    id: 'ramen',
    title: '라멘',
    description: '진한 육수에 쫄깃한 면과 다양한 토핑. 깊고 풍부한 맛의 일본식 라면입니다.',
    category: '일식',
    difficulty: '보통',
    time: '30분',
    emoji: '🍜',
    tags: ['면요리', '국물', '토핑'],
  },
  {
    id: 'oyakodon',
    title: '오야코동',
    description: '닭고기와 부드러운 반숙 계란의 덮밥. 간단하면서도 깊은 맛의 일본 가정식입니다.',
    category: '일식',
    difficulty: '쉬움',
    time: '20분',
    emoji: '🍛',
    tags: ['덮밥', '닭고기', '달걀'],
  },
  {
    id: 'tendon',
    title: '텐동',
    description: '바삭한 텐푸라를 올린 달콤짭짤한 덮밥. 새우와 채소 튀김의 조화가 일품입니다.',
    category: '일식',
    difficulty: '보통',
    time: '30분',
    emoji: '🍤',
    tags: ['덮밥', '튀김', '새우'],
  },
];

const categories = [
  { name: '한식', emoji: '🇰🇷', count: 15, color: 'var(--accent-100)', slug: 'korean' },
  { name: '양식', emoji: '🍝', count: 9, color: 'var(--info-bg)', slug: 'western' },
  { name: '중식', emoji: '🥡', count: 6, color: 'var(--error-bg)', slug: 'chinese' },
  { name: '일식', emoji: '🍣', count: 8, color: 'var(--success-bg)', slug: 'japanese' },
];

const cookingTips = [
  { title: '김치찌개 꿀팁', tip: '김치를 먼저 볶아주면 더 깊은 맛이 납니다' },
  { title: '불고기 꿀팁', tip: '배즙을 넣으면 고기가 더 부드러워집니다' },
  { title: '파스타 꿀팁', tip: '면수를 조금 넣으면 소스가 더 잘 어우러집니다' },
  { title: '감바스 꿀팁', tip: '마늘은 약불에서 천천히 볶아야 향이 깊어집니다' },
  { title: '라멘 꿀팁', tip: '면은 살짝 덜 익혀서 국물에 넣으면 쫄깃함이 유지됩니다' },
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
            <Link
              key={cat.name}
              href={`/recipes/category/${cat.slug}`}
              className="content-card p-4 text-center cursor-pointer hover:shadow-md transition-all"
            >
              <span className="text-2xl block mb-2">{cat.emoji}</span>
              <span className="text-sm font-medium block" style={{ color: 'var(--text-primary)' }}>
                {cat.name}
              </span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {cat.count}개
              </span>
            </Link>
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
            <strong style={{ color: 'var(--text-secondary)' }}>한식</strong>: 김치찌개, 된장찌개, 불고기, 비빔밥, 삼겹살, 떡볶이, 제육볶음, 닭갈비, 감자탕, 잔치국수 등 전통 한국 요리의 정수를 담았습니다.
            정확한 계량과 조리 순서로 본연의 맛을 재현할 수 있습니다.
          </p>
          <p className="mb-4">
            <strong style={{ color: 'var(--text-secondary)' }}>양식</strong>: 파스타, 스테이크, 오므라이스, 감바스, 리조또, 프렌치토스트, 함박스테이크 등 서양 요리를 가정에서도 쉽게 만들어보세요.
            레스토랑 못지않은 맛을 경험하실 수 있습니다.
          </p>
          <p className="mb-4">
            <strong style={{ color: 'var(--text-secondary)' }}>중식</strong>: 볶음밥, 짜장면, 짬뽕, 탕수육, 마파두부, 깐풍기 등 중국 요리의 풍미를 집에서 즐겨보세요.
            간단한 재료로도 풍성한 한 끼를 만들 수 있습니다.
          </p>
          <p>
            <strong style={{ color: 'var(--text-secondary)' }}>일식</strong>: 카츠동, 우동, 카레라이스, 타코야키, 규동, 라멘, 오야코동, 텐동 등 일본 요리를 집에서 즐겨보세요.
            정갈하고 깔끔한 맛의 일식을 직접 만들어보실 수 있습니다.
          </p>
        </div>
      </section>
    </main>
  );
}
