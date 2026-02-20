import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '문의하기 - 맛있는 기록',
  description: '맛있는 기록에 문의사항이 있으시면 언제든 연락주세요. 레시피 제안, 기능 요청, 버그 신고 등 모든 피드백을 환영합니다.',
  alternates: { canonical: 'https://tasty-record.com/contact' },
  openGraph: { url: 'https://tasty-record.com/contact' },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto p-6 pb-20">
      {/* 브레드크럼 */}
      <nav className="text-sm mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-warm-500">
          <li><Link href="/" className="hover:text-orange-600">홈</Link></li>
          <li>/</li>
          <li className="text-warm-700 font-medium">문의하기</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-warm-800 mb-6">문의하기</h1>

      <div className="bg-white rounded-2xl shadow-soft p-6 mb-6">
        <p className="text-warm-600 mb-6 leading-relaxed">
          맛있는 기록을 이용해 주셔서 감사합니다. 서비스 이용 중 궁금한 점이나
          제안하고 싶은 기능, 발견한 오류 등이 있으시면 아래 방법으로 연락해 주세요.
        </p>

        <div className="space-y-6">
          {/* 이메일 문의 */}
          <div className="bg-warm-50 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📧</span>
              <h2 className="text-lg font-semibold text-warm-800">이메일 문의</h2>
            </div>
            <p className="text-warm-600 mb-3">
              일반적인 문의사항은 이메일로 보내주세요.
              영업일 기준 1-2일 내에 답변드리겠습니다.
            </p>
            <a
              href="mailto:support@tasty-record.com"
              className="inline-flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700"
            >
              support@tasty-record.com
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* 문의 유형 */}
          <div className="bg-orange-50 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-warm-800 mb-4">문의 유형</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">•</span>
                <div>
                  <strong className="text-warm-800">레시피 제안</strong>
                  <p className="text-sm text-warm-600">추가해 주셨으면 하는 레시피가 있다면 알려주세요</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">•</span>
                <div>
                  <strong className="text-warm-800">기능 요청</strong>
                  <p className="text-sm text-warm-600">새로운 기능 아이디어를 제안해 주세요</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">•</span>
                <div>
                  <strong className="text-warm-800">버그 신고</strong>
                  <p className="text-sm text-warm-600">오류를 발견하셨다면 상세히 알려주세요</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">•</span>
                <div>
                  <strong className="text-warm-800">제휴 문의</strong>
                  <p className="text-sm text-warm-600">광고, 협찬, 제휴 관련 문의</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">•</span>
                <div>
                  <strong className="text-warm-800">기타 문의</strong>
                  <p className="text-sm text-warm-600">그 외 모든 문의사항</p>
                </div>
              </li>
            </ul>
          </div>

          {/* 운영 정보 */}
          <div className="bg-blue-50 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-warm-800 mb-3">운영 정보</h2>
            <div className="space-y-2 text-warm-600">
              <p><strong>서비스명:</strong> 맛있는 기록</p>
              <p><strong>운영자:</strong> 맛있는 기록 팀</p>
              <p><strong>응답 시간:</strong> 영업일 기준 1-2일</p>
              <p><strong>운영 시간:</strong> 평일 10:00 - 18:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ 링크 */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white text-center">
        <h2 className="text-xl font-bold mb-2">자주 묻는 질문</h2>
        <p className="text-orange-100 mb-4">
          문의하시기 전에 FAQ를 확인해 보세요.
          원하는 답변을 빠르게 찾을 수 있습니다.
        </p>
        <Link
          href="/faq"
          className="inline-block bg-white text-orange-600 px-6 py-3 rounded-xl font-medium hover:bg-orange-50 transition-colors"
        >
          FAQ 보러가기
        </Link>
      </div>
    </main>
  );
}
