import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '중식 레시피 모음 - 맛있는 기록 | 짜장면, 짬뽕, 탕수육, 볶음밥',
  description: '중국 요리 레시피를 만나보세요. 짜장면, 짬뽕, 탕수육, 볶음밥 등 중화요리의 정수를 집에서 직접 만드는 상세한 조리법을 알려드립니다.',
  keywords: ['중식', '중국요리', '짜장면', '짬뽕', '탕수육', '볶음밥', '레시피'],
  alternates: { canonical: '/recipes/category/chinese' },
  openGraph: { url: '/recipes/category/chinese' },
};

const chineseRecipes = [
  {
    id: 'fried-rice',
    title: '볶음밥',
    description: '남은 재료로 뚝딱 만드는 한 그릇. 간단하지만 맛있는 한 끼 식사가 됩니다.',
    difficulty: '쉬움',
    time: '15분',
    emoji: '🍚',
    tags: ['간편식', '볶음', '한그릇'],
  },
  {
    id: 'jjajangmyeon',
    title: '짜장면',
    description: '춘장의 깊은 맛이 배인 면요리. 배달음식 1위, 집에서 만드는 정통 짜장면입니다.',
    difficulty: '보통',
    time: '35분',
    emoji: '🍜',
    tags: ['면요리', '춘장', '배달음식'],
  },
  {
    id: 'jjamppong',
    title: '짬뽕',
    description: '얼큰한 해물 국물에 쫄깃한 면. 시원하게 땀 흘리며 먹는 중화 요리입니다.',
    difficulty: '보통',
    time: '40분',
    emoji: '🌶️',
    tags: ['면요리', '해물', '얼큰'],
  },
  {
    id: 'tangsuyuk',
    title: '탕수육',
    description: '바삭한 튀김옷과 새콤달콤 소스. 찍먹 vs 부먹 논쟁의 주인공입니다.',
    difficulty: '어려움',
    time: '50분',
    emoji: '🍖',
    tags: ['튀김', '돼지고기', '파티음식'],
  },
];

export default function ChineseRecipesPage() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto p-6 pb-20">
      {/* 브레드크럼 */}
      <nav className="text-sm mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-warm-500">
          <li><Link href="/" className="hover:text-orange-600">홈</Link></li>
          <li>/</li>
          <li><Link href="/recipes" className="hover:text-orange-600">레시피</Link></li>
          <li>/</li>
          <li className="text-warm-700 font-medium">중식</li>
        </ol>
      </nav>

      {/* 헤더 */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">🥡</span>
          <div>
            <h1 className="text-3xl font-bold text-warm-800">중식 레시피</h1>
            <p className="text-warm-600">불맛 가득한 중화요리</p>
          </div>
        </div>
        <p className="text-warm-600 leading-relaxed">
          짜장면, 짬뽕, 탕수육 등 중국집 인기 메뉴를 집에서 직접 만들어보세요.
          센 불에서 빠르게 조리하는 중화요리의 비법을 알려드립니다.
        </p>
      </header>

      {/* 레시피 목록 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-warm-800 mb-4">전체 {chineseRecipes.length}개 레시피</h2>
        <div className="grid gap-4">
          {chineseRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="bg-white rounded-2xl shadow-soft p-5 flex gap-4 hover:shadow-lifted transition-shadow"
            >
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
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
                    <span key={tag} className="text-xs bg-red-100 text-red-600 py-1 px-2 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 중식 요리 팁 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-warm-800 mb-4">중식 요리 팁</h2>
        <div className="space-y-3">
          <div className="bg-red-50 rounded-xl p-4">
            <h3 className="font-semibold text-warm-800 mb-2">웍은 충분히 달구기</h3>
            <p className="text-sm text-warm-600">중식은 센 불이 핵심! 팬에서 연기가 날 정도로 달궈진 후 재료를 넣으세요.</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4">
            <h3 className="font-semibold text-warm-800 mb-2">춘장은 충분히 볶기</h3>
            <p className="text-sm text-warm-600">짜장면의 춘장은 기름에 충분히 볶아야 쓴맛이 빠지고 깊은 맛이 납니다.</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4">
            <h3 className="font-semibold text-warm-800 mb-2">튀김은 두 번 튀기기</h3>
            <p className="text-sm text-warm-600">탕수육은 한 번 튀긴 후 다시 고온에서 바삭하게 튀겨야 식감이 살아납니다.</p>
          </div>
        </div>
      </section>

      {/* 다른 카테고리 */}
      <section className="bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl p-6 text-white text-center">
        <h2 className="text-xl font-bold mb-2">다른 요리도 둘러보세요</h2>
        <p className="text-red-100 mb-4">한식, 양식, 일식 레시피도 준비되어 있습니다.</p>
        <div className="flex justify-center gap-3">
          <Link href="/recipes/category/korean" className="bg-white text-red-600 px-4 py-2 rounded-xl font-medium hover:bg-red-50 transition-colors">
            한식
          </Link>
          <Link href="/recipes/category/western" className="bg-white text-red-600 px-4 py-2 rounded-xl font-medium hover:bg-red-50 transition-colors">
            양식
          </Link>
          <Link href="/recipes/category/japanese" className="bg-white text-red-600 px-4 py-2 rounded-xl font-medium hover:bg-red-50 transition-colors">
            일식
          </Link>
        </div>
      </section>
    </main>
  );
}
