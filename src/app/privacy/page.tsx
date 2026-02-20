import Link from 'next/link';

export const metadata = {
  title: '개인정보처리방침 - 맛있는 기록',
  description: '맛있는 기록 앱의 개인정보처리방침입니다.',
  alternates: { canonical: '/privacy' },
  openGraph: { url: '/privacy' },
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto p-6 pb-20">
      <Link href="/" className="text-orange-600 hover:underline mb-6 inline-block">
        ← 홈으로
      </Link>

      <h1 className="text-3xl font-bold text-warm-800 mb-6">개인정보처리방침</h1>

      <div className="prose prose-warm">
        <p className="text-warm-600 mb-4">
          시행일: 2024년 1월 1일
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-warm-800 mb-3">1. 개인정보의 수집 및 이용 목적</h2>
          <p className="text-warm-700 leading-relaxed">
            맛있는 기록(이하 &quot;서비스&quot;)은 다음의 목적을 위해 개인정보를 수집하고 이용합니다:
          </p>
          <ul className="list-disc pl-6 mt-2 text-warm-700 space-y-1">
            <li>회원 가입 및 관리</li>
            <li>서비스 제공 및 운영</li>
            <li>레시피 저장 및 관리 기능 제공</li>
            <li>서비스 개선 및 신규 서비스 개발</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-warm-800 mb-3">2. 수집하는 개인정보 항목</h2>
          <p className="text-warm-700 leading-relaxed">
            서비스는 다음과 같은 개인정보를 수집합니다:
          </p>
          <ul className="list-disc pl-6 mt-2 text-warm-700 space-y-1">
            <li>필수항목: 이메일 주소</li>
            <li>선택항목: 프로필 정보 (Google 로그인 시)</li>
            <li>자동수집항목: 서비스 이용 기록, 접속 로그</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-warm-800 mb-3">3. 개인정보의 보유 및 이용 기간</h2>
          <p className="text-warm-700 leading-relaxed">
            회원의 개인정보는 회원 탈퇴 시까지 보유하며, 탈퇴 즉시 파기됩니다.
            단, 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관됩니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-warm-800 mb-3">4. 개인정보의 제3자 제공</h2>
          <p className="text-warm-700 leading-relaxed">
            서비스는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.
            다만, 이용자의 동의가 있거나 법령에 의해 요구되는 경우에는 예외로 합니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-warm-800 mb-3">5. 개인정보의 파기</h2>
          <p className="text-warm-700 leading-relaxed">
            개인정보 보유 기간이 경과하거나 처리 목적이 달성된 경우, 해당 개인정보를
            지체 없이 파기합니다. 전자적 파일 형태의 정보는 복구할 수 없는 방법으로 영구 삭제합니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-warm-800 mb-3">6. 쿠키 및 광고</h2>
          <p className="text-warm-700 leading-relaxed">
            서비스는 Google AdSense를 통해 광고를 게재할 수 있으며, 이 과정에서 쿠키가 사용될 수 있습니다.
            Google의 광고 쿠키 사용에 대한 자세한 내용은 Google 개인정보처리방침을 참조하시기 바랍니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-warm-800 mb-3">7. 이용자의 권리</h2>
          <p className="text-warm-700 leading-relaxed">
            이용자는 언제든지 자신의 개인정보에 대해 열람, 수정, 삭제를 요청할 수 있으며,
            회원 탈퇴를 통해 개인정보 처리 정지를 요청할 수 있습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-warm-800 mb-3">8. 개인정보 보호책임자</h2>
          <p className="text-warm-700 leading-relaxed">
            개인정보 처리에 관한 문의는 아래 연락처로 문의해 주시기 바랍니다.
          </p>
          <p className="text-warm-700 mt-2">
            이메일: support@recipe-app.com
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-warm-800 mb-3">9. 개인정보처리방침의 변경</h2>
          <p className="text-warm-700 leading-relaxed">
            본 개인정보처리방침은 법령 및 서비스 변경에 따라 수정될 수 있으며,
            변경 시 서비스 내 공지사항을 통해 안내합니다.
          </p>
        </section>
      </div>
    </main>
  );
}
