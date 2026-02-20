import Link from 'next/link';

export const metadata = {
  title: '서비스 소개 - 맛있는 기록',
  description: '맛있는 기록은 AI를 활용한 스마트 레시피 기록 앱입니다.',
  alternates: { canonical: 'https://tasty-record.com/about' },
  openGraph: { url: 'https://tasty-record.com/about' },
};

export default function About() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto p-6 pb-20">
      <Link href="/" className="text-orange-600 hover:underline mb-6 inline-block">
        ← 홈으로
      </Link>

      <div className="text-center mb-10">
        <span className="text-6xl">🍳</span>
        <h1 className="text-3xl font-bold text-warm-800 mt-4">맛있는 기록</h1>
        <p className="text-warm-600 mt-2">AI를 활용한 스마트 레시피 기록 앱</p>
      </div>

      <div className="space-y-8">
        <section className="bg-white rounded-2xl shadow-soft p-6">
          <h2 className="text-xl font-semibold text-warm-800 mb-4 flex items-center gap-2">
            <span>🎯</span> 서비스 소개
          </h2>
          <p className="text-warm-700 leading-relaxed">
            맛있는 기록은 요리하는 순간을 쉽게 기록하고, AI의 도움으로 체계적인
            레시피로 정리해주는 서비스입니다. 복잡한 레시피 작성 없이,
            음성이나 사진만으로 나만의 레시피북을 완성할 수 있습니다.
          </p>
        </section>

        <section className="bg-white rounded-2xl shadow-soft p-6">
          <h2 className="text-xl font-semibold text-warm-800 mb-4 flex items-center gap-2">
            <span>✨</span> 주요 기능
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🎙️</span>
              </div>
              <div>
                <h3 className="font-medium text-warm-800">음성 레시피 기록</h3>
                <p className="text-warm-600 text-sm mt-1">
                  요리하면서 말로 설명하면 AI가 자동으로 레시피로 정리해줍니다.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📷</span>
              </div>
              <div>
                <h3 className="font-medium text-warm-800">AI 이미지 분석</h3>
                <p className="text-warm-600 text-sm mt-1">
                  음식 사진을 찍으면 AI가 재료와 조리법을 분석하여 레시피를 추천합니다.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🔍</span>
              </div>
              <div>
                <h3 className="font-medium text-warm-800">레시피 검색</h3>
                <p className="text-warm-600 text-sm mt-1">
                  만들고 싶은 요리 이름을 검색하면 상세한 레시피를 제공합니다.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <h3 className="font-medium text-warm-800">나만의 레시피북</h3>
                <p className="text-warm-600 text-sm mt-1">
                  저장한 레시피를 언제든지 확인하고 관리할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-soft p-6">
          <h2 className="text-xl font-semibold text-warm-800 mb-4 flex items-center gap-2">
            <span>🤖</span> 사용 기술
          </h2>
          <p className="text-warm-700 leading-relaxed">
            맛있는 기록은 Google Gemini AI를 활용하여 이미지 분석과 레시피 생성을 수행합니다.
            최신 AI 기술을 통해 더 정확하고 유용한 레시피 정보를 제공합니다.
          </p>
        </section>

        <section className="bg-white rounded-2xl shadow-soft p-6">
          <h2 className="text-xl font-semibold text-warm-800 mb-4 flex items-center gap-2">
            <span>📧</span> 문의하기
          </h2>
          <p className="text-warm-700 leading-relaxed">
            서비스 이용 중 문의사항이 있으시면 아래 이메일로 연락해 주세요.
          </p>
          <p className="text-orange-600 mt-2 font-medium">
            support@recipe-app.com
          </p>
        </section>

        <section className="bg-white rounded-2xl shadow-soft p-6">
          <h2 className="text-xl font-semibold text-warm-800 mb-4 flex items-center gap-2">
            <span>📋</span> 정책
          </h2>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-orange-600 hover:underline">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="text-orange-600 hover:underline">
              이용약관
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
