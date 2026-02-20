import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '일식 레시피 모음 - 맛있는 기록 | 카츠동, 우동, 카레, 타코야키',
  description: '일본 요리 레시피를 만나보세요. 카츠동, 우동, 카레라이스, 타코야키, 규동 등 정갈한 일식 요리를 집에서 만드는 상세한 조리법.',
  keywords: ['일식', '일본요리', '카츠동', '우동', '카레', '타코야키', '규동', '레시피'],
  alternates: { canonical: 'https://tasty-record.com/recipes/category/japanese' },
  openGraph: { url: 'https://tasty-record.com/recipes/category/japanese' },
};

const japaneseRecipes = [
  {
    id: 'katsudon',
    title: '카츠동',
    description: '바삭한 돈카츠와 부드러운 달걀. 일본식 덮밥의 대표 메뉴입니다.',
    difficulty: '보통',
    time: '35분',
    emoji: '🍱',
    tags: ['덮밥', '돈카츠', '달걀'],
  },
  {
    id: 'udon',
    title: '우동',
    description: '쫄깃한 면발과 깔끔한 국물. 추운 날 몸을 녹여주는 따뜻한 면 요리입니다.',
    difficulty: '쉬움',
    time: '20분',
    emoji: '🍜',
    tags: ['면요리', '국물', '따뜻함'],
  },
  {
    id: 'curry-rice',
    title: '카레라이스',
    description: '향신료 가득한 일본식 카레. 온 가족이 좋아하는 편안한 한 끼입니다.',
    difficulty: '쉬움',
    time: '40분',
    emoji: '🍛',
    tags: ['카레', '밥요리', '가족식사'],
  },
  {
    id: 'takoyaki',
    title: '타코야키',
    description: '동글동글 귀여운 문어빵. 겉바속촉 일본 길거리 간식의 대명사입니다.',
    difficulty: '보통',
    time: '30분',
    emoji: '🐙',
    tags: ['간식', '문어', '길거리음식'],
  },
  {
    id: 'gyudon',
    title: '규동',
    description: '달콤짭짤한 소고기 덮밥. 간단하지만 든든한 일본식 패스트푸드입니다.',
    difficulty: '쉬움',
    time: '25분',
    emoji: '🥩',
    tags: ['덮밥', '소고기', '간편식'],
  },
];

export default function JapaneseRecipesPage() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto p-6 pb-20">
      {/* 브레드크럼 */}
      <nav className="text-sm mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-warm-500">
          <li><Link href="/" className="hover:text-orange-600">홈</Link></li>
          <li>/</li>
          <li><Link href="/recipes" className="hover:text-orange-600">레시피</Link></li>
          <li>/</li>
          <li className="text-warm-700 font-medium">일식</li>
        </ol>
      </nav>

      {/* 헤더 */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">🍣</span>
          <div>
            <h1 className="text-3xl font-bold text-warm-800">일식 레시피</h1>
            <p className="text-warm-600">정갈하고 깔끔한 일본 요리</p>
          </div>
        </div>
        <p className="text-warm-600 leading-relaxed">
          카츠동, 우동, 카레, 타코야키 등 인기 일식 요리를 집에서 직접 만들어보세요.
          재료 본연의 맛을 살린 정갈한 일본 요리의 비법을 알려드립니다.
        </p>
      </header>

      {/* 레시피 목록 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-warm-800 mb-4">전체 {japaneseRecipes.length}개 레시피</h2>
        <div className="grid gap-4">
          {japaneseRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="bg-white rounded-2xl shadow-soft p-5 flex gap-4 hover:shadow-lifted transition-shadow"
            >
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
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
                    <span key={tag} className="text-xs bg-green-100 text-green-600 py-1 px-2 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 일식 요리 팁 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-warm-800 mb-4">일식 요리 팁</h2>
        <div className="space-y-3">
          <div className="bg-green-50 rounded-xl p-4">
            <h3 className="font-semibold text-warm-800 mb-2">다시 국물이 핵심</h3>
            <p className="text-sm text-warm-600">우동, 덮밥 등 일식의 기본은 다시(육수)입니다. 가쓰오부시와 다시마로 깊은 맛을 내세요.</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <h3 className="font-semibold text-warm-800 mb-2">돈카츠는 저온에서 천천히</h3>
            <p className="text-sm text-warm-600">돈카츠는 160도에서 천천히 튀긴 후 180도로 올려 바삭하게 마무리하세요.</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <h3 className="font-semibold text-warm-800 mb-2">카레는 하룻밤 숙성</h3>
            <p className="text-sm text-warm-600">일본식 카레는 만든 다음 날 데워먹으면 더 깊은 맛이 납니다.</p>
          </div>
        </div>
      </section>

      {/* 다른 카테고리 */}
      <section className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 text-white text-center">
        <h2 className="text-xl font-bold mb-2">다른 요리도 둘러보세요</h2>
        <p className="text-green-100 mb-4">한식, 양식, 중식 레시피도 준비되어 있습니다.</p>
        <div className="flex justify-center gap-3">
          <Link href="/recipes/category/korean" className="bg-white text-green-600 px-4 py-2 rounded-xl font-medium hover:bg-green-50 transition-colors">
            한식
          </Link>
          <Link href="/recipes/category/western" className="bg-white text-green-600 px-4 py-2 rounded-xl font-medium hover:bg-green-50 transition-colors">
            양식
          </Link>
          <Link href="/recipes/category/chinese" className="bg-white text-green-600 px-4 py-2 rounded-xl font-medium hover:bg-green-50 transition-colors">
            중식
          </Link>
        </div>
      </section>
    </main>
  );
}
