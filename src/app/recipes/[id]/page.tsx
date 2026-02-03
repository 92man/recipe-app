import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Recipe {
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  difficulty: string;
  time: string;
  servings: string;
  emoji: string;
  intro: string;
  ingredients: { name: string; amount: string }[];
  steps: { order: number; instruction: string; tip?: string }[];
  tips: string[];
  nutrition?: { calories: string; protein: string; carbs: string; fat: string };
  author: string;
  publishedDate: string;
  updatedDate: string;
}

const recipeData: Record<string, Recipe> = {
  // 한식 (Korean)
  'kimchi-jjigae': {
    title: '김치찌개',
    description: '깊은 맛이 일품인 한국인의 소울푸드',
    category: '한식',
    categorySlug: 'korean',
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
    tips: ['김치 국물도 함께 넣으면 더 깊은 맛이 납니다', '돼지고기 대신 참치캔을 넣어도 맛있습니다', '마지막에 들기름을 한 방울 넣으면 풍미가 올라갑니다'],
    nutrition: { calories: '320kcal', protein: '18g', carbs: '12g', fat: '22g' },
    author: '맛있는 기록',
    publishedDate: '2024-01-15',
    updatedDate: '2025-01-20',
  },
  'doenjang-jjigae': {
    title: '된장찌개',
    description: '구수한 된장향이 가득한 건강식',
    category: '한식',
    categorySlug: 'korean',
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
    tips: ['육수 대신 쌀뜨물을 사용하면 더 구수합니다', '고추장을 반 큰술 넣으면 칼칼한 맛이 납니다', '표고버섯을 추가하면 감칠맛이 올라갑니다'],
    nutrition: { calories: '180kcal', protein: '12g', carbs: '18g', fat: '8g' },
    author: '맛있는 기록',
    publishedDate: '2024-01-20',
    updatedDate: '2025-01-18',
  },
  'bulgogi': {
    title: '불고기',
    description: '달콤한 양념에 재운 부드러운 소고기',
    category: '한식',
    categorySlug: 'korean',
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
    tips: ['고기를 재울 때 키위를 조금 넣으면 더 부드러워집니다', '버섯을 함께 볶으면 식감이 좋아집니다', '쌈 채소와 함께 먹으면 더 맛있습니다'],
    nutrition: { calories: '380kcal', protein: '28g', carbs: '15g', fat: '24g' },
    author: '맛있는 기록',
    publishedDate: '2024-02-01',
    updatedDate: '2025-01-15',
  },
  'japchae': {
    title: '잡채',
    description: '명절에 빠질 수 없는 잔치 음식',
    category: '한식',
    categorySlug: 'korean',
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
    tips: ['당면은 가위로 잘라두면 먹기 편합니다', '완성 후 바로 먹어야 당면이 불지 않습니다', '계란 지단을 올리면 더 예쁩니다'],
    nutrition: { calories: '350kcal', protein: '12g', carbs: '52g', fat: '12g' },
    author: '맛있는 기록',
    publishedDate: '2024-02-10',
    updatedDate: '2025-01-10',
  },
  'bibimbap': {
    title: '비빔밥',
    description: '형형색색 나물과 고추장의 조화',
    category: '한식',
    categorySlug: 'korean',
    difficulty: '보통',
    time: '40분',
    servings: '2인분',
    emoji: '🍚',
    intro: '비빔밥은 밥 위에 각종 나물과 고기, 계란을 올리고 고추장에 비벼 먹는 한국의 대표적인 한 그릇 음식입니다. 영양 균형이 뛰어나고 시각적으로도 아름다운 음식입니다.',
    ingredients: [
      { name: '밥', amount: '2공기' },
      { name: '소고기', amount: '100g' },
      { name: '시금치', amount: '100g' },
      { name: '콩나물', amount: '100g' },
      { name: '당근', amount: '1/2개' },
      { name: '애호박', amount: '1/3개' },
      { name: '고사리', amount: '50g' },
      { name: '계란', amount: '2개' },
      { name: '고추장', amount: '2큰술' },
      { name: '참기름', amount: '2큰술' },
    ],
    steps: [
      { order: 1, instruction: '시금치, 콩나물은 각각 데쳐서 참기름, 소금으로 무칩니다.' },
      { order: 2, instruction: '당근, 애호박은 채 썰어 각각 볶아줍니다.' },
      { order: 3, instruction: '소고기는 간장, 설탕으로 밑간하여 볶습니다.' },
      { order: 4, instruction: '계란은 프라이하거나 지단을 부쳐 준비합니다.' },
      { order: 5, instruction: '밥 위에 나물과 고기를 색깔별로 예쁘게 담습니다.' },
      { order: 6, instruction: '가운데 계란을 올리고 고추장, 참기름을 곁들여 냅니다.' },
    ],
    tips: ['나물은 각각 따로 무쳐야 색이 예쁩니다', '돌솥에 담으면 누룽지가 생겨 더 맛있습니다', '육회를 올리면 육회비빔밥이 됩니다'],
    nutrition: { calories: '520kcal', protein: '22g', carbs: '68g', fat: '18g' },
    author: '맛있는 기록',
    publishedDate: '2024-02-15',
    updatedDate: '2025-01-05',
  },
  'samgyeopsal': {
    title: '삼겹살 구이',
    description: '한국인이 사랑하는 국민 고기',
    category: '한식',
    categorySlug: 'korean',
    difficulty: '쉬움',
    time: '30분',
    servings: '2인분',
    emoji: '🥓',
    intro: '삼겹살 구이는 돼지 삼겹살을 구워 쌈 채소와 함께 먹는 한국의 대표적인 고기 요리입니다. 기름기가 적당히 있어 육즙이 풍부하고, 소주와의 궁합이 최고입니다.',
    ingredients: [
      { name: '삼겹살', amount: '400g' },
      { name: '상추', amount: '한 묶음' },
      { name: '깻잎', amount: '10장' },
      { name: '마늘', amount: '10쪽' },
      { name: '청양고추', amount: '3개' },
      { name: '쌈장', amount: '3큰술' },
      { name: '소금', amount: '약간' },
      { name: '참기름', amount: '1큰술' },
    ],
    steps: [
      { order: 1, instruction: '삼겹살은 먹기 좋은 크기로 자르거나 통으로 준비합니다.' },
      { order: 2, instruction: '쌈 채소는 깨끗이 씻어 물기를 빼고, 마늘은 편 썹니다.' },
      { order: 3, instruction: '달군 팬이나 그릴에 삼겹살을 올립니다.', tip: '기름이 많이 나오면 키친타월로 닦아주세요' },
      { order: 4, instruction: '한 면이 노릇해지면 뒤집어 굽습니다.' },
      { order: 5, instruction: '마늘도 함께 구워주고, 기호에 따라 소금이나 기름장에 찍어 먹습니다.' },
    ],
    tips: ['냉동 삼겹살은 해동 후 물기를 제거해야 잘 구워집니다', '김치와 함께 먹으면 느끼함을 잡아줍니다', '된장찌개와 함께 먹으면 환상의 조합입니다'],
    nutrition: { calories: '450kcal', protein: '18g', carbs: '2g', fat: '42g' },
    author: '맛있는 기록',
    publishedDate: '2024-03-01',
    updatedDate: '2025-01-12',
  },
  'tteokbokki': {
    title: '떡볶이',
    description: '매콤달콤한 국민 간식',
    category: '한식',
    categorySlug: 'korean',
    difficulty: '쉬움',
    time: '20분',
    servings: '2인분',
    emoji: '🌶️',
    intro: '떡볶이는 쫄깃한 떡을 매콤달콤한 고추장 양념에 볶아 만든 한국의 대표적인 분식입니다. 남녀노소 누구나 좋아하는 맛으로, 길거리 음식의 왕으로 불립니다.',
    ingredients: [
      { name: '떡볶이 떡', amount: '300g' },
      { name: '어묵', amount: '2장' },
      { name: '대파', amount: '1대' },
      { name: '양배추', amount: '2장' },
      { name: '고추장', amount: '2큰술' },
      { name: '고춧가루', amount: '1큰술' },
      { name: '설탕', amount: '1큰술' },
      { name: '간장', amount: '1큰술' },
      { name: '다진마늘', amount: '1/2큰술' },
      { name: '물', amount: '300ml' },
    ],
    steps: [
      { order: 1, instruction: '떡은 찬물에 5분간 담가 부드럽게 해줍니다.' },
      { order: 2, instruction: '어묵과 양배추는 먹기 좋은 크기로 자릅니다.' },
      { order: 3, instruction: '냄비에 물, 고추장, 고춧가루, 설탕, 간장, 마늘을 넣고 섞어줍니다.' },
      { order: 4, instruction: '양념장이 끓으면 떡과 어묵을 넣고 중불에서 졸입니다.', tip: '자주 저어주지 않으면 바닥에 눌어붙어요' },
      { order: 5, instruction: '떡이 부드러워지고 양념이 졸아들면 대파를 넣어 마무리합니다.' },
    ],
    tips: ['라면 사리를 추가하면 라볶이가 됩니다', '삶은 계란을 넣으면 더 든든합니다', '치즈를 뿌리면 치즈떡볶이가 됩니다'],
    nutrition: { calories: '380kcal', protein: '8g', carbs: '72g', fat: '6g' },
    author: '맛있는 기록',
    publishedDate: '2024-03-10',
    updatedDate: '2025-01-08',
  },
  'sundubu-jjigae': {
    title: '순두부찌개',
    description: '부드러운 순두부와 얼큰한 국물의 만남',
    category: '한식',
    categorySlug: 'korean',
    difficulty: '쉬움',
    time: '20분',
    servings: '1인분',
    emoji: '🥣',
    intro: '순두부찌개는 부드러운 순두부를 고춧가루와 각종 재료와 함께 끓여 만든 얼큰한 찌개입니다. 뚝배기에 펄펄 끓여 내면 마지막까지 뜨겁게 즐길 수 있습니다.',
    ingredients: [
      { name: '순두부', amount: '1봉' },
      { name: '바지락', amount: '100g' },
      { name: '돼지고기', amount: '50g' },
      { name: '계란', amount: '1개' },
      { name: '대파', amount: '1/2대' },
      { name: '청양고추', amount: '1개' },
      { name: '고춧가루', amount: '1큰술' },
      { name: '다진마늘', amount: '1/2큰술' },
      { name: '국간장', amount: '1/2큰술' },
      { name: '참기름', amount: '1큰술' },
    ],
    steps: [
      { order: 1, instruction: '바지락은 해감하여 준비하고, 돼지고기는 잘게 썹니다.' },
      { order: 2, instruction: '뚝배기에 참기름을 두르고 돼지고기를 볶습니다.' },
      { order: 3, instruction: '고춧가루, 다진마늘을 넣고 볶아 향을 냅니다.' },
      { order: 4, instruction: '물을 붓고 바지락, 순두부를 넣어 끓입니다.' },
      { order: 5, instruction: '국간장으로 간을 하고 대파, 고추를 넣습니다.' },
      { order: 6, instruction: '마지막에 계란을 깨 넣어 마무리합니다.', tip: '계란은 젓지 말고 그대로 익혀주세요' },
    ],
    tips: ['해물을 추가하면 해물순두부가 됩니다', '뚝배기째 식탁에 올리면 끝까지 뜨겁게 먹을 수 있습니다', '밥을 말아 먹어도 맛있습니다'],
    nutrition: { calories: '280kcal', protein: '18g', carbs: '8g', fat: '20g' },
    author: '맛있는 기록',
    publishedDate: '2024-03-15',
    updatedDate: '2025-01-06',
  },
  'gimbap': {
    title: '김밥',
    description: '소풍의 추억이 담긴 한 줄 행복',
    category: '한식',
    categorySlug: 'korean',
    difficulty: '보통',
    time: '40분',
    servings: '4줄',
    emoji: '🍙',
    intro: '김밥은 밥과 각종 재료를 김으로 말아 만든 한국의 대표적인 음식입니다. 소풍이나 나들이에 빠지지 않는 음식으로, 한 손에 들고 먹기 좋습니다.',
    ingredients: [
      { name: '밥', amount: '3공기' },
      { name: '김', amount: '4장' },
      { name: '단무지', amount: '4줄' },
      { name: '시금치', amount: '100g' },
      { name: '당근', amount: '1개' },
      { name: '계란', amount: '3개' },
      { name: '햄', amount: '100g' },
      { name: '우엉조림', amount: '50g' },
      { name: '참기름', amount: '2큰술' },
      { name: '소금', amount: '약간' },
    ],
    steps: [
      { order: 1, instruction: '밥에 참기름과 소금을 넣어 밑간합니다.' },
      { order: 2, instruction: '시금치는 데쳐서 참기름, 소금으로 무칩니다.' },
      { order: 3, instruction: '당근과 햄은 채 썰어 볶고, 계란은 지단을 부쳐 썹니다.' },
      { order: 4, instruction: '김 위에 밥을 얇게 펴고 재료를 가지런히 올립니다.', tip: '밥은 김 끝 2cm는 남겨두세요' },
      { order: 5, instruction: '돌돌 말아주고 참기름을 발라 마무리합니다.' },
      { order: 6, instruction: '먹기 좋은 크기로 썰어 담습니다.' },
    ],
    tips: ['밥이 너무 뜨거우면 김이 눅눅해집니다', '참기름을 바르면 김이 눅눅해지는 것을 방지합니다', '칼에 참기름을 바르면 잘 썰립니다'],
    nutrition: { calories: '280kcal', protein: '8g', carbs: '42g', fat: '9g' },
    author: '맛있는 기록',
    publishedDate: '2024-03-20',
    updatedDate: '2025-01-03',
  },
  // 양식 (Western)
  'carbonara': {
    title: '카르보나라',
    description: '크리미한 이탈리안 파스타의 정석',
    category: '양식',
    categorySlug: 'western',
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
    tips: ['불을 끄고 계란 소스를 넣어야 스크램블이 되지 않습니다', '면수의 전분이 소스를 부드럽게 만들어줍니다', '후추는 넉넉히 넣어야 제맛입니다'],
    nutrition: { calories: '580kcal', protein: '22g', carbs: '62g', fat: '28g' },
    author: '맛있는 기록',
    publishedDate: '2024-04-01',
    updatedDate: '2025-01-02',
  },
  'tomato-pasta': {
    title: '토마토 파스타',
    description: '상큼한 토마토 소스의 클래식 파스타',
    category: '양식',
    categorySlug: 'western',
    difficulty: '쉬움',
    time: '25분',
    servings: '2인분',
    emoji: '🍅',
    intro: '토마토 파스타는 토마토 소스를 베이스로 한 가장 기본적인 이탈리안 파스타입니다. 상큼하면서도 감칠맛이 있어 남녀노소 누구나 좋아하는 맛입니다.',
    ingredients: [
      { name: '스파게티', amount: '200g' },
      { name: '토마토 홀', amount: '1캔' },
      { name: '마늘', amount: '4쪽' },
      { name: '양파', amount: '1/2개' },
      { name: '올리브오일', amount: '3큰술' },
      { name: '바질', amount: '적당량' },
      { name: '설탕', amount: '1/2큰술' },
      { name: '소금, 후추', amount: '적당량' },
    ],
    steps: [
      { order: 1, instruction: '마늘은 편 썰고, 양파는 다져 준비합니다.' },
      { order: 2, instruction: '팬에 올리브오일을 두르고 마늘과 양파를 볶습니다.', tip: '약불에서 천천히 볶아야 향이 좋아요' },
      { order: 3, instruction: '토마토 홀을 넣고 으깨면서 10분간 끓입니다.' },
      { order: 4, instruction: '설탕, 소금, 후추로 간을 맞춥니다.' },
      { order: 5, instruction: '삶은 면을 소스에 넣고 버무립니다.' },
      { order: 6, instruction: '바질을 올려 마무리합니다.' },
    ],
    tips: ['토마토 소스의 신맛은 설탕으로 조절합니다', '버터를 조금 넣으면 더 부드러워집니다', '파마산 치즈를 뿌려 먹으면 더 맛있습니다'],
    nutrition: { calories: '420kcal', protein: '12g', carbs: '68g', fat: '14g' },
    author: '맛있는 기록',
    publishedDate: '2024-04-05',
    updatedDate: '2024-12-28',
  },
  'cream-pasta': {
    title: '크림 파스타',
    description: '부드럽고 고소한 크림소스 파스타',
    category: '양식',
    categorySlug: 'western',
    difficulty: '쉬움',
    time: '20분',
    servings: '2인분',
    emoji: '🧀',
    intro: '크림 파스타는 생크림을 베이스로 한 부드러운 파스타입니다. 버섯, 베이컨 등 다양한 재료와 잘 어울리며, 고소하고 크리미한 맛이 일품입니다.',
    ingredients: [
      { name: '펜네 또는 스파게티', amount: '200g' },
      { name: '생크림', amount: '200ml' },
      { name: '베이컨', amount: '80g' },
      { name: '양송이버섯', amount: '5개' },
      { name: '양파', amount: '1/2개' },
      { name: '마늘', amount: '2쪽' },
      { name: '파마산 치즈', amount: '30g' },
      { name: '버터', amount: '1큰술' },
      { name: '소금, 후추', amount: '적당량' },
    ],
    steps: [
      { order: 1, instruction: '베이컨, 버섯, 양파는 먹기 좋은 크기로 썹니다.' },
      { order: 2, instruction: '팬에 버터를 녹이고 마늘, 양파를 볶습니다.' },
      { order: 3, instruction: '베이컨과 버섯을 넣고 볶습니다.' },
      { order: 4, instruction: '생크림을 붓고 약불에서 살짝 졸입니다.', tip: '너무 오래 끓이면 분리될 수 있어요' },
      { order: 5, instruction: '삶은 면과 면수를 넣고 소스와 버무립니다.' },
      { order: 6, instruction: '파마산 치즈를 뿌리고 후추로 마무리합니다.' },
    ],
    tips: ['우유와 생크림을 1:1로 섞으면 덜 느끼합니다', '시금치를 넣으면 색도 예쁘고 영양도 좋습니다', '매운 것을 좋아하면 페페론치노를 넣어보세요'],
    nutrition: { calories: '620kcal', protein: '18g', carbs: '54g', fat: '38g' },
    author: '맛있는 기록',
    publishedDate: '2024-04-10',
    updatedDate: '2024-12-25',
  },
  'steak': {
    title: '스테이크',
    description: '레스토랑 못지않은 홈메이드 스테이크',
    category: '양식',
    categorySlug: 'western',
    difficulty: '보통',
    time: '30분',
    servings: '1인분',
    emoji: '🥩',
    intro: '스테이크는 두꺼운 소고기를 팬이나 그릴에 구워 만드는 서양의 대표적인 고기 요리입니다. 굽기 조절이 중요하며, 육즙을 잘 살리는 것이 포인트입니다.',
    ingredients: [
      { name: '소고기 스테이크용', amount: '200g' },
      { name: '버터', amount: '2큰술' },
      { name: '마늘', amount: '3쪽' },
      { name: '로즈마리', amount: '2줄기' },
      { name: '올리브오일', amount: '1큰술' },
      { name: '소금', amount: '적당량' },
      { name: '후추', amount: '적당량' },
    ],
    steps: [
      { order: 1, instruction: '고기는 조리 30분 전에 냉장고에서 꺼내 실온에 둡니다.' },
      { order: 2, instruction: '키친타월로 표면의 물기를 제거하고 소금, 후추를 뿌립니다.' },
      { order: 3, instruction: '팬을 센 불에 달구고 올리브오일을 둘러줍니다.' },
      { order: 4, instruction: '고기를 올리고 한 면당 2-3분씩 구워줍니다.', tip: '자주 뒤집지 말고 한 번만 뒤집으세요' },
      { order: 5, instruction: '버터, 마늘, 로즈마리를 넣고 버터를 떠서 고기 위에 끼얹어줍니다.' },
      { order: 6, instruction: '불을 끄고 5분간 레스팅 후 서빙합니다.' },
    ],
    tips: ['레스팅을 해야 육즙이 빠지지 않습니다', '미디엄 레어는 내부 온도 55도가 적당합니다', '굵은 소금을 사용하면 식감이 좋습니다'],
    nutrition: { calories: '480kcal', protein: '38g', carbs: '2g', fat: '36g' },
    author: '맛있는 기록',
    publishedDate: '2024-04-15',
    updatedDate: '2024-12-20',
  },
  'omurice': {
    title: '오므라이스',
    description: '부드러운 계란옷을 입은 볶음밥',
    category: '양식',
    categorySlug: 'western',
    difficulty: '보통',
    time: '25분',
    servings: '1인분',
    emoji: '🍳',
    intro: '오므라이스는 케첩 볶음밥을 부드러운 계란으로 감싼 일본식 양식 요리입니다. 아이들도 좋아하는 맛으로, 도시락 메뉴로도 인기가 좋습니다.',
    ingredients: [
      { name: '밥', amount: '1공기' },
      { name: '계란', amount: '3개' },
      { name: '양파', amount: '1/4개' },
      { name: '당근', amount: '1/4개' },
      { name: '햄', amount: '50g' },
      { name: '케첩', amount: '3큰술' },
      { name: '버터', amount: '2큰술' },
      { name: '소금, 후추', amount: '약간' },
      { name: '우유', amount: '1큰술' },
    ],
    steps: [
      { order: 1, instruction: '양파, 당근, 햄은 잘게 다집니다.' },
      { order: 2, instruction: '팬에 버터 1큰술을 녹이고 재료를 볶습니다.' },
      { order: 3, instruction: '밥을 넣고 케첩을 넣어 골고루 볶아 접시에 담습니다.' },
      { order: 4, instruction: '계란에 우유, 소금을 넣고 잘 풀어줍니다.' },
      { order: 5, instruction: '약불에 버터를 녹이고 계란물을 부어 젓가락으로 저으며 익힙니다.', tip: '약불에서 천천히 익혀야 부드러워요' },
      { order: 6, instruction: '반숙 상태일 때 밥 위에 올려 마무리합니다.' },
    ],
    tips: ['계란은 체에 한번 걸러주면 더 부드럽습니다', '데미글라스 소스를 뿌리면 더 맛있습니다', '완전히 익히면 식감이 퍽퍽해집니다'],
    nutrition: { calories: '520kcal', protein: '18g', carbs: '58g', fat: '24g' },
    author: '맛있는 기록',
    publishedDate: '2024-04-20',
    updatedDate: '2024-12-18',
  },
  // 중식 (Chinese)
  'fried-rice': {
    title: '볶음밥',
    description: '남은 재료로 뚝딱 만드는 한 그릇',
    category: '중식',
    categorySlug: 'chinese',
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
    tips: ['찬밥을 사용해야 밥알이 잘 떨어집니다', '재료는 모두 비슷한 크기로 다지면 보기 좋습니다', '김가루나 깨를 뿌려 먹으면 더 맛있습니다'],
    nutrition: { calories: '420kcal', protein: '14g', carbs: '52g', fat: '18g' },
    author: '맛있는 기록',
    publishedDate: '2024-05-01',
    updatedDate: '2024-12-15',
  },
  'jjajangmyeon': {
    title: '짜장면',
    description: '춘장의 깊은 맛이 일품인 국민 배달 음식',
    category: '중식',
    categorySlug: 'chinese',
    difficulty: '보통',
    time: '30분',
    servings: '2인분',
    emoji: '🍜',
    intro: '짜장면은 춘장을 볶아 만든 소스를 면에 비벼 먹는 한국식 중화요리입니다. 검은콩 소스의 깊은 맛과 달콤함이 특징이며, 배달 음식의 대명사로 불립니다.',
    ingredients: [
      { name: '중화면', amount: '2인분' },
      { name: '춘장', amount: '4큰술' },
      { name: '돼지고기', amount: '150g' },
      { name: '양파', amount: '1개' },
      { name: '감자', amount: '1개' },
      { name: '애호박', amount: '1/2개' },
      { name: '식용유', amount: '3큰술' },
      { name: '설탕', amount: '1큰술' },
      { name: '녹말물', amount: '2큰술' },
    ],
    steps: [
      { order: 1, instruction: '돼지고기와 채소는 깍둑썰기 합니다.' },
      { order: 2, instruction: '팬에 기름을 넉넉히 두르고 춘장을 볶아 기름장을 만듭니다.', tip: '춘장을 충분히 볶아야 맛이 깊어져요' },
      { order: 3, instruction: '돼지고기를 넣고 볶다가 양파, 감자를 넣어 볶습니다.' },
      { order: 4, instruction: '물 2컵을 붓고 끓이다 애호박을 넣습니다.' },
      { order: 5, instruction: '설탕으로 간을 하고 녹말물로 농도를 맞춥니다.' },
      { order: 6, instruction: '삶은 면에 소스를 올려 마무리합니다.' },
    ],
    tips: ['춘장은 캐러멜화될 때까지 볶아야 합니다', '면은 찬물에 헹궈 전분기를 빼주세요', '단무지와 양파절임을 곁들이면 더 맛있습니다'],
    nutrition: { calories: '580kcal', protein: '18g', carbs: '78g', fat: '22g' },
    author: '맛있는 기록',
    publishedDate: '2024-05-05',
    updatedDate: '2024-12-10',
  },
  'jjamppong': {
    title: '짬뽕',
    description: '얼큰하고 시원한 해물 국물의 정수',
    category: '중식',
    categorySlug: 'chinese',
    difficulty: '보통',
    time: '35분',
    servings: '2인분',
    emoji: '🦐',
    intro: '짬뽕은 각종 해물과 채소를 매콤한 국물에 끓여 면과 함께 먹는 요리입니다. 얼큰하면서도 시원한 국물 맛이 일품이며, 한국식 중화요리의 대표작입니다.',
    ingredients: [
      { name: '중화면', amount: '2인분' },
      { name: '오징어', amount: '1마리' },
      { name: '새우', amount: '10마리' },
      { name: '홍합', amount: '10개' },
      { name: '양파', amount: '1개' },
      { name: '양배추', amount: '2장' },
      { name: '당근', amount: '1/2개' },
      { name: '청양고추', amount: '2개' },
      { name: '고춧가루', amount: '2큰술' },
      { name: '간장', amount: '1큰술' },
      { name: '굴소스', amount: '1큰술' },
    ],
    steps: [
      { order: 1, instruction: '해물은 손질하고, 채소는 먹기 좋은 크기로 썹니다.' },
      { order: 2, instruction: '센 불에 기름을 두르고 해물을 빠르게 볶아 꺼내둡니다.' },
      { order: 3, instruction: '고춧가루를 넣고 기름에 볶아 매운기름을 만듭니다.', tip: '고춧가루가 타지 않게 주의하세요' },
      { order: 4, instruction: '채소를 넣고 볶다 물을 붓고 끓입니다.' },
      { order: 5, instruction: '간장, 굴소스로 간을 하고 해물을 다시 넣습니다.' },
      { order: 6, instruction: '삶은 면을 그릇에 담고 국물을 부어 마무리합니다.' },
    ],
    tips: ['해물은 오래 익히면 질겨지니 빠르게 볶으세요', '국물이 뽀얗게 되려면 센 불에서 끓여야 합니다', '청경채를 넣으면 색이 더 예쁩니다'],
    nutrition: { calories: '480kcal', protein: '28g', carbs: '62g', fat: '14g' },
    author: '맛있는 기록',
    publishedDate: '2024-05-10',
    updatedDate: '2024-12-08',
  },
  'tangsuyuk': {
    title: '탕수육',
    description: '바삭한 튀김옷과 새콤달콤 소스의 조화',
    category: '중식',
    categorySlug: 'chinese',
    difficulty: '어려움',
    time: '50분',
    servings: '3인분',
    emoji: '🍖',
    intro: '탕수육은 돼지고기를 바삭하게 튀겨 새콤달콤한 소스를 뿌려 먹는 요리입니다. 부먹vs찍먹 논쟁으로도 유명하며, 중식 코스의 꽃으로 불립니다.',
    ingredients: [
      { name: '돼지고기 안심', amount: '400g' },
      { name: '감자전분', amount: '1컵' },
      { name: '계란', amount: '1개' },
      { name: '오이', amount: '1/2개' },
      { name: '당근', amount: '1/2개' },
      { name: '양파', amount: '1/2개' },
      { name: '파인애플', amount: '100g' },
      { name: '설탕', amount: '4큰술' },
      { name: '식초', amount: '4큰술' },
      { name: '간장', amount: '1큰술' },
      { name: '녹말물', amount: '3큰술' },
    ],
    steps: [
      { order: 1, instruction: '돼지고기는 한입 크기로 잘라 간장, 후추로 밑간합니다.' },
      { order: 2, instruction: '전분과 계란을 섞어 튀김옷을 만들고 고기를 버무립니다.' },
      { order: 3, instruction: '170도 기름에 한번 튀기고, 180도에서 한번 더 튀깁니다.', tip: '두 번 튀겨야 바삭해요' },
      { order: 4, instruction: '채소는 깍둑썰기 하고 볶아줍니다.' },
      { order: 5, instruction: '물 1컵, 설탕, 식초, 간장을 넣고 끓입니다.' },
      { order: 6, instruction: '녹말물로 농도를 맞추고 채소를 넣어 탕수육 위에 뿌립니다.' },
    ],
    tips: ['튀김옷에 베이킹파우더를 넣으면 더 바삭합니다', '소스는 먹기 직전에 뿌려야 바삭함을 유지합니다', '찍먹파는 소스를 따로 담아 드세요'],
    nutrition: { calories: '580kcal', protein: '24g', carbs: '52g', fat: '32g' },
    author: '맛있는 기록',
    publishedDate: '2024-05-15',
    updatedDate: '2024-12-05',
  },
  // 일식 (Japanese)
  'katsudon': {
    title: '가츠동',
    description: '바삭한 돈까스와 부드러운 계란의 만남',
    category: '일식',
    categorySlug: 'japanese',
    difficulty: '보통',
    time: '30분',
    servings: '1인분',
    emoji: '🍱',
    intro: '가츠동은 돈까스를 계란에 반숙으로 익혀 밥 위에 올린 일본의 대표적인 덮밥 요리입니다. 바삭한 돈까스가 부드러운 계란옷을 입어 색다른 맛을 냅니다.',
    ingredients: [
      { name: '돈까스', amount: '1장' },
      { name: '밥', amount: '1공기' },
      { name: '계란', amount: '2개' },
      { name: '양파', amount: '1/4개' },
      { name: '대파', amount: '약간' },
      { name: '간장', amount: '2큰술' },
      { name: '미림', amount: '1큰술' },
      { name: '설탕', amount: '1큰술' },
      { name: '다시물', amount: '100ml' },
    ],
    steps: [
      { order: 1, instruction: '돈까스는 먹기 좋은 크기로 자릅니다.' },
      { order: 2, instruction: '양파는 채 썰고, 계란은 살짝 풀어둡니다.' },
      { order: 3, instruction: '팬에 다시물, 간장, 미림, 설탕을 넣고 끓입니다.' },
      { order: 4, instruction: '양파를 넣고 투명해지면 돈까스를 올립니다.' },
      { order: 5, instruction: '계란을 돌려가며 붓고 뚜껑을 덮어 반숙으로 익힙니다.', tip: '계란은 완전히 익히지 마세요' },
      { order: 6, instruction: '밥 위에 올리고 대파를 뿌려 마무리합니다.' },
    ],
    tips: ['돈까스는 갓 튀긴 것보다 조금 식은 게 소스가 잘 배어요', '계란을 두 번에 나눠 넣으면 층이 생겨요', '시치미를 뿌려 먹으면 더 맛있습니다'],
    nutrition: { calories: '680kcal', protein: '32g', carbs: '72g', fat: '28g' },
    author: '맛있는 기록',
    publishedDate: '2024-06-01',
    updatedDate: '2024-12-01',
  },
  'udon': {
    title: '우동',
    description: '쫄깃한 면발과 깊은 국물의 따뜻한 한 그릇',
    category: '일식',
    categorySlug: 'japanese',
    difficulty: '쉬움',
    time: '20분',
    servings: '1인분',
    emoji: '🍜',
    intro: '우동은 굵고 쫄깃한 면을 맑은 국물에 담아 먹는 일본의 면 요리입니다. 담백하면서도 감칠맛 있는 국물이 특징이며, 추운 날 먹으면 몸이 따뜻해집니다.',
    ingredients: [
      { name: '우동면', amount: '1인분' },
      { name: '가쓰오부시', amount: '10g' },
      { name: '다시마', amount: '5x5cm' },
      { name: '간장', amount: '2큰술' },
      { name: '미림', amount: '1큰술' },
      { name: '대파', amount: '1/2대' },
      { name: '어묵', amount: '1장' },
      { name: '계란', amount: '1개' },
    ],
    steps: [
      { order: 1, instruction: '물 500ml에 다시마를 넣고 끓기 직전에 건집니다.' },
      { order: 2, instruction: '가쓰오부시를 넣고 1분 후 체에 걸러 육수를 만듭니다.' },
      { order: 3, instruction: '육수에 간장, 미림을 넣어 간을 맞춥니다.' },
      { order: 4, instruction: '우동면을 삶아 그릇에 담습니다.' },
      { order: 5, instruction: '뜨거운 육수를 붓고 어묵, 대파, 계란을 올려 마무리합니다.' },
    ],
    tips: ['시판 우동 스프를 사용하면 더 간편합니다', '튀김을 올리면 튀김우동이 됩니다', '유부를 올리면 유부우동이 됩니다'],
    nutrition: { calories: '380kcal', protein: '14g', carbs: '62g', fat: '8g' },
    author: '맛있는 기록',
    publishedDate: '2024-06-05',
    updatedDate: '2024-11-28',
  },
  'curry-rice': {
    title: '카레라이스',
    description: '한국인 입맛에 맞는 걸쭉한 카레',
    category: '일식',
    categorySlug: 'japanese',
    difficulty: '쉬움',
    time: '40분',
    servings: '4인분',
    emoji: '🍛',
    intro: '카레라이스는 각종 채소와 고기를 카레 소스에 졸여 밥과 함께 먹는 요리입니다. 일본식 카레는 인도 카레보다 달고 걸쭉해 한국인 입맛에도 잘 맞습니다.',
    ingredients: [
      { name: '카레 루', amount: '1/2박스' },
      { name: '돼지고기 또는 소고기', amount: '200g' },
      { name: '감자', amount: '2개' },
      { name: '당근', amount: '1개' },
      { name: '양파', amount: '1개' },
      { name: '물', amount: '600ml' },
      { name: '식용유', amount: '2큰술' },
      { name: '밥', amount: '4공기' },
    ],
    steps: [
      { order: 1, instruction: '감자, 당근, 양파, 고기는 한입 크기로 자릅니다.' },
      { order: 2, instruction: '팬에 기름을 두르고 고기를 먼저 볶다 채소를 넣어 볶습니다.' },
      { order: 3, instruction: '물을 붓고 끓으면 약불에서 20분간 끓입니다.', tip: '감자가 익을 때까지 끓여주세요' },
      { order: 4, instruction: '불을 끄고 카레 루를 넣어 잘 녹입니다.' },
      { order: 5, instruction: '다시 약불에서 10분간 걸쭉해질 때까지 끓입니다.' },
      { order: 6, instruction: '밥 위에 카레를 끼얹어 마무리합니다.' },
    ],
    tips: ['하루 지난 카레가 더 맛있습니다', '사과를 갈아 넣으면 단맛이 납니다', '단무지나 락교를 곁들이면 더 맛있습니다'],
    nutrition: { calories: '520kcal', protein: '18g', carbs: '72g', fat: '18g' },
    author: '맛있는 기록',
    publishedDate: '2024-06-10',
    updatedDate: '2024-11-25',
  },
  'takoyaki': {
    title: '타코야키',
    description: '쫄깃한 문어가 들어간 동글동글 간식',
    category: '일식',
    categorySlug: 'japanese',
    difficulty: '보통',
    time: '30분',
    servings: '12개',
    emoji: '🐙',
    intro: '타코야키는 밀가루 반죽에 문어를 넣어 동글게 구워 만든 일본의 대표적인 길거리 음식입니다. 바삭한 겉면과 부드러운 속이 특징입니다.',
    ingredients: [
      { name: '타코야키 가루', amount: '100g' },
      { name: '물', amount: '300ml' },
      { name: '계란', amount: '1개' },
      { name: '문어', amount: '100g' },
      { name: '대파', amount: '2대' },
      { name: '텐카스', amount: '30g' },
      { name: '타코야키 소스', amount: '적당량' },
      { name: '마요네즈', amount: '적당량' },
      { name: '가쓰오부시', amount: '적당량' },
      { name: '아오노리', amount: '적당량' },
    ],
    steps: [
      { order: 1, instruction: '타코야키 가루, 물, 계란을 섞어 반죽을 만듭니다.' },
      { order: 2, instruction: '문어는 한입 크기로, 대파는 송송 썹니다.' },
      { order: 3, instruction: '타코야키 팬을 달구고 기름을 바릅니다.' },
      { order: 4, instruction: '반죽을 붓고 문어, 대파, 텐카스를 올립니다.' },
      { order: 5, instruction: '반죽이 익으면 꼬치로 돌려가며 동그랗게 만듭니다.', tip: '천천히 여러 번 돌려야 예쁘게 됩니다' },
      { order: 6, instruction: '소스, 마요네즈, 가쓰오부시, 아오노리를 뿌려 마무리합니다.' },
    ],
    tips: ['타코야키 팬이 없으면 에블스키버 팬을 사용하세요', '반죽은 묽게 만들어야 부드러워요', '치즈를 넣어도 맛있습니다'],
    nutrition: { calories: '320kcal', protein: '14g', carbs: '38g', fat: '12g' },
    author: '맛있는 기록',
    publishedDate: '2024-06-15',
    updatedDate: '2024-11-22',
  },
  'gyudon': {
    title: '규동',
    description: '달콤짭짤한 소고기 덮밥',
    category: '일식',
    categorySlug: 'japanese',
    difficulty: '쉬움',
    time: '20분',
    servings: '1인분',
    emoji: '🥩',
    intro: '규동은 얇게 썬 소고기와 양파를 달콤짭짤한 간장 소스에 졸여 밥 위에 올린 일본의 대표적인 덮밥입니다. 빠르게 만들 수 있어 간편식으로 인기가 좋습니다.',
    ingredients: [
      { name: '소고기 불고기용', amount: '150g' },
      { name: '양파', amount: '1/2개' },
      { name: '밥', amount: '1공기' },
      { name: '간장', amount: '2큰술' },
      { name: '미림', amount: '2큰술' },
      { name: '설탕', amount: '1큰술' },
      { name: '물', amount: '100ml' },
      { name: '생강', amount: '약간' },
      { name: '계란 노른자', amount: '1개' },
    ],
    steps: [
      { order: 1, instruction: '양파는 채 썰고, 생강은 다져 준비합니다.' },
      { order: 2, instruction: '팬에 물, 간장, 미림, 설탕, 생강을 넣고 끓입니다.' },
      { order: 3, instruction: '양파를 넣고 투명해질 때까지 끓입니다.' },
      { order: 4, instruction: '소고기를 넣고 익혀줍니다.', tip: '고기는 너무 오래 익히면 질겨져요' },
      { order: 5, instruction: '밥 위에 올리고 계란 노른자를 얹어 마무리합니다.' },
    ],
    tips: ['홍생강을 곁들이면 더 맛있습니다', '시치미를 뿌려 먹어도 좋아요', '소고기 대신 돼지고기를 넣으면 부타동이 됩니다'],
    nutrition: { calories: '580kcal', protein: '24g', carbs: '68g', fat: '22g' },
    author: '맛있는 기록',
    publishedDate: '2024-06-20',
    updatedDate: '2024-11-20',
  },
};

// 관련 레시피 가져오기
function getRelatedRecipes(currentId: string, category: string, limit: number = 3) {
  return Object.entries(recipeData)
    .filter(([id, recipe]) => id !== currentId && recipe.category === category)
    .slice(0, limit)
    .map(([id, recipe]) => ({ id, ...recipe }));
}

export async function generateStaticParams() {
  return Object.keys(recipeData).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const recipe = recipeData[id];
  if (!recipe) return { title: '레시피를 찾을 수 없습니다' };

  return {
    title: `${recipe.title} 레시피 - 맛있는 기록`,
    description: `${recipe.title} 만드는 법: ${recipe.description}. ${recipe.time} 소요, ${recipe.difficulty} 난이도. 재료와 조리법을 상세히 알려드립니다.`,
    keywords: [recipe.title, recipe.category, '레시피', '요리법', '만드는법', ...recipe.ingredients.map(i => i.name)],
    authors: [{ name: recipe.author }],
    openGraph: {
      title: `${recipe.title} 레시피`,
      description: recipe.description,
      type: 'article',
      publishedTime: recipe.publishedDate,
      modifiedTime: recipe.updatedDate,
      authors: [recipe.author],
    },
  };
}

export default async function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipe = recipeData[id];

  if (!recipe) {
    notFound();
  }

  const relatedRecipes = getRelatedRecipes(id, recipe.category);

  // JSON-LD 구조화 데이터
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.intro,
    author: {
      '@type': 'Organization',
      name: recipe.author,
    },
    datePublished: recipe.publishedDate,
    dateModified: recipe.updatedDate,
    prepTime: `PT${parseInt(recipe.time)}M`,
    cookTime: `PT${parseInt(recipe.time)}M`,
    totalTime: `PT${parseInt(recipe.time)}M`,
    recipeYield: recipe.servings,
    recipeCategory: recipe.category,
    recipeCuisine: recipe.category === '한식' ? 'Korean' : recipe.category === '양식' ? 'Western' : recipe.category === '중식' ? 'Chinese' : 'Japanese',
    recipeIngredient: recipe.ingredients.map(i => `${i.name} ${i.amount}`),
    recipeInstructions: recipe.steps.map(step => ({
      '@type': 'HowToStep',
      position: step.order,
      text: step.instruction,
    })),
    nutrition: recipe.nutrition ? {
      '@type': 'NutritionInformation',
      calories: recipe.nutrition.calories,
      proteinContent: recipe.nutrition.protein,
      carbohydrateContent: recipe.nutrition.carbs,
      fatContent: recipe.nutrition.fat,
    } : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen max-w-2xl mx-auto p-6 pb-20">
        {/* 브레드크럼 */}
        <nav className="text-sm mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-warm-500">
            <li><Link href="/" className="hover:text-orange-600">홈</Link></li>
            <li>/</li>
            <li><Link href="/recipes" className="hover:text-orange-600">레시피</Link></li>
            <li>/</li>
            <li><Link href={`/recipes?category=${recipe.categorySlug}`} className="hover:text-orange-600">{recipe.category}</Link></li>
            <li>/</li>
            <li className="text-warm-700 font-medium">{recipe.title}</li>
          </ol>
        </nav>

        {/* 헤더 */}
        <header className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{recipe.emoji}</span>
            <div>
              <h1 className="text-3xl font-bold">{recipe.title}</h1>
              <p className="text-orange-100">{recipe.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-lg">{recipe.category}</span>
            <span className="bg-white/20 px-3 py-1 rounded-lg">난이도: {recipe.difficulty}</span>
            <span className="bg-white/20 px-3 py-1 rounded-lg">조리시간: {recipe.time}</span>
            <span className="bg-white/20 px-3 py-1 rounded-lg">{recipe.servings}</span>
          </div>
          <div className="mt-4 text-xs text-orange-100">
            작성: {recipe.publishedDate} | 수정: {recipe.updatedDate} | 작성자: {recipe.author}
          </div>
        </header>

        {/* 소개 */}
        <article>
          <section className="bg-white rounded-2xl shadow-soft p-6 mb-6">
            <h2 className="sr-only">요리 소개</h2>
            <p className="text-warm-700 leading-relaxed">{recipe.intro}</p>
          </section>

          {/* 영양 정보 */}
          {recipe.nutrition && (
            <section className="bg-green-50 rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-warm-800 mb-3 flex items-center gap-2">
                <span>📊</span> 영양 정보 (1인분 기준)
              </h2>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="bg-white rounded-lg p-3">
                  <div className="text-lg font-bold text-orange-600">{recipe.nutrition.calories}</div>
                  <div className="text-xs text-warm-500">칼로리</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-lg font-bold text-blue-600">{recipe.nutrition.protein}</div>
                  <div className="text-xs text-warm-500">단백질</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-lg font-bold text-yellow-600">{recipe.nutrition.carbs}</div>
                  <div className="text-xs text-warm-500">탄수화물</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-lg font-bold text-red-600">{recipe.nutrition.fat}</div>
                  <div className="text-xs text-warm-500">지방</div>
                </div>
              </div>
            </section>
          )}

          {/* 재료 */}
          <section className="bg-white rounded-2xl shadow-soft p-6 mb-6">
            <h2 className="text-xl font-semibold text-warm-800 mb-4 flex items-center gap-2">
              <span>🥬</span> 재료
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {recipe.ingredients.map((ing, idx) => (
                <div key={idx} className="flex justify-between bg-warm-50 p-3 rounded-lg">
                  <span className="text-warm-700">{ing.name}</span>
                  <span className="text-warm-500 font-medium">{ing.amount}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 조리 순서 */}
          <section className="bg-white rounded-2xl shadow-soft p-6 mb-6">
            <h2 className="text-xl font-semibold text-warm-800 mb-4 flex items-center gap-2">
              <span>👨‍🍳</span> 조리 순서
            </h2>
            <ol className="space-y-4">
              {recipe.steps.map((step) => (
                <li key={step.order} className="flex gap-4">
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
                </li>
              ))}
            </ol>
          </section>

          {/* 요리 팁 */}
          <section className="bg-yellow-50 rounded-2xl p-6 mb-6">
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
          </section>
        </article>

        {/* 관련 레시피 */}
        {relatedRecipes.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-warm-800 mb-4">🍽️ 비슷한 {recipe.category} 레시피</h2>
            <div className="grid gap-3">
              {relatedRecipes.map((related) => (
                <Link
                  key={related.id}
                  href={`/recipes/${related.id}`}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-soft hover:shadow-md transition-shadow"
                >
                  <span className="text-3xl">{related.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-medium text-warm-800">{related.title}</h3>
                    <p className="text-sm text-warm-500">{related.description}</p>
                  </div>
                  <span className="text-orange-500">→</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-warm-100 rounded-2xl p-6 text-center">
          <p className="text-warm-700 mb-4">이 레시피를 저장하고 싶으신가요?</p>
          <Link
            href="/"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors"
          >
            앱에서 나만의 레시피 저장하기
          </Link>
        </section>
      </main>
    </>
  );
}
