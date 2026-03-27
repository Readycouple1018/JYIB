/**
 * Wedding Invitation Configuration
 *
 * 이 파일에서 청첩장의 모든 정보를 수정할 수 있습니다.
 * 이미지는 설정이 필요 없습니다. 아래 폴더에 순번 파일명으로 넣으면 자동 감지됩니다.
 *
 * 이미지 폴더 구조 (파일명 규칙):
 *   images/hero/1.jpg      - 메인 사진 (1장, 필수)
 *   images/story/1.jpg, 2.jpg, ...  - 스토리 사진들 (순번, 자동 감지)
 *   images/gallery/1.jpg, 2.jpg, ... - 갤러리 사진들 (순번, 자동 감지)
 *   images/location/1.jpg  - 약도/지도 이미지 (1장)
 *   images/og/1.jpg        - 카카오톡 공유 썸네일 (1장)
 */

const CONFIG = {
  // ── 초대장 열기 ──
  useCurtain: false,  // 초대장 열기 화면 사용 여부 (true: 사용, false: 바로 본문 표시)

  // ── 메인 (히어로) ──
  groom: {
    name: "허준영",
    nameEn: "Heo Junyoung",
    father: "허윤선",
    mother: "임성옥",
    fatherDeceased: false,
    motherDeceased: false
  },

  bride: {
    name: "최인비",
    nameEn: "Choi Inbee",
    father: "최장헌",
    mother: "한진숙",
    fatherDeceased: false,
    motherDeceased: false
  },

  wedding: {
    date: "2026-10-18",
    time: "13:50",
    venue: "아이티컨벤션",
    hall: "그레이스홀",
    address: "경기도 용인시 기흥구 흥덕1로 13 (영덕동 1005) 흥덕IT밸리 A동 (Tower) 2층",
    tel: "031-255-7000",
    mapLinks: {
      kakao: "https://place.map.kakao.com/22839256",
      naver: "https://naver.me/5ssTABiI"
    }
  },

  // ── 인사말 ──
  greeting: {
    title: "소중한 분들을 초대합니다",
    content: "서로에게 행복을 주는 사람을 만났습니다.\n배려하는 마음이 따뜻한 사람을 만났습니다.\n운명처럼 만나게 된 우리의 인연,\n그 인연에 이끌려 이제 같은 길을 함께 걸어가려 합니다.\n\n10월의 어느 햇살 고운 날, \n귀한 걸음 하시어 따뜻한 마음으로 축복해 주시면 \n더 없는 기쁨이 되겠습니다."
  },

  // ── 우리의 이야기 ──
  story: {
    title: "우리의 이야기",
    content: "스쳐지나갈 줄 알았던 우연들이 겹처 \n서로에게 단 하나뿐인 인연이 되고자 합니다.\n\n여러분을 소중한 자리에 초대합니다."
  },

  // ── 오시는 길 ──
  // (mapLinks는 wedding 객체 내에 포함)

  // ── 마음 전하실 곳 ──
  accounts: {
    groom: [
      { role: "신랑", name: "허준영", bank: "기업은행", number: "000-000-000000" },
      { role: "아버지", name: "허윤선", bank: "신한은행", number: "000-000-000000" },
      { role: "어머니", name: "임성옥", bank: "우리은행", number: "000-000-000000" }
    ],
    bride: [
      { role: "신부", name: "최인비", bank: "카카오뱅크", number: "3333-13-8415678" },
      { role: "아버지", name: "최장헌", bank: "우리은행", number: "000-000-000000" },
      { role: "어머니", name: "한진숙", bank: "우리은행", number: "000-000-000000" }
    ]
  },

  // ── 링크 공유 시 나타나는 문구 ──
  meta: {
    title: "허준영 ♥ 최인비 결혼합니다",
    description: "2026년 10월 18일, 소중한 분들을 초대합니다."
  }
};
