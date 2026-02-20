import Link from 'next/link';

export const metadata = {
  title: '요리 팁 & 노하우 - 맛있는 기록 | 요리 꿀팁 모음',
  description: '요리를 더 맛있게 만드는 꿀팁과 노하우. 재료 보관법, 맛내기 비법, 시간 단축 팁, 실패 방지 노하우를 알려드립니다. 초보 요리사도 쉽게 따라할 수 있는 실용적인 팁.',
  keywords: ['요리 팁', '요리 노하우', '요리 꿀팁', '재료 보관법', '맛내기 비법', '요리 초보'],
  alternates: { canonical: 'https://tasty-record.com/tips' },
  openGraph: { url: 'https://tasty-record.com/tips' },
};

const tips = [
  {
    category: '맛내기 비법',
    emoji: '✨',
    description: '요리의 맛을 한층 업그레이드하는 프로 셰프의 비밀',
    items: [
      {
        title: '고기 잡내 제거하는 법',
        content: '고기를 조리하기 전 맛술이나 청주에 10분간 재워두면 잡내가 사라집니다. 생강즙을 조금 넣으면 더 효과적이에요.',
        difficulty: '쉬움',
      },
      {
        title: '국물 요리 감칠맛 더하기',
        content: '찌개나 국을 끓일 때 다시마를 5분간 넣었다 빼면 감칠맛이 확 올라갑니다. 너무 오래 끓이면 미끈해지니 주의하세요.',
        difficulty: '쉬움',
      },
      {
        title: '볶음밥 맛있게 만들기',
        content: '밥을 볶기 전에 계란과 미리 섞어두면 밥알이 코팅되어 파라파라해집니다. 찬밥을 쓰는 것도 포인트!',
        difficulty: '쉬움',
      },
      {
        title: '고기 부드럽게 만들기',
        content: '배, 키위, 파인애플 등 과일즙에 고기를 재우면 효소 작용으로 육질이 부드러워집니다. 30분 이상은 재우지 마세요.',
        difficulty: '보통',
      },
    ],
  },
  {
    category: '재료 보관법',
    emoji: '🥬',
    description: '식재료를 오래 신선하게 보관하는 방법',
    items: [
      {
        title: '대파 오래 보관하기',
        content: '대파는 뿌리 부분을 물에 담가 냉장 보관하면 2주 이상 신선하게 유지됩니다. 물은 2-3일마다 갈아주세요.',
        difficulty: '쉬움',
      },
      {
        title: '마늘 쉽게 보관하기',
        content: '다진 마늘은 지퍼백에 얇게 펴서 냉동하면 필요할 때마다 쪼개 쓸 수 있어요. 해동 없이 바로 조리 가능합니다.',
        difficulty: '쉬움',
      },
      {
        title: '허브 신선하게 보관',
        content: '바질, 파슬리 등 허브는 줄기 끝을 자르고 물에 꽂아 비닐을 씌워 냉장 보관하면 일주일 이상 싱싱해요.',
        difficulty: '쉬움',
      },
      {
        title: '양파 눈물 없이 썰기',
        content: '양파를 30분간 냉동실에 넣었다가 썰면 눈물이 나지 않습니다. 또는 물에 담갔다가 썰어도 좋아요.',
        difficulty: '쉬움',
      },
    ],
  },
  {
    category: '시간 단축 팁',
    emoji: '⏱️',
    description: '바쁜 일상 속 요리 시간을 줄여주는 스마트한 방법',
    items: [
      {
        title: '감자 빨리 익히기',
        content: '감자를 전자레인지에 3-4분 돌린 후 조리하면 시간을 크게 단축할 수 있습니다. 찌개나 카레에 활용해보세요.',
        difficulty: '쉬움',
      },
      {
        title: '냉동 고기 빠르게 해동',
        content: '고기를 지퍼백에 넣고 찬물에 담가두면 30분 내로 해동됩니다. 물은 중간에 한 번 갈아주세요.',
        difficulty: '쉬움',
      },
      {
        title: '마늘 껍질 쉽게 까기',
        content: '마늘을 전자레인지에 10초간 돌리면 껍질이 쏙쏙 벗겨집니다. 대량으로 까야 할 때 유용해요.',
        difficulty: '쉬움',
      },
      {
        title: '당면 빠르게 불리기',
        content: '당면에 뜨거운 물을 부으면 10분 내로 불릴 수 있습니다. 미지근한 물보다 훨씬 빨라요.',
        difficulty: '쉬움',
      },
    ],
  },
  {
    category: '실패 방지 팁',
    emoji: '🛡️',
    description: '요리 실패를 막아주는 검증된 노하우',
    items: [
      {
        title: '계란 프라이 안 퍼지게',
        content: '팬에 기름을 두르고 충분히 달궈진 후 계란을 넣으세요. 불이 약하면 흰자가 퍼집니다.',
        difficulty: '쉬움',
      },
      {
        title: '파스타 면 안 불게',
        content: '파스타 삶을 때 소금을 넉넉히 넣고, 완성 직전에 면수를 조금 넣어 섞으면 면이 안 붑니다.',
        difficulty: '보통',
      },
      {
        title: '생선 살 안 부서지게',
        content: '생선을 구울 때 한 면이 완전히 익어 떨어질 때까지 뒤집지 마세요. 너무 자주 뒤집으면 부서집니다.',
        difficulty: '보통',
      },
      {
        title: '고기 안 질기게 굽기',
        content: '고기는 냉장고에서 꺼내 실온에 30분 두었다가 구우면 균일하게 익어 질기지 않습니다.',
        difficulty: '쉬움',
      },
    ],
  },
  {
    category: '청소 & 정리',
    emoji: '🧹',
    description: '요리 후 깔끔하게 정리하는 주방 청소 팁',
    items: [
      {
        title: '기름때 쉽게 제거',
        content: '기름때가 묻은 그릇에 밀가루를 뿌려 문지른 후 씻으면 깔끔하게 제거됩니다.',
        difficulty: '쉬움',
      },
      {
        title: '도마 냄새 제거',
        content: '도마에 굵은 소금을 뿌리고 레몬으로 문지른 후 헹구면 냄새가 사라집니다.',
        difficulty: '쉬움',
      },
      {
        title: '전자레인지 청소',
        content: '물에 레몬즙을 넣고 5분간 돌린 후 안쪽을 닦으면 기름때와 냄새가 쉽게 제거됩니다.',
        difficulty: '쉬움',
      },
      {
        title: '냄비 눌음 제거',
        content: '눌은 냄비에 물과 베이킹소다를 넣고 끓인 후 수세미로 닦으면 깨끗해집니다.',
        difficulty: '쉬움',
      },
    ],
  },
];

const quickStats = [
  { value: '20+', label: '요리 팁' },
  { value: '5', label: '카테고리' },
  { value: '무료', label: '이용료' },
];

export default function TipsPage() {
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
          요리 팁 & 노하우
        </h1>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
          요리를 더 쉽고 맛있게 만드는 꿀팁들을 모았습니다.
          초보자도 쉽게 따라할 수 있는 실용적인 팁으로 요리 실력을 업그레이드하세요.
        </p>

        {/* 통계 */}
        <div className="grid grid-cols-3 gap-3">
          {quickStats.map((stat, idx) => (
            <div
              key={idx}
              className="content-card p-4 text-center"
            >
              <div className="stat-value" style={{ color: 'var(--accent-600)' }}>
                {stat.value}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </header>

      {/* 팁 목록 */}
      {tips.map((section, sectionIdx) => (
        <section key={sectionIdx} className="mb-10">
          <div className="mb-4">
            <h2
              className="section-title flex items-center gap-2"
            >
              <span>{section.emoji}</span> {section.category}
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              {section.description}
            </p>
          </div>

          <div className="space-y-3">
            {section.items.map((tip, tipIdx) => (
              <div key={tipIdx} className="recipe-card p-5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3
                    className="font-medium"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {tip.title}
                  </h3>
                  <span className="badge-subtle text-xs flex-shrink-0">
                    {tip.difficulty}
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {tip.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* 추가 정보 */}
      <section className="mb-10">
        <h2 className="section-title mb-4">알아두면 좋은 요리 상식</h2>
        <div className="content-card p-5 space-y-4">
          <div>
            <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              왜 고기를 실온에 두어야 할까요?
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              냉장고에서 바로 꺼낸 차가운 고기를 구우면 바깥은 타고 안은 익지 않는 현상이 생깁니다.
              실온에 30분 정도 두면 고기 내부까지 균일한 온도가 되어 고르게 익힐 수 있습니다.
            </p>
          </div>
          <div className="divider" />
          <div>
            <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              소금의 역할
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              소금은 단순히 짠맛만 내는 게 아닙니다. 채소의 수분을 빼고, 고기의 단백질을 응고시키며,
              전체적인 맛의 밸런스를 잡아주는 역할을 합니다. 간은 항상 마지막에 맞추는 것이 좋습니다.
            </p>
          </div>
          <div className="divider" />
          <div>
            <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              팬 예열의 중요성
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              충분히 달궈지지 않은 팬에서 재료를 볶으면 눅눅해지고 볶는 게 아니라 찌는 것 같은 느낌이 됩니다.
              팬에서 연기가 살짝 날 정도로 예열한 후 재료를 넣으면 겉은 바삭하고 속은 촉촉한 요리가 완성됩니다.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="recipe-card p-6 text-center"
        style={{ background: 'var(--gradient-warm)' }}
      >
        <div className="text-3xl mb-3">📝</div>
        <h3
          className="font-handwriting text-xl mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          나만의 요리 팁을 기록해보세요!
        </h3>
        <p
          className="text-sm mb-4"
          style={{ color: 'var(--text-secondary)' }}
        >
          음성으로 간편하게 요리 팁과 레시피를 기록하고 저장할 수 있습니다.
        </p>
        <Link href="/" className="btn-primary inline-block">
          앱에서 레시피 기록하기
        </Link>
      </section>

      {/* SEO 콘텐츠 */}
      <section className="mt-10">
        <h2 className="section-title mb-4">요리 실력 향상을 위한 조언</h2>
        <div className="prose prose-sm" style={{ color: 'var(--text-tertiary)' }}>
          <p className="mb-4">
            요리는 경험과 연습이 중요합니다. 처음에는 레시피를 정확히 따라하고,
            익숙해지면 자신만의 변형을 시도해보세요.
          </p>
          <p className="mb-4">
            실패를 두려워하지 마세요. 모든 훌륭한 요리사도 수많은 실패를 통해 배웠습니다.
            중요한 것은 실패에서 배우고 다음에 더 나은 요리를 만드는 것입니다.
          </p>
          <p>
            좋은 재료가 좋은 요리의 시작입니다. 신선한 제철 재료를 사용하면
            특별한 기술 없이도 맛있는 요리를 만들 수 있습니다.
          </p>
        </div>
      </section>
    </main>
  );
}
