import Link from 'next/link';

export const metadata = {
  title: '이용약관 - 맛있는 기록',
  description: '맛있는 기록 앱의 서비스 이용약관입니다.',
};

export default function Terms() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto p-6 pb-20">
      <Link href="/" className="text-orange-600 hover:underline mb-6 inline-block">
        ← 홈으로
      </Link>

      <h1 className="text-3xl font-bold text-warm-800 mb-6">서비스 이용약관</h1>

      <div className="prose prose-warm">
        <p className="text-warm-600 mb-4">
          시행일: 2024년 1월 1일
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-warm-800 mb-3">제1조 (목적)</h2>
          <p className="text-warm-700 leading-relaxed">
            본 약관은 맛있는 기록(이하 &quot;서비스&quot;)이 제공하는 레시피 기록 서비스의
            이용조건 및 절차, 회원과 서비스 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-warm-800 mb-3">제2조 (서비스의 내용)</h2>
          <p className="text-warm-700 leading-relaxed">
            서비스는 다음과 같은 기능을 제공합니다:
          </p>
          <ul className="list-disc pl-6 mt-2 text-warm-700 space-y-1">
            <li>음성을 통한 레시피 기록 및 정리</li>
            <li>AI를 활용한 음식 이미지 분석 및 레시피 추천</li>
            <li>요리 이름 검색을 통한 레시피 제공</li>
            <li>개인 레시피 저장 및 관리</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-warm-800 mb-3">제3조 (회원가입)</h2>
          <p className="text-warm-700 leading-relaxed">
            1. 회원가입은 이용자가 본 약관에 동의하고 서비스가 정한 가입 양식에 따라
            회원정보를 기입한 후 가입 신청을 완료함으로써 이루어집니다.<br/><br/>
            2. 서비스는 다음 각 호에 해당하는 경우 회원가입을 거부할 수 있습니다:
          </p>
          <ul className="list-disc pl-6 mt-2 text-warm-700 space-y-1">
            <li>타인의 명의를 사용한 경우</li>
            <li>허위 정보를 기재한 경우</li>
            <li>기타 서비스 운영에 지장이 있다고 판단되는 경우</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-warm-800 mb-3">제4조 (회원의 의무)</h2>
          <p className="text-warm-700 leading-relaxed">
            회원은 다음 행위를 하여서는 안 됩니다:
          </p>
          <ul className="list-disc pl-6 mt-2 text-warm-700 space-y-1">
            <li>타인의 정보 도용</li>
            <li>서비스에 게시된 정보의 무단 변경</li>
            <li>서비스가 금지한 정보의 게시 또는 전송</li>
            <li>저작권 등 지적재산권 침해</li>
            <li>서비스의 안정적 운영을 방해하는 행위</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-warm-800 mb-3">제5조 (서비스의 제공 및 중단)</h2>
          <p className="text-warm-700 leading-relaxed">
            1. 서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.<br/><br/>
            2. 다만, 시스템 점검, 설비 교체 등의 사유로 서비스가 일시 중단될 수 있으며,
            이 경우 사전에 공지합니다.<br/><br/>
            3. 천재지변 등 불가항력적 사유가 발생한 경우 서비스가 중단될 수 있습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-warm-800 mb-3">제6조 (저작권)</h2>
          <p className="text-warm-700 leading-relaxed">
            1. 서비스가 제공하는 콘텐츠의 저작권은 서비스에 귀속됩니다.<br/><br/>
            2. 회원이 작성한 레시피의 저작권은 해당 회원에게 귀속되며,
            서비스는 서비스 운영 목적 범위 내에서 이를 사용할 수 있습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-warm-800 mb-3">제7조 (광고)</h2>
          <p className="text-warm-700 leading-relaxed">
            서비스는 서비스 운영을 위해 서비스 화면에 광고를 게재할 수 있습니다.
            광고는 Google AdSense 등의 광고 플랫폼을 통해 제공될 수 있습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-warm-800 mb-3">제8조 (면책조항)</h2>
          <p className="text-warm-700 leading-relaxed">
            1. 서비스는 AI 기술을 활용하여 레시피를 분석하고 제공하며,
            AI가 생성한 정보의 정확성을 보장하지 않습니다.<br/><br/>
            2. 회원이 서비스를 통해 얻은 정보로 인해 발생한 손해에 대해
            서비스는 책임을 지지 않습니다.<br/><br/>
            3. 회원 간 또는 회원과 제3자 간의 분쟁에 대해 서비스는 개입하지 않으며,
            이로 인한 손해를 배상할 책임이 없습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-warm-800 mb-3">제9조 (회원 탈퇴 및 자격 상실)</h2>
          <p className="text-warm-700 leading-relaxed">
            1. 회원은 언제든지 서비스에 탈퇴를 요청할 수 있으며,
            서비스는 즉시 회원 탈퇴를 처리합니다.<br/><br/>
            2. 회원이 본 약관을 위반한 경우, 서비스는 회원 자격을 제한하거나
            상실시킬 수 있습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-warm-800 mb-3">제10조 (약관의 변경)</h2>
          <p className="text-warm-700 leading-relaxed">
            서비스는 필요한 경우 본 약관을 변경할 수 있으며,
            변경된 약관은 서비스 내 공지사항을 통해 안내합니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-warm-800 mb-3">제11조 (문의)</h2>
          <p className="text-warm-700 leading-relaxed">
            서비스 이용에 관한 문의는 아래 연락처로 문의해 주시기 바랍니다.
          </p>
          <p className="text-warm-700 mt-2">
            이메일: support@recipe-app.com
          </p>
        </section>
      </div>
    </main>
  );
}
