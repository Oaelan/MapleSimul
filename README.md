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
- **스타포스 시뮬레이션**: 메이플스토리의 스타포스 강화 시스템을 재현하여 아이템의 등급별, 레벨별 필요한 재화를 다르게 설정하고, 게임 내에 존재하는 많은 이벤트나 상황들을 여러 선택지(버튼)을 통해 다양한 상황에서 대비할수 있도록 시뮬레이션합니다. 

- **기술적 구현**:
 https://github.com/Oaelan/MapleSimul/blob/305b6a23b41642c24207adffae0b82fd7aa9f006/src/components/StarForceSimulator.jsx#L24C2-L31C51


---
