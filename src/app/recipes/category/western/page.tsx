import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '양식 레시피 모음 - 맛있는 기록 | 파스타, 스테이크, 오므라이스',
  description: '맛있는 서양 요리 레시피를 만나보세요. 카르보나라, 토마토 파스타, 스테이크, 오므라이스 등 레스토랑 맛 그대로 집에서 즐기는 양식 조리법.',
  keywords: ['양식', '서양요리', '파스타', '스테이크', '카르보나라', '오므라이스', '레시피'],
};

const westernRecipes = [
  {
    id: 'carbonara',
    title: '카르보나라',
    description: '크리미한 이탈리안 파스타의 정석. 베이컨과 달걀, 치즈의 풍미가 일품입니다.',
    difficulty: '보통',
    time: '25분',
    emoji: '🍝',
    tags: ['파스타', '이탈리안', '베이컨'],
  },
  {
    id: 'tomato-pasta',
    title: '토마토 파스타',
    description: '새콤달콤한 토마토 소스와 쫄깃한 면발. 기본에 충실한 클래식 파스타입니다.',
    difficulty: '쉬움',
    time: '25분',
    emoji: '🍅',
    tags: ['파스타', '토마토', '이탈리안'],
  },
  {
    id: 'cream-pasta',
    title: '크림 파스타',
    description: '부드럽고 고소한 크림 소스. 아이들도 좋아하는 달콤한 파스타입니다.',
    difficulty: '쉬움',
    time: '25분',
    emoji: '🥛',
    tags: ['파스타', '크림', '부드러움'],
  },
  {
    id: 'steak',
    title: '스테이크',
    description: '겉바속촉 완벽한 굽기의 비프 스테이크. 특별한 날을 위한 고급 메인 요리입니다.',
    difficulty: '어려움',
    time: '30분',
    emoji: '🥩',
    tags: ['소고기', '메인요리', '특별한날'],
  },
  {
    id: 'omurice',
    title: '오므라이스',
    description: '부드러운 달걀에 감싸진 케첩 볶음밥. 아이 어른 모두가 좋아하는 메뉴입니다.',
    difficulty: '보통',
    time: '25분',
    emoji: '🍳',
    tags: ['볶음밥', '달걀', '케첩'],
  },
];

export default function WesternRecipesPage() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto p-6 pb-20">
      {/* 브레드크럼 */}
      <nav className="text-sm mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-warm-500">
          <li><Link href="/" className="hover:text-orange-600">홈</Link></li>
          <li>/</li>
          <li><Link href="/recipes" className="hover:text-orange-600">레시피</Link></li>
          <li>/</li>
          <li className="text-warm-700 font-medium">양식</li>
        </ol>
      </nav>

      {/* 헤더 */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">🍝</span>
          <div>
            <h1 className="text-3xl font-bold text-warm-800">양식 레시피</h1>
            <p className="text-warm-600">레스토랑 맛 그대로 집에서</p>
          </div>
        </div>
        <p className="text-warm-600 leading-relaxed">
          파스타, 스테이크, 오므라이스 등 인기 양식 요리를 집에서 직접 만들어보세요.
          전문 셰프의 비법을 담은 레시피로 레스토랑 못지않은 맛을 경험하실 수 있습니다.
        </p>
      </header>

      {/* 레시피 목록 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-warm-800 mb-4">전체 {westernRecipes.length}개 레시피</h2>
        <div className="grid gap-4">
          {westernRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="bg-white rounded-2xl shadow-soft p-5 flex gap-4 hover:shadow-lifted transition-shadow"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
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
                    <span key={tag} className="text-xs bg-blue-100 text-blue-600 py-1 px-2 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 양식 요리 팁 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-warm-800 mb-4">양식 요리 팁</h2>
        <div className="space-y-3">
          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="font-semibold text-warm-800 mb-2">파스타 면수 활용하기</h3>
            <p className="text-sm text-warm-600">면수를 소스에 조금 넣으면 전분기가 소스를 더 걸쭉하게 만들어줍니다.</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="font-semibold text-warm-800 mb-2">스테이크는 실온에서</h3>
            <p className="text-sm text-warm-600">고기를 조리 30분 전에 미리 꺼내 실온에 두면 균일하게 익습니다.</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="font-semibold text-warm-800 mb-2">달걀 요리는 약불로</h3>
            <p className="text-sm text-warm-600">오므라이스나 카르보나라는 약한 불에서 천천히 익혀야 부드럽습니다.</p>
          </div>
        </div>
      </section>

      {/* 다른 카테고리 */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 text-white text-center">
        <h2 className="text-xl font-bold mb-2">다른 요리도 둘러보세요</h2>
        <p className="text-blue-100 mb-4">한식, 중식, 일식 레시피도 준비되어 있습니다.</p>
        <div className="flex justify-center gap-3">
          <Link href="/recipes/category/korean" className="bg-white text-blue-600 px-4 py-2 rounded-xl font-medium hover:bg-blue-50 transition-colors">
            한식
          </Link>
          <Link href="/recipes/category/chinese" className="bg-white text-blue-600 px-4 py-2 rounded-xl font-medium hover:bg-blue-50 transition-colors">
            중식
          </Link>
          <Link href="/recipes/category/japanese" className="bg-white text-blue-600 px-4 py-2 rounded-xl font-medium hover:bg-blue-50 transition-colors">
            일식
          </Link>
        </div>
      </section>
    </main>
  );
}
