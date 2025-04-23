<img width="1680" alt="스크린샷 2025-04-17 오후 4 51 02" src="https://github.com/user-attachments/assets/cf2751bb-5409-481e-a252-f056b8b15979" />

🔗 **[Live Demo](https://maplesimul.netlify.app/)** | **[GitHub](https://github.com/Oaelan/MapleSimul)**
---

### **개요** 
```
메이플스토리 큐브 및 스타포스 강화 시뮬레이션을 제공하는 웹앱으로,
React와 Tailwind CSS를 활용해 직관적인 UI와 반응형 디자인을 구현했습니다.
Netlify로 배포하고 Google Search Console , Google Analytics 까지 활용하여
사이트 인덱싱 및 데이터 수집까지 구현한 프로젝트 입니다.
```


---

## 기술 스택

| 카테고리          | 기술                                                                 |
|-------------------|----------------------------------------------------------------------|
| **프레임워크**    | <img src="https://cdn.jsdelivr.net/npm/simple-icons@v12/icons/react.svg" width="20" height="20"> React 19 |
| **UI 라이브러리** | <img src="https://cdn.jsdelivr.net/npm/simple-icons@v12/icons/tailwindcss.svg" width="20" height="20"> DaisyUI 5.0v <br> <img src="https://cdn.jsdelivr.net/npm/simple-icons@v12/icons/npm.svg" width="20" height="20"> canvas-confetti |
| **스타일링**      | <img src="https://cdn.jsdelivr.net/npm/simple-icons@v12/icons/tailwindcss.svg" width="20" height="20"> Tailwind CSS 4.0v |
| **상태 관리**     | ![Zustand](https://img.shields.io/badge/Zustand-5.0v-20232A?style=flat&logo=react&logoColor=FFD700) |
| **빌드 도구**     | <img src="https://cdn.jsdelivr.net/npm/simple-icons@v12/icons/vite.svg" width="20" height="20"> Vite 6.0v |
| **배포 플랫폼**   | <img src="https://cdn.jsdelivr.net/npm/simple-icons@v12/icons/netlify.svg" width="20" height="20"> Netlify |
| **분석 도구**     | <img src="https://cdn.jsdelivr.net/npm/simple-icons@v12/icons/googleanalytics.svg" width="20" height="20"> Google Analytics |
| **SEO 관리**      | <img src="https://cdn.jsdelivr.net/npm/simple-icons@v12/icons/googlesearchconsole.svg" width="20" height="20"> Google Search Console <br> ![React-Head](https://img.shields.io/badge/React_Head-SEO-20232A?style=flat&logo=react&logoColor=61DAFB) |

---
### **핵심 기능**
- **큐브 시뮬레이션**:
  메이플스토리 큐브 시스템(윗잠/아랫잠)을 재현해 장비별, 레벨 제한별, 등급별 옵션과 확률을 시뮬레이션합니다. `zustand`로 시뮬레이션 아이템 정보(`itemInfo`)를 전역 상태로 관리하고, `useRef`로 `tierUpCount`와 `isTierUp`을 관리해 불필요한 리렌더링을 방지했습니다. `simulCount` 상태의 리렌더링을 활용해 `TIER UP!` 애니메이션을 효율적으로 표시하며, `whiteCubeOptions.js`와 가중치 알고리즘으로 실제 게임과 유사한 결과를 생성했습니다. DaisyUI와 `canvas-confetti`로 직관적이고 몰입감 있는 UI를 구현했습니다.
- **기술적 구현**:
  - **상태 관리**: `zustand`를 활용해 시뮬레이션 아이템 정보(`itemInfo`)를 전역 상태로 관리하여 컴포넌트 간 일관된 데이터 흐름 보장
  - **최적화**: `useRef`로 `tierUpCount`와 `isTierUp` 상태를 관리해 불필요한 리렌더링 방지
  - **애니메이션 효과**: `simulCount` 상태를 활용한 리렌더링으로 등급 상승 시 `TIER UP!` 애니메이션을 효율적으로 구현
  - **확률 시스템**: 실제 인게임 옵션 확률을 기반으로 작성한 `blackCubeOptions.js / whiteCubeOptions.js`에서 일원화된 옵션 데이터 관리
  - **UI/UX**: DaisyUI 컴포넌트와 `canvas-confetti` 라이브러리를 통해 희귀 옵션 획득 시 시각적 피드백 제공
---

- **스타포스 시뮬레이션**:  메이플스토리 스타포스 강화 시스템을 시뮬레이션 할 수 있습니다. 사용자는 장비의 착용 레벨, 스타포스 단계, 스타캐치(확률상승), 파괴방지, 이벤트 옵션(파괴 확률 감소,재화 할인) 등을 설정하여 강화 시뮬레이션을 실행할 수 있으며, 성공/실패/파괴 확률과 재화 비용을 실시간으로 확인할 수 있습니다. 

- **기술적 구현**:
  - **상태 관리**
React의 상태 관리 훅을 활용하여 스타포스 단계, 착용 레벨, 메소 비용, 옵션 설정 등을 효율적으로 관리. 의존성 변경 시 메소 비용을 동적으로 계산하여 상태를 업데이트.
  -  **훅 사용**: 커스텀 훅을 통해 버튼 연속 클릭을 방지하는 쓰로틀링 로직 구현. 메모이제이션과 DOM 요소 참조를 활용하여 성능 최적화 및 동적 이펙트 처리.
  -  **라이브러리**:  `confetti` 라이브러리로 사용 유저에게 몰입감 제공, `Google Analytics`로 몇성에서 강화성공, 실패, 파괴 등을 기록하여 통계 결과 추출
  - **UI/UX**: `Tailwind CSS` 기반의 반응형 디자인으로 직관적인 사용자 경험 제공.동적 위치 계산으로 이펙트 정확도 향상 및 지역화된 메소 표시 포맷 적용.
 
- **사용자 인터페이스**:
  - 착용 레벨과 스타포스 단계를 select 메뉴로 선택 가능.
  - 스타포스 고정 옵션을 통해 강화 성공/실패/파괴 시 현재 단계를 유지할 수 있음.
  - 스타캐치, 파괴방지, 메소 할인, 파괴 감소 옵션을 체크박스로 설정 가능.
  - 강화 및 초기화 버튼을 통해 시뮬레이션을 실행하거나 상태를 초기화.
  - 강화 결과는 성공/실패/파괴 메시지로 표시되며,  `Google Analytics(gtag)`를 통해 이벤트가 기록됩니다.
---
### 사용방법
 - 큐브 시뮬레이션

1. 시뮬레이션할 장비 부위 , 레벨  범위, 옵션 등급, 직업 주스탯, 윗잠/아랫잠 , 잠재비용 선택  <img width="743" alt="스크린샷 2025-04-23 오후 3 17 46" src="https://github.com/user-attachments/assets/aed8f76d-e7b5-4e81-9c9f-f74198bc85b7" />

2. 잠재 능력 재설정 버튼을 눌러 시뮬레이션 실행
3. 시뮬레이션 결과는 결과창에 쌓이게 되며 확인 가능 <img width="724" alt="스크린샷 2025-04-23 오후 3 18 31" src="https://github.com/user-attachments/assets/86d727e2-1400-42da-aac1-42977474dea2" />

4. 유효 옵션 3줄을 띄웠을 경우 이펙트를 통해 확인 가능 <img width="1680" alt="스크린샷 2025-04-23 오후 3 20 33" src="https://github.com/user-attachments/assets/8d4c6920-ed69-4da7-8cd1-a3df300c175a" />



---

