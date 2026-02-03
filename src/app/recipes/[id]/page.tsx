import Link from 'next/link';
import { notFound } from 'next/navigation';

const recipeData: Record<string, {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  time: string;
  servings: string;
  emoji: string;
  intro: string;
  ingredients: { name: string; amount: string }[];
  steps: { order: number; instruction: string; tip?: string }[];
  tips: string[];
}> = {
  'kimchi-jjigae': {
    title: '김치찌개',
    description: '깊은 맛이 일품인 한국인의 소울푸드',
    category: '한식',
    difficulty: '쉬움',
    time: '30분',
    servings: '2인분',
    emoji: '🍲',
    intro: '김치찌개는 잘 익은 김치와 돼지고기를 넣어 끓인 한국의 대표적인 찌개입니다. 밥 한 공기가 절로 들어가는 깊은 맛이 특징이며, 추운 겨울에 특히 생각나는 음식입니다.',
    ingredients: [
      { name: '묵은지', amount: '200g' },
      { name: '돼지고기 앞다리살', amount: '150g' },
      { name: '두부', amount: '1/2모' },
      { name: '대파', amount: '1대' },
      { name: '양파', amount: '1/2개' },
      { name: '고춧가루', amount: '1큰술' },
      { name: '다진마늘', amount: '1큰술' },
      { name: '멸치다시마육수', amount: '400ml' },
      { name: '참기름', amount: '1큰술' },
    ],
    steps: [
      { order: 1, instruction: '묵은지는 먹기 좋은 크기로 썰고, 돼지고기도 한입 크기로 썹니다.', tip: '묵은지는 신맛이 강할수록 맛있어요' },
      { order: 2, instruction: '냄비에 참기름을 두르고 돼지고기를 볶다가 김치를 넣어 함께 볶습니다.' },
      { order: 3, instruction: '고춧가루와 다진마늘을 넣고 1분 정도 더 볶아줍니다.' },
      { order: 4, instruction: '멸치다시마육수를 붓고 중불에서 15분간 끓입니다.' },
      { order: 5, instruction: '두부와 양파를 넣고 5분 더 끓인 후, 대파를 올려 마무리합니다.', tip: '두부는 너무 오래 끓이면 부서지니 주의하세요' },
    ],
    tips: [
      '김치 국물도 함께 넣으면 더 깊은 맛이 납니다',
      '돼지고기 대신 참치캔을 넣어도 맛있습니다',
      '마지막에 들기름을 한 방울 넣으면 풍미가 올라갑니다',
    ],
  },
  'doenjang-jjigae': {
    title: '된장찌개',
    description: '구수한 된장향이 가득한 건강식',
    category: '한식',
    difficulty: '쉬움',
    time: '25분',
    servings: '2인분',
    emoji: '🥘',
    intro: '된장찌개는 된장을 풀어 각종 채소와 두부를 넣고 끓인 한국의 전통 음식입니다. 구수하면서도 담백한 맛이 특징이며, 영양도 풍부해 건강식으로도 손색이 없습니다.',
    ingredients: [
      { name: '된장', amount: '2큰술' },
      { name: '애호박', amount: '1/3개' },
      { name: '감자', amount: '1개' },
      { name: '양파', amount: '1/2개' },
      { name: '두부', amount: '1/2모' },
      { name: '청양고추', amount: '1개' },
      { name: '대파', amount: '1/2대' },
      { name: '다진마늘', amount: '1/2큰술' },
      { name: '멸치다시마육수', amount: '500ml' },
    ],
    steps: [
      { order: 1, instruction: '감자, 애호박, 양파는 먹기 좋은 크기로 썰고, 두부는 깍둑썰기합니다.' },
      { order: 2, instruction: '냄비에 육수를 붓고 된장을 체에 걸러 풀어줍니다.', tip: '체에 거르면 된장이 고르게 풀립니다' },
      { order: 3, instruction: '감자를 먼저 넣고 중불에서 5분간 끓입니다.' },
      { order: 4, instruction: '애호박, 양파, 두부를 넣고 10분 더 끓입니다.' },
      { order: 5, instruction: '다진마늘, 청양고추, 대파를 넣고 2분 더 끓여 마무리합니다.' },
    ],
    tips: [
      '육수 대신 쌀뜨물을 사용하면 더 구수합니다',
      '고추장을 반 큰술 넣으면 칼칼한 맛이 납니다',
      '표고버섯을 추가하면 감칠맛이 올라갑니다',
    ],
  },
  'bulgogi': {
    title: '불고기',
    description: '달콤한 양념에 재운 부드러운 소고기',
    category: '한식',
    difficulty: '보통',
    time: '40분',
    servings: '3인분',
    emoji: '🥩',
    intro: '불고기는 얇게 썬 소고기를 달콤한 간장 양념에 재워 구운 한국의 대표적인 고기 요리입니다. 부드럽고 달콤짭짤한 맛이 특징이며, 밥반찬이나 쌈으로 즐기기 좋습니다.',
    ingredients: [
      { name: '소고기 불고기용', amount: '400g' },
      { name: '양파', amount: '1개' },
      { name: '대파', amount: '1대' },
      { name: '당근', amount: '1/3개' },
      { name: '배', amount: '1/4개' },
      { name: '간장', amount: '4큰술' },
      { name: '설탕', amount: '2큰술' },
      { name: '다진마늘', amount: '1큰술' },
      { name: '참기름', amount: '1큰술' },
      { name: '후추', amount: '약간' },
    ],
    steps: [
      { order: 1, instruction: '배는 갈아서 즙을 내고, 양파 1/2개도 갈아줍니다.', tip: '배는 고기를 연하게 해줍니다' },
      { order: 2, instruction: '볼에 간장, 설탕, 다진마늘, 참기름, 후추, 배즙, 양파즙을 섞어 양념장을 만듭니다.' },
      { order: 3, instruction: '소고기에 양념장을 넣고 골고루 버무린 후 30분간 재웁니다.' },
      { order: 4, instruction: '나머지 양파, 대파, 당근은 채 썰어 준비합니다.' },
      { order: 5, instruction: '달군 팬에 재운 고기와 채소를 넣고 센 불에서 빠르게 볶아냅니다.', tip: '불이 약하면 물이 생기니 센 불에서 빠르게 볶으세요' },
    ],
    tips: [
      '고기를 재울 때 키위를 조금 넣으면 더 부드러워집니다',
      '버섯을 함께 볶으면 식감이 좋아집니다',
      '쌈 채소와 함께 먹으면 더 맛있습니다',
    ],
  },
  'japchae': {
    title: '잡채',
    description: '명절에 빠질 수 없는 잔치 음식',
    category: '한식',
    difficulty: '보통',
    time: '45분',
    servings: '4인분',
    emoji: '🍜',
    intro: '잡채는 당면과 각종 채소, 고기를 볶아 만든 한국의 전통 음식입니다. 명절이나 잔치에 빠지지 않는 음식으로, 쫄깃한 당면과 다양한 재료의 조화가 일품입니다.',
    ingredients: [
      { name: '당면', amount: '200g' },
      { name: '소고기 채끝', amount: '100g' },
      { name: '시금치', amount: '100g' },
      { name: '당근', amount: '1/2개' },
      { name: '양파', amount: '1/2개' },
      { name: '표고버섯', amount: '3개' },
      { name: '간장', amount: '4큰술' },
      { name: '설탕', amount: '2큰술' },
      { name: '참기름', amount: '2큰술' },
      { name: '깨소금', amount: '1큰술' },
    ],
    steps: [
      { order: 1, instruction: '당면은 미지근한 물에 30분간 불린 후 삶아 찬물에 헹궈 물기를 빼줍니다.' },
      { order: 2, instruction: '시금치는 데쳐서 물기를 짜고, 소고기와 채소는 채 썹니다.' },
      { order: 3, instruction: '소고기는 간장 1큰술, 설탕 1/2큰술로 밑간하여 볶아둡니다.' },
      { order: 4, instruction: '채소도 각각 따로 볶아 준비합니다.', tip: '채소를 따로 볶아야 아삭한 식감을 살릴 수 있어요' },
      { order: 5, instruction: '큰 볼에 당면, 볶은 재료, 양념을 모두 넣고 골고루 버무립니다.' },
      { order: 6, instruction: '참기름과 깨소금을 넣어 마무리합니다.' },
    ],
    tips: [
      '당면은 가위로 잘라두면 먹기 편합니다',
      '완성 후 바로 먹어야 당면이 불지 않습니다',
      '계란 지단을 올리면 더 예쁩니다',
    ],
  },
  'carbonara': {
    title: '카르보나라',
    description: '크리미한 이탈리안 파스타의 정석',
    category: '양식',
    difficulty: '보통',
    time: '25분',
    servings: '2인분',
    emoji: '🍝',
    intro: '카르보나라는 계란, 치즈, 베이컨으로 만드는 이탈리아의 대표적인 파스타입니다. 크림을 넣지 않고도 부드럽고 진한 맛을 내는 것이 특징입니다.',
    ingredients: [
      { name: '스파게티', amount: '200g' },
      { name: '베이컨 또는 판체타', amount: '100g' },
      { name: '계란 노른자', amount: '3개' },
      { name: '파마산 치즈', amount: '50g' },
      { name: '마늘', amount: '2쪽' },
      { name: '올리브오일', amount: '2큰술' },
      { name: '후추', amount: '넉넉히' },
      { name: '소금', amount: '적당량' },
    ],
    steps: [
      { order: 1, instruction: '끓는 물에 소금을 넣고 스파게티를 삶습니다. 면수 1컵은 따로 받아둡니다.' },
      { order: 2, instruction: '볼에 계란 노른자, 파마산 치즈, 후추를 넣고 잘 섞어둡니다.' },
      { order: 3, instruction: '팬에 올리브오일을 두르고 마늘을 볶다가 베이컨을 바삭하게 구워줍니다.' },
      { order: 4, instruction: '불을 끄고 삶은 면을 팬에 넣어 베이컨 기름과 섞어줍니다.', tip: '불을 끄는 것이 중요해요! 계란이 익으면 안됩니다' },
      { order: 5, instruction: '계란 소스를 넣고 빠르게 섞으며 면수로 농도를 조절합니다.' },
      { order: 6, instruction: '접시에 담고 파마산 치즈와 후추를 뿌려 마무리합니다.' },
    ],
    tips: [
      '불을 끄고 계란 소스를 넣어야 스크램블이 되지 않습니다',
      '면수의 전분이 소스를 부드럽게 만들어줍니다',
      '후추는 넉넉히 넣어야 제맛입니다',
    ],
  },
  'fried-rice': {
    title: '볶음밥',
    description: '남은 재료로 뚝딱 만드는 한 그릇',
    category: '중식',
    difficulty: '쉬움',
    time: '15분',
    servings: '1인분',
    emoji: '🍚',
    intro: '볶음밥은 밥과 각종 재료를 함께 볶아 만드는 간편하면서도 맛있는 요리입니다. 냉장고에 있는 재료를 활용하기 좋고, 한 그릇으로 든든한 식사가 됩니다.',
    ingredients: [
      { name: '찬밥', amount: '1공기' },
      { name: '계란', amount: '2개' },
      { name: '대파', amount: '1/2대' },
      { name: '당근', amount: '1/4개' },
      { name: '햄 또는 베이컨', amount: '50g' },
      { name: '간장', amount: '1큰술' },
      { name: '참기름', amount: '1/2큰술' },
      { name: '식용유', amount: '2큰술' },
      { name: '소금, 후추', amount: '약간' },
    ],
    steps: [
      { order: 1, instruction: '대파, 당근, 햄은 잘게 다져 준비합니다.' },
      { order: 2, instruction: '달군 팬에 기름을 두르고 계란을 넣어 스크램블합니다.' },
      { order: 3, instruction: '같은 팬에 기름을 더 두르고 햄과 채소를 볶습니다.' },
      { order: 4, instruction: '찬밥을 넣고 밥알이 하나하나 떨어지도록 볶아줍니다.', tip: '센 불에서 빠르게 볶아야 밥이 눅눅해지지 않아요' },
      { order: 5, instruction: '간장으로 간을 하고 계란을 다시 넣어 섞어줍니다.' },
      { order: 6, instruction: '불을 끄고 참기름을 둘러 마무리합니다.' },
    ],
    tips: [
      '찬밥을 사용해야 밥알이 잘 떨어집니다',
      '재료는 모두 비슷한 크기로 다지면 보기 좋습니다',
      '김가루나 깨를 뿌려 먹으면 더 맛있습니다',
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(recipeData).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipe = recipeData[id];
  if (!recipe) return { title: '레시피를 찾을 수 없습니다' };

  return {
    title: `${recipe.title} 레시피 - 맛있는 기록`,
    description: `${recipe.title} 만드는 법: ${recipe.description}. ${recipe.time} 소요, ${recipe.difficulty} 난이도.`,
  };
}

export default async function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipe = recipeData[id];

  if (!recipe) {
    notFound();
  }

  return (
    <main className="min-h-screen max-w-2xl mx-auto p-6 pb-20">
      <Link href="/recipes" className="text-orange-600 hover:underline mb-6 inline-block">
        ← 레시피 목록
      </Link>

      {/* 헤더 */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{recipe.emoji}</span>
          <div>
            <h1 className="text-3xl font-bold">{recipe.title}</h1>
            <p className="text-orange-100">{recipe.description}</p>
          </div>
        </div>
        <div className="flex gap-4 text-sm">
          <span className="bg-white/20 px-3 py-1 rounded-lg">{recipe.category}</span>
          <span className="bg-white/20 px-3 py-1 rounded-lg">{recipe.difficulty}</span>
          <span className="bg-white/20 px-3 py-1 rounded-lg">{recipe.time}</span>
          <span className="bg-white/20 px-3 py-1 rounded-lg">{recipe.servings}</span>
        </div>
      </div>

      {/* 소개 */}
      <div className="bg-white rounded-2xl shadow-soft p-6 mb-6">
        <p className="text-warm-700 leading-relaxed">{recipe.intro}</p>
      </div>

      {/* 재료 */}
      <div className="bg-white rounded-2xl shadow-soft p-6 mb-6">
        <h2 className="text-xl font-semibold text-warm-800 mb-4 flex items-center gap-2">
          <span>🥬</span> 재료
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {recipe.ingredients.map((ing, idx) => (
            <div key={idx} className="flex justify-between bg-warm-50 p-3 rounded-lg">
              <span className="text-warm-700">{ing.name}</span>
              <span className="text-warm-500">{ing.amount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 조리 순서 */}
      <div className="bg-white rounded-2xl shadow-soft p-6 mb-6">
        <h2 className="text-xl font-semibold text-warm-800 mb-4 flex items-center gap-2">
          <span>👨‍🍳</span> 조리 순서
        </h2>
        <div className="space-y-4">
          {recipe.steps.map((step) => (
            <div key={step.order} className="flex gap-4">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                {step.order}
              </div>
              <div className="flex-1">
                <p className="text-warm-700">{step.instruction}</p>
                {step.tip && (
                  <p className="mt-2 text-sm text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
                    💡 {step.tip}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 요리 팁 */}
      <div className="bg-yellow-50 rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-warm-800 mb-4 flex items-center gap-2">
          <span>✨</span> 요리 팁
        </h2>
        <ul className="space-y-2">
          {recipe.tips.map((tip, idx) => (
            <li key={idx} className="flex gap-2 text-warm-700">
              <span className="text-orange-500">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="bg-warm-100 rounded-2xl p-6 text-center">
        <p className="text-warm-700 mb-4">이 레시피를 저장하고 싶으신가요?</p>
        <Link
          href="/"
          className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors"
        >
          앱에서 나만의 레시피 저장하기
        </Link>
      </div>
    </main>
  );
}
