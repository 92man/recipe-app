import Link from 'next/link';

export const metadata = {
  title: '요리 초보 가이드 - 맛있는 기록',
  description: '요리를 처음 시작하는 분들을 위한 기초 가이드. 필수 조리도구, 기본 양념, 계량법 등을 알려드립니다.',
  alternates: { canonical: 'https://tasty-record.com/guide' },
  openGraph: { url: 'https://tasty-record.com/guide' },
};

export default function GuidePage() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto p-6 pb-20">
      <Link href="/" className="text-orange-600 hover:underline mb-6 inline-block">
        ← 홈으로
      </Link>

      <h1 className="text-3xl font-bold text-warm-800 mb-2">요리 초보 가이드</h1>
      <p className="text-warm-600 mb-8">
        요리를 처음 시작하시나요? 기본부터 차근차근 알려드릴게요.
      </p>

      {/* 필수 조리도구 */}
      <section className="bg-white rounded-2xl shadow-soft p-6 mb-6">
        <h2 className="text-xl font-semibold text-warm-800 mb-4 flex items-center gap-2">
          <span>🍳</span> 필수 조리도구
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: '프라이팬', desc: '볶음, 부침 등 다용도', emoji: '🍳' },
            { name: '냄비', desc: '국, 찌개, 삶기용', emoji: '🍲' },
            { name: '도마', desc: '재료 손질 필수템', emoji: '🪵' },
            { name: '칼', desc: '식칼 하나면 충분', emoji: '🔪' },
            { name: '주걱/뒤집개', desc: '볶을 때 필수', emoji: '🥄' },
            { name: '계량컵/스푼', desc: '정확한 계량을 위해', emoji: '🥛' },
          ].map((item, idx) => (
            <div key={idx} className="bg-warm-50 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{item.emoji}</span>
                <span className="font-medium text-warm-800">{item.name}</span>
              </div>
              <p className="text-sm text-warm-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 기본 양념 */}
      <section className="bg-white rounded-2xl shadow-soft p-6 mb-6">
        <h2 className="text-xl font-semibold text-warm-800 mb-4 flex items-center gap-2">
          <span>🧂</span> 기본 양념 (한식 기준)
        </h2>
        <div className="space-y-3">
          {[
            { name: '소금', use: '기본 간, 절임', importance: '필수' },
            { name: '간장', use: '볶음, 조림, 찌개', importance: '필수' },
            { name: '고춧가루', use: '찌개, 무침, 볶음', importance: '필수' },
            { name: '된장', use: '된장찌개, 쌈장', importance: '필수' },
            { name: '고추장', use: '비빔밥, 찌개, 볶음', importance: '필수' },
            { name: '설탕', use: '단맛, 윤기', importance: '필수' },
            { name: '참기름', use: '마무리 향, 무침', importance: '필수' },
            { name: '다진마늘', use: '거의 모든 한식', importance: '필수' },
            { name: '식용유', use: '볶음, 부침', importance: '필수' },
            { name: '맛술/미림', use: '잡내 제거, 윤기', importance: '권장' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between bg-warm-50 p-3 rounded-lg">
              <div>
                <span className="font-medium text-warm-800">{item.name}</span>
                <span className="text-sm text-warm-500 ml-2">{item.use}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                item.importance === '필수'
                  ? 'bg-orange-100 text-orange-600'
                  : 'bg-warm-200 text-warm-600'
              }`}>
                {item.importance}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 계량법 */}
      <section className="bg-white rounded-2xl shadow-soft p-6 mb-6">
        <h2 className="text-xl font-semibold text-warm-800 mb-4 flex items-center gap-2">
          <span>📏</span> 계량법 알아두기
        </h2>
        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-xl">
            <h3 className="font-medium text-warm-800 mb-2">숟가락 계량</h3>
            <ul className="text-sm text-warm-700 space-y-1">
              <li>• <strong>1큰술</strong> = 밥숟가락으로 수북하게 = 약 15ml</li>
              <li>• <strong>1작은술</strong> = 찻숟가락으로 수북하게 = 약 5ml</li>
              <li>• <strong>1/2큰술</strong> = 밥숟가락으로 반 정도</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl">
            <h3 className="font-medium text-warm-800 mb-2">컵 계량</h3>
            <ul className="text-sm text-warm-700 space-y-1">
              <li>• <strong>1컵</strong> = 200ml (종이컵 기준)</li>
              <li>• <strong>밥 1공기</strong> = 약 200g</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-xl">
            <h3 className="font-medium text-warm-800 mb-2">손 계량</h3>
            <ul className="text-sm text-warm-700 space-y-1">
              <li>• <strong>한 줌</strong> = 한 손에 가볍게 쥔 양</li>
              <li>• <strong>한 꼬집</strong> = 엄지와 검지로 집은 양</li>
              <li>• <strong>약간</strong> = 1/4작은술 정도</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 불 조절 */}
      <section className="bg-white rounded-2xl shadow-soft p-6 mb-6">
        <h2 className="text-xl font-semibold text-warm-800 mb-4 flex items-center gap-2">
          <span>🔥</span> 불 조절 가이드
        </h2>
        <div className="space-y-3">
          <div className="border-l-4 border-red-500 pl-4 py-2">
            <h3 className="font-medium text-warm-800">센 불 (강불)</h3>
            <p className="text-sm text-warm-600">볶음, 구이 등 빠르게 익혀야 할 때</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-4 py-2">
            <h3 className="font-medium text-warm-800">중불</h3>
            <p className="text-sm text-warm-600">대부분의 조리에 사용, 찌개 끓이기</p>
          </div>
          <div className="border-l-4 border-yellow-500 pl-4 py-2">
            <h3 className="font-medium text-warm-800">약불 (약한 불)</h3>
            <p className="text-sm text-warm-600">조림, 오래 끓이기, 뭉근하게 익히기</p>
          </div>
        </div>
      </section>

      {/* 초보자 꿀팁 */}
      <section className="bg-yellow-50 rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-warm-800 mb-4 flex items-center gap-2">
          <span>💡</span> 초보자 꿀팁
        </h2>
        <ul className="space-y-3 text-warm-700">
          <li className="flex gap-2">
            <span className="text-orange-500">1.</span>
            <span><strong>재료는 미리 손질해두세요.</strong> 조리 중에 재료 손질하면 타거나 익지 않을 수 있어요.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-orange-500">2.</span>
            <span><strong>레시피를 끝까지 읽고 시작하세요.</strong> 중간에 당황하지 않으려면 전체 과정을 파악하는 게 좋아요.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-orange-500">3.</span>
            <span><strong>간은 조금씩 맞추세요.</strong> 싱거운 건 추가할 수 있지만, 짠 건 되돌리기 어려워요.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-orange-500">4.</span>
            <span><strong>실패해도 괜찮아요.</strong> 모든 요리 고수도 처음엔 초보였답니다!</span>
          </li>
        </ul>
      </section>

      {/* CTA */}
      <div className="bg-warm-100 rounded-2xl p-6 text-center">
        <p className="text-warm-700 mb-4">이제 직접 요리를 시작해볼까요?</p>
        <Link
          href="/recipes"
          className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors"
        >
          쉬운 레시피부터 도전하기
        </Link>
      </div>
    </main>
  );
}
