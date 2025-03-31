import { useState } from "react";

/* eslint-disable react/prop-types */
function SimulTypeButton({ setSelectedSimulator }) {
  const [isActive, setIsActive] = useState("cube"); // 초기값을 "cube"로 설정

  // 버튼 클릭 시 큐브 시뮬 또는 스타포스 시뮬 선택
  const handleButtonClick = (type) => {
    setSelectedSimulator(type);
    setIsActive(type);
  };

  return (
    <div className="flex justify-center gap-5 w-full">
      <button
        className={`p-5 w-[150px] sm:w-[200px] btn btn-info btn-outline ${
          isActive === "cube" ? "btn-active" : ""
        }`}
        onClick={() => handleButtonClick("cube")}
      >
        큐브 시뮬
      </button>
      <button
        className={`p-5 w-[150px] sm:w-[200px] btn btn-primary btn-outline ${
          isActive === "starforce" ? "btn-active" : ""
        }`}
        onClick={() => handleButtonClick("starforce")}
      >
        스타포스 시뮬
      </button>
    </div>
  );
}

export default SimulTypeButton;
