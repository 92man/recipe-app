import Link from 'next/link';

export const metadata = {
  title: '요리 팁 & 노하우 - 맛있는 기록',
  description: '요리를 더 맛있게 만드는 꿀팁과 노하우. 재료 보관법, 맛내기 비법, 시간 단축 팁을 알려드립니다.',
};

const tips = [
  {
    category: '맛내기 비법',
    emoji: '✨',
    items: [
      {
        title: '고기 잡내 제거하는 법',
        content: '고기를 조리하기 전 맛술이나 청주에 10분간 재워두면 잡내가 사라집니다. 생강즙을 조금 넣으면 더 효과적이에요.',
      },
      {
        title: '국물 요리 감칠맛 더하기',
        content: '찌개나 국을 끓일 때 다시마를 5분간 넣었다 빼면 감칠맛이 확 올라갑니다. 너무 오래 끓이면 미끈해지니 주의하세요.',
      },
      {
        title: '볶음밥 맛있게 만들기',
        content: '밥을 볶기 전에 계란과 미리 섞어두면 밥알이 코팅되어 파라파라해집니다. 찬밥을 쓰는 것도 포인트!',
      },
      {
        title: '고기 부드럽게 만들기',
        content: '배, 키위, 파인애플 등 과일즙에 고기를 재우면 효소 작용으로 육질이 부드러워집니다. 30분 이상은 재우지 마세요.',
      },
    ],
  },
  {
    category: '재료 보관법',
    emoji: '🥬',
    items: [
      {
        title: '대파 오래 보관하기',
        content: '대파는 뿌리 부분을 물에 담가 냉장 보관하면 2주 이상 신선하게 유지됩니다. 물은 2-3일마다 갈아주세요.',
      },
      {
        title: '마늘 쉽게 보관하기',
        content: '다진 마늘은 지퍼백에 얇게 펴서 냉동하면 필요할 때마다 쪼개 쓸 수 있어요. 해동 없이 바로 조리 가능합니다.',
      },
      {
        title: '허브 신선하게 보관',
        content: '바질, 파슬리 등 허브는 줄기 끝을 자르고 물에 꽂아 비닐을 씌워 냉장 보관하면 일주일 이상 싱싱해요.',
      },
      {
        title: '양파 눈물 없이 썰기',
        content: '양파를 30분간 냉동실에 넣었다가 썰면 눈물이 나지 않습니다. 또는 물에 담갔다가 썰어도 좋아요.',
      },
    ],
  },
  {
    category: '시간 단축 팁',
    emoji: '⏱️',
    items: [
      {
        title: '감자 빨리 익히기',
        content: '감자를 전자레인지에 3-4분 돌린 후 조리하면 시간을 크게 단축할 수 있습니다. 찌개나 카레에 활용해보세요.',
      },
      {
        title: '냉동 고기 빠르게 해동',
        content: '고기를 지퍼백에 넣고 찬물에 담가두면 30분 내로 해동됩니다. 물은 중간에 한 번 갈아주세요.',
      },
      {
        title: '마늘 껍질 쉽게 까기',
        content: '마늘을 전자레인지에 10초간 돌리면 껍질이 쏙쏙 벗겨집니다. 대량으로 까야 할 때 유용해요.',
      },
      {
        title: '당면 빠르게 불리기',
        content: '당면에 뜨거운 물을 부으면 10분 내로 불릴 수 있습니다. 미지근한 물보다 훨씬 빨라요.',
      },
    ],
  },
  {
    category: '실패 방지 팁',
    emoji: '🛡️',
    items: [
      {
        title: '계란 프라이 안 퍼지게',
        content: '팬에 기름을 두르고 충분히 달궈진 후 계란을 넣으세요. 불이 약하면 흰자가 퍼집니다.',
      },
      {
        title: '파스타 면 안 불게',
        content: '파스타 삶을 때 소금을 넉넉히 넣고, 완성 직전에 면수를 조금 넣어 섞으면 면이 안 붑니다.',
      },
      {
        title: '생선 살 안 부서지게',
        content: '생선을 구울 때 한 면이 완전히 익어 떨어질 때까지 뒤집지 마세요. 너무 자주 뒤집으면 부서집니다.',
      },
      {
        title: '고기 안 질기게 굽기',
        content: '고기는 냉장고에서 꺼내 실온에 30분 두었다가 구우면 균일하게 익어 질기지 않습니다.',
      },
    ],
  },
  {
    category: '청소 & 정리',
    emoji: '🧹',
    items: [
      {
        title: '기름때 쉽게 제거',
        content: '기름때가 묻은 그릇에 밀가루를 뿌려 문지른 후 씻으면 깔끔하게 제거됩니다.',
      },
      {
        title: '도마 냄새 제거',
        content: '도마에 굵은 소금을 뿌리고 레몬으로 문지른 후 헹구면 냄새가 사라집니다.',
      },
      {
        title: '전자레인지 청소',
        content: '물에 레몬즙을 넣고 5분간 돌린 후 안쪽을 닦으면 기름때와 냄새가 쉽게 제거됩니다.',
      },
      {
        title: '냄비 눌음 제거',
        content: '눌은 냄비에 물과 베이킹소다를 넣고 끓인 후 수세미로 닦으면 깨끗해집니다.',
      },
    ],
  },
];

export default function TipsPage() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto p-6 pb-20">
      <Link href="/" className="text-orange-600 hover:underline mb-6 inline-block">
        ← 홈으로
      </Link>

      <h1 className="text-3xl font-bold text-warm-800 mb-2">요리 팁 & 노하우</h1>
      <p className="text-warm-600 mb-8">
        요리를 더 쉽고 맛있게 만드는 꿀팁들을 모았습니다.
      </p>

      {tips.map((section, sectionIdx) => (
        <section key={sectionIdx} className="mb-8">
          <h2 className="text-xl font-semibold text-warm-800 mb-4 flex items-center gap-2">
            <span>{section.emoji}</span> {section.category}
          </h2>
          <div className="space-y-4">
            {section.items.map((tip, tipIdx) => (
              <div key={tipIdx} className="bg-white rounded-xl shadow-soft p-5">
                <h3 className="font-medium text-warm-800 mb-2">{tip.title}</h3>
                <p className="text-warm-600 text-sm leading-relaxed">{tip.content}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* CTA */}
      <div className="bg-orange-50 rounded-2xl p-6 text-center">
        <p className="text-warm-700 mb-4">나만의 요리 팁을 기록해보세요!</p>
        <Link
          href="/"
          className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors"
        >
          앱에서 레시피 기록하기
        </Link>
      </div>
    </main>
  );
}
