import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '한식 레시피 모음 - 맛있는 기록 | 김치찌개, 불고기, 비빔밥',
  description: '전통 한국 요리 레시피를 만나보세요. 김치찌개, 된장찌개, 불고기, 비빔밥, 삼겹살 등 한국인이 사랑하는 한식 요리법을 상세히 알려드립니다.',
  keywords: ['한식', '한국요리', '김치찌개', '불고기', '비빔밥', '된장찌개', '레시피'],
};

const koreanRecipes = [
  {
    id: 'kimchi-jjigae',
    title: '김치찌개',
    description: '깊은 맛이 일품인 한국인의 소울푸드. 잘 익은 김치와 돼지고기의 조화가 완벽한 국물 요리입니다.',
    difficulty: '쉬움',
    time: '30분',
    emoji: '🍲',
    tags: ['국물요리', '돼지고기', '김치'],
  },
  {
    id: 'doenjang-jjigae',
    title: '된장찌개',
    description: '구수한 된장향이 가득한 건강식. 두부와 채소가 어우러진 영양 만점 찌개입니다.',
    difficulty: '쉬움',
    time: '25분',
    emoji: '🥘',
    tags: ['국물요리', '두부', '채소'],
  },
  {
    id: 'bulgogi',
    title: '불고기',
    description: '달콤한 양념에 재운 부드러운 소고기. 밥반찬으로도, 쌈으로도 완벽한 메인 요리입니다.',
    difficulty: '보통',
    time: '40분',
    emoji: '🥩',
    tags: ['소고기', '메인요리', '밥반찬'],
  },
  {
    id: 'japchae',
    title: '잡채',
    description: '명절에 빠질 수 없는 잔치 음식. 당면과 다양한 채소, 고기가 어우러진 영양식입니다.',
    difficulty: '보통',
    time: '45분',
    emoji: '🍜',
    tags: ['당면', '잔치음식', '명절'],
  },
  {
    id: 'bibimbap',
    title: '비빔밥',
    description: '형형색색 나물과 고추장의 조화. 영양 균형이 완벽한 한국 대표 음식입니다.',
    difficulty: '보통',
    time: '40분',
    emoji: '🍚',
    tags: ['밥요리', '나물', '건강식'],
  },
  {
    id: 'samgyeopsal',
    title: '삼겹살 구이',
    description: '두툼한 삼겹살을 노릇하게 구워 쌈채소와 함께. 한국인이 사랑하는 고기 요리입니다.',
    difficulty: '쉬움',
    time: '30분',
    emoji: '🥓',
    tags: ['고기', '구이', '회식'],
  },
  {
    id: 'tteokbokki',
    title: '떡볶이',
    description: '매콤달콤한 국민 간식. 쫄깃한 떡과 어묵이 어우러진 추억의 분식입니다.',
    difficulty: '쉬움',
    time: '25분',
    emoji: '🍢',
    tags: ['분식', '떡', '매운맛'],
  },
  {
    id: 'sundubu-jjigae',
    title: '순두부찌개',
    description: '부드러운 순두부와 얼큰한 국물. 속이 확 풀리는 건강한 한 끼 식사입니다.',
    difficulty: '쉬움',
    time: '20분',
    emoji: '🥣',
    tags: ['국물요리', '두부', '얼큰'],
  },
  {
    id: 'gimbap',
    title: '김밥',
    description: '한 입에 쏙 들어가는 한국식 롤. 소풍과 나들이에 빠질 수 없는 도시락 메뉴입니다.',
    difficulty: '보통',
    time: '40분',
    emoji: '🍙',
    tags: ['도시락', '김', '간편식'],
  },
];

export default function KoreanRecipesPage() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto p-6 pb-20">
      {/* 브레드크럼 */}
      <nav className="text-sm mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-warm-500">
          <li><Link href="/" className="hover:text-orange-600">홈</Link></li>
          <li>/</li>
          <li><Link href="/recipes" className="hover:text-orange-600">레시피</Link></li>
          <li>/</li>
          <li className="text-warm-700 font-medium">한식</li>
        </ol>
      </nav>

      {/* 헤더 */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">🇰🇷</span>
          <div>
            <h1 className="text-3xl font-bold text-warm-800">한식 레시피</h1>
            <p className="text-warm-600">전통의 맛을 담은 한국 요리</p>
          </div>
        </div>
        <p className="text-warm-600 leading-relaxed">
          김치찌개, 불고기, 비빔밥 등 한국인의 소울푸드를 집에서 직접 만들어보세요.
          정확한 계량과 상세한 조리법으로 누구나 맛있는 한식을 완성할 수 있습니다.
        </p>
      </header>

      {/* 레시피 목록 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-warm-800 mb-4">전체 {koreanRecipes.length}개 레시피</h2>
        <div className="grid gap-4">
          {koreanRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="bg-white rounded-2xl shadow-soft p-5 flex gap-4 hover:shadow-lifted transition-shadow"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">{recipe.emoji}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-warm-800 truncate mb-1">
                  {recipe.title}
                </h3>
                <p className="text-sm text-warm-600 mb-2 line-clamp-2">
                  {recipe.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-warm-500">
                  <span>난이도: {recipe.difficulty}</span>
                  <span>소요시간: {recipe.time}</span>
                </div>
                <div className="flex gap-1.5 mt-2">
                  {recipe.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-warm-100 text-warm-600 py-1 px-2 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 한식 요리 팁 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-warm-800 mb-4">한식 요리 팁</h2>
        <div className="space-y-3">
          <div className="bg-orange-50 rounded-xl p-4">
            <h3 className="font-semibold text-warm-800 mb-2">김치는 잘 익은 것으로</h3>
            <p className="text-sm text-warm-600">찌개류에는 잘 익은 신김치를 사용해야 깊은 맛이 납니다.</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4">
            <h3 className="font-semibold text-warm-800 mb-2">된장은 끓이지 않기</h3>
            <p className="text-sm text-warm-600">된장찌개는 된장을 넣고 오래 끓이면 향이 날아가니 마지막에 넣어주세요.</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4">
            <h3 className="font-semibold text-warm-800 mb-2">고기 양념은 충분히</h3>
            <p className="text-sm text-warm-600">불고기, 갈비 등은 최소 2시간 이상 양념에 재워두어야 맛이 배어듭니다.</p>
          </div>
        </div>
      </section>

      {/* 다른 카테고리 */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white text-center">
        <h2 className="text-xl font-bold mb-2">다른 요리도 둘러보세요</h2>
        <p className="text-orange-100 mb-4">양식, 중식, 일식 레시피도 준비되어 있습니다.</p>
        <div className="flex justify-center gap-3">
          <Link href="/recipes/category/western" className="bg-white text-orange-600 px-4 py-2 rounded-xl font-medium hover:bg-orange-50 transition-colors">
            양식
          </Link>
          <Link href="/recipes/category/chinese" className="bg-white text-orange-600 px-4 py-2 rounded-xl font-medium hover:bg-orange-50 transition-colors">
            중식
          </Link>
          <Link href="/recipes/category/japanese" className="bg-white text-orange-600 px-4 py-2 rounded-xl font-medium hover:bg-orange-50 transition-colors">
            일식
          </Link>
        </div>
      </section>
    </main>
  );
}
