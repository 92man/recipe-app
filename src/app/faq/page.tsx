import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '자주 묻는 질문 (FAQ) - 맛있는 기록',
  description: '맛있는 기록 서비스에 대해 자주 묻는 질문과 답변을 확인하세요. 레시피 저장, AI 기능, 계정 관리 등에 대한 정보를 제공합니다.',
};

const faqData = [
  {
    category: '서비스 소개',
    questions: [
      {
        q: '맛있는 기록은 어떤 서비스인가요?',
        a: '맛있는 기록은 AI 기술을 활용한 스마트 레시피 관리 앱입니다. 음성 인식, 이미지 분석, 냉장고 재료 기반 레시피 추천 등 다양한 기능을 제공합니다.',
      },
      {
        q: '서비스 이용료가 있나요?',
        a: '맛있는 기록은 무료로 이용하실 수 있습니다. 회원가입 후 모든 기능을 무료로 사용하실 수 있습니다.',
      },
      {
        q: '어떤 기기에서 사용할 수 있나요?',
        a: '웹 브라우저가 있는 모든 기기에서 사용 가능합니다. PC, 태블릿, 스마트폰 모두 지원하며, 반응형 디자인으로 어떤 화면에서도 편리하게 사용하실 수 있습니다.',
      },
    ],
  },
  {
    category: 'AI 기능',
    questions: [
      {
        q: '음성 인식 기능은 어떻게 사용하나요?',
        a: '음성 탭에서 마이크 버튼을 누르고 레시피를 말씀해 주세요. AI가 음성을 인식하여 자동으로 레시피를 정리해 드립니다. 요리 중 손이 지저분할 때 특히 유용합니다.',
      },
      {
        q: 'AI 이미지 분석은 어떻게 작동하나요?',
        a: 'AI분석 탭에서 음식 사진을 업로드하면, AI가 이미지를 분석하여 해당 요리의 레시피를 추측합니다. 맛있어 보이는 음식 사진이 있다면 레시피를 알아낼 수 있습니다.',
      },
      {
        q: '냉장고 파먹기 기능이 뭔가요?',
        a: '냉장고에 있는 재료를 입력하면, AI가 해당 재료로 만들 수 있는 레시피를 추천해 드립니다. 남은 재료를 활용한 요리 아이디어가 필요할 때 유용합니다.',
      },
      {
        q: 'AI 추천 레시피의 정확도는 어느 정도인가요?',
        a: 'AI는 방대한 요리 데이터를 학습하여 높은 정확도의 레시피를 제공합니다. 다만, AI 특성상 100% 정확하지 않을 수 있으므로, 레시피를 수정하거나 보완하여 사용하시길 권장합니다.',
      },
    ],
  },
  {
    category: '레시피 관리',
    questions: [
      {
        q: '레시피는 어떻게 저장하나요?',
        a: '각 기능에서 생성된 레시피에서 "저장하기" 버튼을 누르면 내 레시피 목록에 저장됩니다. 저장된 레시피는 레시피 탭에서 언제든지 확인할 수 있습니다.',
      },
      {
        q: '저장한 레시피를 수정할 수 있나요?',
        a: '네, 저장된 레시피는 수정이 가능합니다. 레시피 상세 페이지에서 수정하기 버튼을 눌러 재료, 조리 순서 등을 변경할 수 있습니다.',
      },
      {
        q: '레시피를 삭제하면 복구할 수 있나요?',
        a: '현재는 삭제된 레시피를 복구하는 기능이 없습니다. 삭제 전 신중하게 확인해 주세요. 향후 휴지통 기능을 추가할 예정입니다.',
      },
      {
        q: '레시피를 다른 사람과 공유할 수 있나요?',
        a: '현재는 개인 레시피 관리에 초점을 맞추고 있어 공유 기능은 제공하지 않습니다. 향후 소셜 기능을 추가할 계획이 있습니다.',
      },
    ],
  },
  {
    category: '계정 관리',
    questions: [
      {
        q: '회원가입은 어떻게 하나요?',
        a: '화면 상단의 "시작하기" 버튼을 누르면 Google 계정으로 간편하게 가입할 수 있습니다. 별도의 회원가입 절차 없이 바로 시작할 수 있습니다.',
      },
      {
        q: '비밀번호를 잊어버렸어요.',
        a: 'Google 계정으로 로그인하시기 때문에, Google 계정의 비밀번호를 복구하시면 됩니다. Google 계정 복구 페이지를 이용해 주세요.',
      },
      {
        q: '회원 탈퇴는 어떻게 하나요?',
        a: '회원 탈퇴를 원하시면 support@tasty-record.com으로 탈퇴 요청 메일을 보내주세요. 영업일 기준 3일 이내에 처리해 드립니다.',
      },
      {
        q: '내 데이터는 안전하게 보관되나요?',
        a: '네, 모든 데이터는 암호화되어 안전하게 보관됩니다. 개인정보처리방침에 따라 데이터를 관리하고 있으며, 제3자에게 제공하지 않습니다.',
      },
    ],
  },
  {
    category: '기술 지원',
    questions: [
      {
        q: '앱이 느리게 작동해요.',
        a: '브라우저 캐시를 삭제하거나 다른 브라우저를 사용해 보세요. 인터넷 연결 상태도 확인해 주세요. 문제가 지속되면 문의해 주세요.',
      },
      {
        q: '음성 인식이 잘 안 돼요.',
        a: '조용한 환경에서 마이크에 가깝게 말씀해 주세요. 브라우저에서 마이크 권한을 허용했는지 확인해 주세요. Chrome 브라우저 사용을 권장합니다.',
      },
      {
        q: '이미지 업로드가 안 돼요.',
        a: '이미지 파일 형식(JPG, PNG)과 크기를 확인해 주세요. 10MB 이하의 이미지만 업로드 가능합니다. 문제가 지속되면 다른 이미지로 시도해 보세요.',
      },
      {
        q: '오류 메시지가 표시돼요.',
        a: '오류 메시지 내용을 캡처하여 support@tasty-record.com으로 보내주시면 빠르게 해결해 드리겠습니다. 오류 발생 상황도 함께 알려주세요.',
      },
    ],
  },
];

// JSON-LD 구조화 데이터
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.flatMap(category =>
    category.questions.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    }))
  ),
};

export default function FAQPage() {
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
            <li className="text-warm-700 font-medium">자주 묻는 질문</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-warm-800 mb-2">자주 묻는 질문</h1>
        <p className="text-warm-600 mb-8">맛있는 기록 서비스에 대해 궁금한 점을 확인해 보세요.</p>

        {/* 목차 */}
        <nav className="bg-warm-50 rounded-xl p-4 mb-8">
          <h2 className="font-semibold text-warm-800 mb-3">바로가기</h2>
          <div className="flex flex-wrap gap-2">
            {faqData.map((category, idx) => (
              <a
                key={idx}
                href={`#category-${idx}`}
                className="text-sm bg-white px-3 py-1.5 rounded-lg text-orange-600 hover:bg-orange-50 transition-colors"
              >
                {category.category}
              </a>
            ))}
          </div>
        </nav>

        {/* FAQ 목록 */}
        <div className="space-y-8">
          {faqData.map((category, categoryIdx) => (
            <section key={categoryIdx} id={`category-${categoryIdx}`}>
              <h2 className="text-xl font-bold text-warm-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm">
                  {categoryIdx + 1}
                </span>
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((item, idx) => (
                  <details
                    key={idx}
                    className="bg-white rounded-xl shadow-soft overflow-hidden group"
                  >
                    <summary className="p-4 cursor-pointer list-none flex items-center justify-between hover:bg-warm-50 transition-colors">
                      <span className="font-medium text-warm-800 pr-4">{item.q}</span>
                      <svg
                        className="w-5 h-5 text-warm-400 transition-transform group-open:rotate-180 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-4 pb-4 text-warm-600 leading-relaxed border-t border-warm-100 pt-4">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* 추가 문의 */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white text-center">
          <h2 className="text-xl font-bold mb-2">찾으시는 답변이 없으신가요?</h2>
          <p className="text-orange-100 mb-4">
            더 궁금한 점이 있으시면 언제든 문의해 주세요.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-orange-600 px-6 py-3 rounded-xl font-medium hover:bg-orange-50 transition-colors"
          >
            문의하기
          </Link>
        </div>
      </main>
    </>
  );
}
