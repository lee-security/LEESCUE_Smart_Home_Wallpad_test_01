🏠 LEESCUE Smart Home Wallpad
LEESCUE는 모던한 디자인과 직관적인 사용자 경험을 제공하는 차세대 스마트홈 월패드 솔루션입니다. 
(업계 1위 직방 스마트홈의 UI를 기반으로 제작하였습니다.)
이 프로젝트는 직방(Zigbang) 스마트홈의 세련된 UI를 모티브로 하여, React와 Tailwind CSS를 활용해 제작된 고성능 스마트 홈 제어 대시보드입니다.

✨ Key Features (주요 기능)

1. 통합 대시보드 (Unified Dashboard)
실시간 데이터: 현재 시간, 날짜 및 실시간 실내외 온습도 정보를 한눈에 확인합니다.
빠른 제어: 자주 사용하는 조명과 보안 시스템을 메인 화면에서 즉시 제어할 수 있습니다.
가전 상태 요약: 공기청정기, 로봇청소기 등 스마트 가전의 현재 작동 여부를 모니터링합니다.

3. 정밀 환경 제어 (Climate Control)
온도 조절: 원형 슬라이더 UI를 통해 목표 온도를 1도 단위로 정밀하게 설정합니다.
모드 전환: 냉방, 난방, 자동 모드를 시각적인 피드백과 함께 변경할 수 있습니다.

3. 지능형 조명 관리 (Lighting Management)
개별 제어: 거실, 침실, 주방 등 각 구역별 조명의 전원을 독립적으로 제어합니다.
밝기 조절: Range Input을 사용하여 0%에서 100%까지 세밀한 조도 조절이 가능합니다.

4. 보안 및 모니터링 (Security)
스마트 도어락: 현관문의 잠금 상태를 확인하고 원격으로 제어합니다.
보안 모드: 방범 설정 상태를 시각적 인디케이터로 표시하여 안전성을 강화했습니다.

🛠 Tech Stack (기술 스택)
Framework: React.js
Styling: Tailwind CSS (Glassmorphism & Dark Mode UI)
Icons: Lucide React
State Management: React Hooks (useState, useEffect)

💡 Key Logic Explanation (로직 설명)

1. 실시간 상태 업데이트 (Real-time Clock)
useEffect와 setInterval을 활용하여 1초마다 시스템 시간을 갱신하며, toLocaleTimeString을 통해 사용자의 지역에 맞는 포맷으로 시간을 표시합니다.

2. 중앙 집중형 상태 관리 (State Management)
각 기기(조명, 난방, 가전)의 상태를 객체(Object) 형태로 관리하여, 수십 개의 상태 변수를 선언하는 대신 효율적으로 상태를 유지보수할 수 있도록 설계했습니다.
예: lights 객체 내에 각 방의 isOn, brightness 정보를 포함하여 관리.

3. 반응형 UI 로직 (Adaptive UI)
사이드바: 화면 크기에 따라 아이콘만 노출되거나 텍스트가 함께 노출되는 반응형 레이아웃을 채택했습니다.
조건부 렌더링: activeTab 상태에 따라 메인 컨텐츠 영역의 컴포넌트를 동적으로 스위칭합니다.

🚀 Quick Start (시작하기)

# 패키지 설치
npm install

# 프로젝트 실행
npm start

🎨 Design Concept
Color Palette: Deep Slate (#0B1120), Indigo Point, Amber & Emerald Accents.

UX: 터치 스크린 환경을 고려한 넉넉한 버튼 크기와 시각적 피드백(애니메이션) 강화.

© 2024 LEESCUE Smart Home Systems. All rights reserved.
