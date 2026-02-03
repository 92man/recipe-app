import Link from 'next/link';

export const metadata = {
  title: '인기 레시피 모음 - 맛있는 기록',
  description: '가장 인기 있는 한식, 양식, 중식 레시피를 만나보세요. 초보자도 쉽게 따라할 수 있는 상세한 레시피를 제공합니다.',
};

const popularRecipes = [
  {
    id: 'kimchi-jjigae',
    title: '김치찌개',
    description: '깊은 맛이 일품인 한국인의 소울푸드',
    category: '한식',
    difficulty: '쉬움',
    time: '30분',
    emoji: '🍲',
  },
  {
    id: 'doenjang-jjigae',
    title: '된장찌개',
    description: '구수한 된장향이 가득한 건강식',
    category: '한식',
    difficulty: '쉬움',
    time: '25분',
    emoji: '🥘',
  },
  {
    id: 'bulgogi',
    title: '불고기',
    description: '달콤한 양념에 재운 부드러운 소고기',
    category: '한식',
    difficulty: '보통',
    time: '40분',
    emoji: '🥩',
  },
  {
    id: 'japchae',
    title: '잡채',
    description: '명절에 빠질 수 없는 잔치 음식',
    category: '한식',
    difficulty: '보통',
    time: '45분',
    emoji: '🍜',
  },
  {
    id: 'carbonara',
    title: '카르보나라',
    description: '크리미한 이탈리안 파스타의 정석',
    category: '양식',
    difficulty: '보통',
    time: '25분',
    emoji: '🍝',
  },
  {
    id: 'fried-rice',
    title: '볶음밥',
    description: '남은 재료로 뚝딱 만드는 한 그릇',
    category: '중식',
    difficulty: '쉬움',
    time: '15분',
    emoji: '🍚',
  },
];

export default function RecipesPage() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto p-6 pb-20">
      <Link href="/" className="text-orange-600 hover:underline mb-6 inline-block">
        ← 홈으로
      </Link>

      <h1 className="text-3xl font-bold text-warm-800 mb-2">인기 레시피 모음</h1>
      <p className="text-warm-600 mb-8">
        가장 많이 찾는 레시피들을 모았습니다. 상세한 조리법과 함께 맛있는 요리를 만들어보세요.
      </p>

      <div className="grid gap-4">
        {popularRecipes.map((recipe) => (
          <Link
            key={recipe.id}
            href={`/recipes/${recipe.id}`}
            className="bg-white rounded-2xl shadow-soft p-5 hover:shadow-lg transition-shadow flex gap-4"
          >
            <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-3xl">{recipe.emoji}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-semibold text-warm-800">{recipe.title}</h2>
                <span className="text-xs bg-warm-100 text-warm-600 px-2 py-0.5 rounded-full">
                  {recipe.category}
                </span>
              </div>
              <p className="text-sm text-warm-600 mb-2">{recipe.description}</p>
              <div className="flex gap-3 text-xs text-warm-500">
                <span>난이도: {recipe.difficulty}</span>
                <span>소요시간: {recipe.time}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 bg-orange-50 rounded-2xl p-6">
        <h2 className="font-semibold text-warm-800 mb-2">더 많은 레시피가 필요하신가요?</h2>
        <p className="text-warm-600 text-sm mb-4">
          앱에서 레시피 검색 기능을 이용하시면 수천 가지 요리의 레시피를 확인할 수 있습니다.
        </p>
        <Link
          href="/"
          className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
        >
          앱에서 검색하기
        </Link>
      </div>
    </main>
  );
}
