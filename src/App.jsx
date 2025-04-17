import "./App.css";
import CubeSimulator from "./components/CubeSimulator";
import StarForce from "./components/StarForce";
import { useState, useEffect } from "react";
import SimulTypeButton from "./components/SimulTypeButton";
import { useThreeOption } from "./store";
import confetti from "canvas-confetti";
import { HeadProvider, Title, Meta } from "react-head";
function App() {
  const [selectedSimulator, setSelectedSimulator] = useState("cube");
  const isThreeOption = useThreeOption((state) => state.isThreeOption);
  const setIsThreeOption = useThreeOption((state) => state.setIsThreeOption);
  // isThreeOption 상태가 변경될 때 폭죽 효과 제어
  useEffect(() => {
    if (isThreeOption) {
      // 이모지 모양 정의
      const heartShape = confetti.shapeFromText({ text: "🎊", scalar: 2 });
      const starEmojiShape = confetti.shapeFromText({ text: "💖", scalar: 2 });
      const sparkleShape = confetti.shapeFromText({ text: "✨", scalar: 2 });
      const celebrationShape = confetti.shapeFromText({
        text: "🎉",
        scalar: 2,
      });
      // Basic Cannon 효과 실행
      // 왼쪽에서 터지는 효과
      confetti({
        particleCount: 500,
        angle: 60, // 오른쪽 위 방향으로 발사
        spread: 160,
        origin: { x: 0, y: 0.6 },
        startVelocity: 70,
        gravity: 0.7,
        ticks: 300,
        scalar: 1.2,
        colors: ["#ff8800", "#00ffff", "#8800ff", "#ff0088", "#88ff00"],
      });

      // 오른쪽에서 터지는 효과
      confetti({
        particleCount: 700,
        angle: 120, // 왼쪽 위 방향으로 발사
        spread: 160,
        origin: { x: 1, y: 0.6 },
        startVelocity: 70,
        gravity: 0.7,
        ticks: 300,
        scalar: 1.2,
        colors: ["#ff8800", "#00ffff", "#8800ff", "#ff0088", "#88ff00"],
      });

      // 중앙에서 위로 터지는 효과
      confetti({
        particleCount: 500,
        angle: 90, // 위쪽으로 발사
        spread: 160,
        origin: { x: 0.5, y: 0.7 },
        startVelocity: 70,
        gravity: 0.7,
        ticks: 300,
        scalar: 2,
        colors: ["#ff8800", "#00ffff", "#8800ff", "#ff0088", "#88ff00"],
        shapes: [heartShape, starEmojiShape, sparkleShape, celebrationShape],
      });
      // 폭죽 효과를 0.5초 후 ThreeOption false로 변경
      const timer = setTimeout(() => {
        setIsThreeOption(false);
      }, 500); // 0.5초 동안 표시

      return () => clearTimeout(timer); // 클린업 함수
    }
  }, [isThreeOption]);
  return (
    <>
      <HeadProvider>
        <div className="App">
          <Title>메이플스토리 큐브/스타포스 시뮬레이터</Title>
          <Meta property="og:type" content="website" />
          <Meta property="og:url" content="https://maplesimul.netlify.app/" />
          <Meta
            property="og:title"
            content="메이플스토리 큐브/스타포스 시뮬레이터"
          />
          <Meta
            property="og:description"
            content="메이플스토리 최신 버전의 큐브,스타포스 시뮬레이터입니다."
          />

          <Meta
            property="og:description"
            content="메이플스토리 최신 버전의 큐브,스타포스 시뮬레이터입니다.
            총 재설정 비용 및 유효 옵션 확인이 가능하며 스타포스 강화
            또한 최신 버전으로 사용 가능합니다."
          />
          <Meta
            name="keywords"
            content="메이플스토리, 큐브, 스타포스, 시뮬레이터, 레드큐브,
            블랙큐브, 에디셔널큐브, 강화, 메이플,maplesimul,maple,cube,starforce,simulator
            메이플시뮬,메이플강화,메이플스토리강화,메이플스토리큐브,메이플스토리스타포스
            메이플스토리큐브시뮬,메이플스토리스타포스시뮬"
          />
          <Meta name="author" content="Oaelan, Dongzzang99" />
          {/* 나머지 앱 콘텐츠 */}
        </div>
      </HeadProvider>
      <div className="items-center h-full  w-full gap-3 sm:gap-10 flex flex-col">
        <header
          className="text-yellow-300 font-Galmuri11
       p-5 sm:p-10 pb-3 text-[20px] sm:text-4xl
       drop-shadow-[0_2px_4px_rgba(255,170,0,0.4)]
       font-bold w-full text-center"
        >
          메이플 큐브 / 스타포스 시뮬레이터
        </header>
        {/* 큐브 시뮬레이터 버튼 */}
        <SimulTypeButton setSelectedSimulator={setSelectedSimulator} />
        <div className="flex flex-col items-center w-full p-3 sm:px-30 py-10">
          {selectedSimulator === "cube" ? <CubeSimulator /> : <StarForce />}
        </div>
      </div>
    </>
  );
}

export default App;
