<img width="1680" alt="스크린샷 2025-04-17 오후 4 51 02" src="https://github.com/user-attachments/assets/cf2751bb-5409-481e-a252-f056b8b15979" />

### **개요** 
```
메이플스토리 큐브 및 스타포스 강화 시뮬레이션을 제공하는 웹앱으로,
React와 Tailwind CSS를 활용해 직관적인 UI와 반응형 디자인을 구현했습니다.
Netlify로 배포하고 Google Search Console , Google Analytics 까지 활용하여
사이트 인덱싱 및 데이터 수집까지 구현한 프로젝트 입니다.
```


---



### **기술스택**
- **프레임워크**: React 19
- **UI 라이브러리**: DaisyUI 5.0v / canvas-confetti
- **스타일링**: Tailwind CSS 4.0v
- **상태 관리**: Zustand 5.0v
- **빌드 도구**: Vite 6.0v
- **배포 플랫폼**: Netlify
- **분석 도구**: Google Analytics
- **SEO 관리**: Google Search Console, React-Head

---
### **핵심 기능**
- **큐브 시뮬레이션**: 메이플스토리 큐브 시스템(윗잠/아랫잠)을 재현해 장비별, 레벨 제한별, 등급별 옵션과 확률을 시뮬레이션합니다. `zustand`로 시뮬레이션 아이템 정보(`itemInfo`)를 전역 상태로 관리하고, `useRef`로 `tierUpCount`와 `isTierUp`을 관리해 불필요한 리렌더링을 방지했습니다. `simulCount` 상태의 리렌더링을 활용해 `TIER UP!` 애니메이션을 효율적으로 표시하며, `whiteCubeOptions.js`와 가중치 알고리즘으로 실제 게임과 유사한 결과를 생성했습니다. DaisyUI와 `canvas-confetti`로 직관적이고 몰입감 있는 UI를 구현했습니다.

- **스타포스 강화**: 상세히


---
