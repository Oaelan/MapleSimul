import React, { useState, useEffect, useCallback, useRef } from "react";
import "../starForce.css";
import StarForceSimulator2 from "./StarForceSimulator2";
import confetti from "canvas-confetti";

//쓰로틀링 커스텀 훅 정의
const useThrottle = (callback, delay) => {
  const lastCall = useRef(0);

  return useCallback(
    (...args) => {
      const now = new Date().getTime();
      if (now - lastCall.current < delay) {
        return;
      }
      lastCall.current = now;
      return callback(...args);
    },
    [callback, delay]
  );
};

function StarForceSimulator({ setResultWindow }) {
  const getIconPosition = () => {
    if (itemIconRef.current) {
      const rect = itemIconRef.current.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      return { rect, x, y };
    }
    return { rect: null, x: null, y: 0.5 }; // 기본값
  };
  // 컨페티 사용 함수 (20성 이상 달성시 이펙트 함수)
  // 별 모양 컨페티
  const handleConfetti = () => {
    const starShape = confetti.shapeFromText({ text: "⭐️" });
    const { x, y } = getIconPosition();

    confetti({
      particleCount: 150,
      spread: 360,
      origin: { x: x || 0.5, y }, // x가 null이면 기본값 0.5
      shapes: [starShape],
    });
  };

  //스타포스 별 갯수
  const [starForceTier, setStarForceTier] = useState(0);
  //착용 레벨
  const [level, setLevel] = useState(100);
  //필요 메소
  const [needMeso, setNeedMeso] = useState(0);
  //사용된 메소
  const [useMeso, setUseMeso] = useState(0);
  //스타캐치 채크 여부 state
  const [catchEnabled, setCatchEnabled] = useState(false);
  // 파괴 방지 채크 여부 state
  const [breakPrevention, setBreakPrevention] = useState(false);
  //아이템애 이펙트가 터지게 하기 위해서 아이템 아이콘 위치 참조
  const itemIconRef = useRef(null);

  // 스타포스 강화 성공 확률
  const [successRate, setSuccesssRate] = useState([
    95, 90, 85, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 30, 30, 15, 15,
    15, 30, 15, 15, 10, 10, 10, 7, 5, 3, 1,
  ]);

  // 스타포스 강화 실패 확률
  const [failRate, setFailRate] = useState([
    5, 10, 15, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 67.9, 67.9, 78.2,
    78.2, 76.5, 59.5, 72.25, 68, 72, 72, 72, 74.4, 76, 77.6, 79.2,
  ]);
  //스타포스 강화 파괴 확률 - 15성까진 0퍼
  const [breakRate, setBreakRate] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2.1, 2.1, 6.8, 6.8, 8.5, 10.5,
    12.75, 17, 18, 18, 18, 18.6, 19, 19.4, 19.8,
  ]);

  // 스타캐치 버튼 활성화 시 성공 확률 증가 적용
  const adjustedSuccess = catchEnabled
    ? Math.min(successRate[starForceTier] * 1.05, 100)
    : successRate[starForceTier];

  // 증가한 성공 확률만큼 실패 확률 감소
  let adjustedFail = catchEnabled
    ? Math.max(
        failRate[starForceTier] -
          (adjustedSuccess - successRate[starForceTier]),
        0
      )
    : failRate[starForceTier];

  // 파괴 방지 기능 적용 (15~17성 범위에서만 가능)
  let adjustedBreak = breakRate[starForceTier];
  if (breakPrevention && starForceTier >= 15 && starForceTier <= 17) {
    adjustedFail += adjustedBreak; // 파괴 확률을 실패 확률에 추가
    adjustedBreak = 0;
  }

  let result = 0;

  //스타포스 처리 함수
  const starForce = () => {
    if (starForceTier === 0) {
      setStarForceTier(starForceTier + 1);
    } else if (starForce !== 0) {
      setStarForceTier(starForceTier - 1);
    }
  };

  //강화 클릭시 함수
  const starForceEnhance = useThrottle(() => {
    const rand = Math.floor(Math.random() * 101);
    const successMessage = `${starForceTier}성 ▶ ${
      starForceTier + 1
    }성 강화 성공!`;
    const failMessage = `${starForceTier}성 ▶ ${
      starForceTier + 1
    }성 강화 실패!`;
    const breakMessage = `장비가 파괴되었습니다`;

    setUseMeso((prevUseMeso) => prevUseMeso + needMeso);

    // 성공
    if (rand <= successRate[starForceTier]) {
      console.log(`${starForceTier}성 ▶ ${starForceTier + 1}성 강화 성공!`);
      setResultWindow((prev) => [...prev, successMessage]);
      setStarForceTier(starForceTier + 1);
      if (starForceTier >= 20) {
        handleConfetti(); // 20성 이상 성공 시 컴페티 이펙트
      }
      if (starForceTier >= 29) {
        alert("축하드립니다! 최대 강화에 도달 하셨습니다! - 태초마을로!");
        setStarForceTier(1);
      }
      // GA4 이벤트: 강화 성공
      window.gtag("event", "starforce_success", {
        variable_name: "starForceTier",
        variable_value: starForceTier + 1, // 성공 후 값
        success_rate: successRate[starForceTier],
      });

      // 실패
    } else if (rand <= successRate[starForceTier] + failRate[starForceTier]) {
      console.log(`${starForceTier}성 ▶ 강화 실패!`);
      setResultWindow((prev) => [...prev, failMessage]);
      // GA4 이벤트: 강화 실패
      window.gtag("event", "starforce_fail", {
        variable_name: "starForceTier",
        variable_value: starForceTier, // 실패 시 현재 값 유지
        fail_rate: failRate[starForceTier],
      });

      // 파괴
    } else {
      console.log(`${starForceTier}성 ▶ 장비 파괴!`);
      setResultWindow((prev) => [...prev, breakMessage]);
      setStarForceTier(12);
      alert("장비가 파괴되었습니다.");
      // GA4 이벤트: 장비 파괴
      window.gtag("event", "starforce_break", {
        variable_name: "starForceTier",
        variable_value: 12, // 파괴 후 값
        break_rate:
          100 - (successRate[starForceTier] + failRate[starForceTier]),
      });
    }
  }, 300);

  //강화 할때 필요한 메소
  const needMesoFunction = () => {
    if (starForceTier >= 0 && starForceTier <= 9) {
      result = 1000 + (Math.pow(level, 3) * (starForceTier + 1)) / 25;
    } else if (starForceTier >= 10 && starForceTier <= 14) {
      // 10~14성 처리
      if (starForceTier === 10) {
        result =
          1000 + (Math.pow(level, 3) * Math.pow(starForceTier + 1, 2.7)) / 400;
      } else if (starForceTier === 11) {
        result =
          1000 + (Math.pow(level, 3) * Math.pow(starForceTier + 1, 2.7)) / 220;
      } else if (starForceTier === 12) {
        result =
          1000 + (Math.pow(level, 3) * Math.pow(starForceTier + 1, 2.7)) / 150;
      } else if (starForceTier === 13) {
        result =
          1000 + (Math.pow(level, 3) * Math.pow(starForceTier + 1, 2.7)) / 110;
      } else if (starForceTier === 14) {
        result =
          1000 + (Math.pow(level, 3) * Math.pow(starForceTier + 1, 2.7)) / 75;
      }
    } else if (starForceTier >= 15 && starForceTier <= 30) {
      if (starForceTier === 17) {
        result =
          1000 + (Math.pow(level, 3) * Math.pow(starForceTier + 1, 2.7)) / 150;
      } else if (starForceTier === 18) {
        result =
          1000 + (Math.pow(level, 3) * Math.pow(starForceTier + 1, 2.7)) / 70;
      } else if (starForceTier === 19) {
        result =
          1000 + (Math.pow(level, 3) * Math.pow(starForceTier + 1, 2.7)) / 45;
      } else if (starForceTier === 20) {
        result =
          1000 + (Math.pow(level, 3) * Math.pow(starForceTier + 1, 2.7)) / 125;
      } else {
        result =
          1000 + (Math.pow(level, 3) * Math.pow(starForceTier + 1, 2.7)) / 200;
      }
    } else {
      result = "잘못 된 값입니다.";
    }

    result = Math.floor(result);
    return result;
  };

  //레벨과 스타포스별 갯수가 바꾸면 필요한 메소 업데이트
  useEffect(() => {
    const baseMeso = needMesoFunction();
    setNeedMeso(
      breakPrevention && starForceTier >= 15 && starForceTier <= 17
        ? baseMeso * 3
        : baseMeso
    );
  }, [level, starForceTier, breakPrevention]);

  // 착용 레벨 선택 값 저장
  const handleChange = (e) => {
    setLevel(Number(e.target.value)); // 선택한 값을 state에 저장
  };
  //----------------------------------------------------------------
  //----------------------------------------------------------------
  //----------------------------------------------------------------
  //----------------------------------------------------------------

  return (
    <>
      <div className="container font-galmuri">
        <div className="equipment-enchant">
          <div className="tabs">
            <div className="tab active flex-col gap-4">스타포스 강화</div>
            {/* <div className="tab active2">챌린지 모드</div> */}
          </div>
          {/* 스타포스 강화 창 시작 */}
          <p className="description text-sm">
            메소를 사용하여 장비를 강화합니다.
          </p>

          <div className="enchant-content">
            <div className="item-info">
              <img
                ref={itemIconRef}
                src="/img/ring.png"
                alt="Item Icon"
                className="item-icon"
              />
              <div id="star-info"></div>
              <div>
                {starForceTier} 성 ▶ {starForceTier + 1} 성
              </div>
              <p>
                <span className="success-rate" id="starForce_Probability">
                  <div className="text-sm">성공확률: {adjustedSuccess}%</div>
                </span>
              </p>
              <p>
                <span className="fail-rate" id="starForcefail_Probability">
                  <div className="text-sm">실패(유지)확률: {adjustedFail}%</div>
                </span>
              </p>
              <div id="starForcebreak_robability">
                <div className="text-sm">파괴 확률 : {adjustedBreak}%</div>
              </div>
            </div>

            <div className="cost text-xs">
              <p className="mb-1">
                <span className="cost-value" id="starForce_cost">
                  장비 착용 레벨:{" "}
                  <select value={level} onChange={handleChange}>
                    <option value="100">100</option>
                    <option value="110">110</option>
                    <option value="120">120</option>
                    <option value="130">130</option>
                    <option value="140">140</option>
                    <option value="150">150</option>
                    <option value="160">160</option>
                    <option value="170">170</option>
                    <option value="180">180</option>
                    <option value="190">190</option>
                    <option value="200">200</option>
                    <option value="250">250</option>
                  </select>
                </span>
              </p>
              {/* 스타포스 단계 선택 */}
              <p className="mb-1">
                <label>
                  스타포스 단계:
                  <select
                    value={starForceTier}
                    onChange={(e) => setStarForceTier(Number(e.target.value))}
                  >
                    {Array.from({ length: 30 }, (_, i) => (
                      <option key={i} value={i}>
                        {i}성
                      </option>
                    ))}
                  </select>
                </label>
              </p>
              <p className="mb-1">
                <span className="cost-value" id="starForce_cost">
                  필요 메소: {needMeso.toLocaleString("ko-KR")}
                </span>
              </p>
              <p className="mb-2">
                <span className="cost-value" id="starForce_totalCost">
                  사용된 메소:{" "}
                  <span className="text-green-500">
                    {useMeso.toLocaleString("ko-KR")}
                  </span>
                </span>
              </p>
            </div>
            {/*스타캐치, 파괴방지 */}
            <div className="options">
              <div className="checkbox-option">
                <input
                  type="checkbox"
                  id="starForce_Catch"
                  checked={catchEnabled}
                  onChange={() => setCatchEnabled((prev) => !prev)}
                />
                <label>스타캐치!</label>
              </div>

              <div className="checkbox-option">
                <input
                  type="checkbox"
                  id="starBreak_prevention"
                  onChange={(e) => setBreakPrevention(e.target.checked)}
                  disabled={!(starForceTier >= 15 && starForceTier <= 17)}
                />
                <label>파괴방지(15~17성)</label>
              </div>
            </div>
            {/*강화 버튼 */}
            <div className="buttons">
              <button className="enhance-btn" onClick={starForceEnhance}>
                강화
              </button>
              <button
                className="enhance-btn2"
                onClick={() => {
                  setStarForceTier(0);
                  setUseMeso(0);
                }}
              >
                초기화
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StarForceSimulator;
