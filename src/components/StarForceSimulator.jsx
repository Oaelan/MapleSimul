import React, { useState, useEffect, useCallback, useRef } from "react";
import "../starForce.css";
import StarForceSimulator2 from "./StarForceSimulator2";

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
  //스타포스 별 갯수
  const [starForceTier, setStarForceTier] = useState(0);
  //착용 레벨
  const [level, setLevel] = useState(100);
  //필요 메소
  const [needMeso, setNeedMeso] = useState(0);
  //사용된 메소
  const [useMeso, setUseMeso] = useState(0);
  //강화 결과 창 띄워주기
  const [starForceResult, setStarForceResult] = useState(0);

  // 스타포스 강화 성공 확률
  const [successRate] = useState([
    95, 90, 85, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 30, 15, 15, 15,
    30, 15, 15, 10, 10, 10, 7, 5, 3, 1,
  ]);

  // 스타포스 강화 실패 확률
  const [failRate] = useState([
    5, 10, 15, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 67.9, 67.9, 78.2,
    78.2, 76.5, 59.5, 72.25, 68, 72, 72, 72, 74.4, 76, 77.6, 79.2,
  ]);
  //스타포스 강화 파괴 확률 - 15성까진 0퍼
  const [breakRate] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2.1, 2.1, 6.8, 6.8, 8.5, 10.5,
    12.75, 17, 18, 18, 18, 18.6, 19, 19.4, 19.8,
  ]);
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

    if (rand <= successRate[starForceTier]) {
      console.log(`${starForceTier}성 ▶ ${starForceTier + 1}성 강화 성공!`);
      setResultWindow((prev) => [...prev, successMessage]);
      setStarForceTier(starForceTier + 1);
      setStarForceResult(1);
    } else if (rand <= successRate[starForceTier] + failRate[starForceTier]) {
      console.log(`${starForceTier}성 ▶ 강화 실패!`);
      setResultWindow((prev) => [...prev, failMessage]);
      setStarForceResult(2);
    } else {
      console.log(`${starForceTier}성 ▶ 장비 파괴!`);
      setResultWindow((prev) => [...prev, breakMessage]);
      setStarForceTier(12);
      setStarForceResult(3);
    }
  }, 300);
  //강화 결과 창 띄워주기
  const starForceResultFunction = () => {
    switch (starForceResult) {
      case 0:
        return "";
        break;
      case 1:
        return "강화 성공!";
        break;
      case 2:
        return "강화 실패 ㅠ";
        break;
      case 3:
        return "장비가 파괴되었습니다.";
        break;
    }
  };

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
    } else if (starForceTier >= 15 && starForceTier <= 24) {
      result =
        1000 + (Math.pow(level, 3) * Math.pow(starForceTier + 1, 2.7)) / 200;
      // if (starForceTier == 15 || starForceTier == 16) {
      //   result = starBreak_prevention ? result * 2 : result;
      // }
    } else {
      result = "잘못 된 값입니다."; // 잘못된 값일 경우 기본값 설정
    }

    result = Math.floor(result); // 소수점 제거 (1234)
    setNeedMeso(result); // 상태 업데이트
  };
  //레벨과 스타포스별 갯수가 바꾸면 필요한 메소 업데이트
  useEffect(() => {
    needMesoFunction();
  }, [level, starForceTier]);

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
            <button className="tab active">스타포스 강화</button>
          </div>
          {/* 스타포스 강화 창 시작 */}
          <p className="description text-sm">
            메소를 사용하여 장비를 강화합니다.
          </p>

          <div className="enchant-content">
            <div className="item-info">
              <img src="/img/ring.png" alt="Item Icon" className="item-icon" />
              <div id="star-info"></div>
              <div>
                {starForceTier} 성 ▶ {starForceTier + 1} 성
              </div>
              <p>
                <span className="success-rate" id="starForce_Probability">
                  <div className="text-sm">
                    성공확률: {successRate[starForceTier]}
                  </div>
                </span>
              </p>
              <p>
                <span className="fail-rate" id="starForcefail_Probability">
                  <div className="text-sm">
                    실패(유지)확률: {failRate[starForceTier]}
                  </div>
                </span>
              </p>
              <div id="starForcebreak_robability">
                <div className="text-sm">
                  파괴 확률 : {breakRate[starForceTier]}
                </div>
              </div>
              {/* //파괴 확률 */}
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
