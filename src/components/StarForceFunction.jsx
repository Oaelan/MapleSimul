import { useState, useEffect } from "react";

export function useStarForce() {
  const [starforceTier, setStarforceTier] = useState(1); // 스타포스 단계
  const [result, setResult] = useState(0); // 강화 비용
  const [successProbability, setSuccessProbability] = useState(0); // 성공 확률
  const [breakProbability, setBreakProbability] = useState(0); // 파괴 확률
  const [failProbability, setFailProbability] = useState(0); // 실패 확률
  const [feverTimeCount, setFeverTimeCount] = useState(0); // 피버 타임 카운트
  const [totalCost, setTotalCost] = useState(0); // 총 사용 메소
  const [starForceCatch, setStarForceCatch] = useState(true); // 스타캐치 체크
  const [starBreakPrevention, setStarBreakPrevention] = useState(false); // 파괴 방지 체크
  const [itemLevel, setItemLevel] = useState(100); // 장비 레벨

  // 스타캐치 체크 변경 함수
  const toggleStarCatch = () => {
    setStarForceCatch((prev) => !prev);
  };

  // 파괴 방지 체크 변경 함수
  const toggleStarBreakPrevention = () => {
    setStarBreakPrevention((prev) => !prev);
  };

  // 강화 비용 계산
  const calculateRate = () => {
    let cost = 0;
    const L = 200; // 레벨 값

    if (starforceTier >= 1 && starforceTier <= 9) {
      cost = 1000 + (Math.pow(L, 3) * (starforceTier + 1)) / 25;
    } else if (starforceTier >= 10 && starforceTier <= 14) {
      cost = 1000 + (Math.pow(L, 3) * Math.pow(starforceTier + 1, 2.7)) / [400, 220, 150, 110, 75][starforceTier - 10];
    } else if (starforceTier >= 15 && starforceTier <= 24) {
      cost = 1000 + (Math.pow(L, 3) * Math.pow(starforceTier + 1, 2.7)) / 200;
      if (starforceTier === 15 || starforceTier === 16) {
        cost = starBreakPrevention ? cost * 2 : cost;
      }
    }

    setResult(cost);
  };

  // 확률 계산
  const calculateProbability = () => {
    let success = 0;
    let breakProb = 0;
    let fail = 0;

    if (feverTimeCount < 2) {
      if (starforceTier <= 2) {
        success = 95 - starforceTier * 5;
      } else if (starforceTier >= 3 && starforceTier < 14) {
        success = 95 - starforceTier * 5;
      } else if (starforceTier >= 14 && starforceTier <= 21) {
        success = 30;
      } else if (starforceTier >= 22 && starforceTier <= 24) {
        success = [3, 2, 1][starforceTier - 22];
      }

      if (starForceCatch) {
        success *= 1.05;
      }
    } else {
      success = 100; // 피버 타임
    }

    // 파괴 확률
    if (feverTimeCount === 2) {
      breakProb = 0;
    } else if (starforceTier >= 15) {
      const breakChances = { 15: 2.1, 16: 2.1, 17: 2.1, 18: 2.8, 19: 2.8, 20: 7.0, 21: 7.0, 22: 19.4, 23: 29.4, 24: 39.6 };
      breakProb = breakChances[starforceTier] || 0;

      if (starforceTier === 15 || starforceTier === 16) {
        breakProb = starBreakPrevention ? 0 : breakProb;
      }
    }

    fail = 100 - success - breakProb;

    setSuccessProbability(success.toFixed(1));
    setBreakProbability(breakProb);
    setFailProbability(fail);
  };

  // 강화 실행
  const enhance = () => {
    if (starforceTier >= 25) return;

    const randomValue = Math.random() * 100;

    if (randomValue < successProbability) {
      setStarforceTier((prev) => prev + 1);
      setFeverTimeCount(0);
    } else if (randomValue < successProbability + breakProbability) {
      setStarforceTier(12); // 파괴 시 12성으로 리셋
    } else {
      if (starforceTier <= 15 || starforceTier === 20) {
        // 실패 (유지)
      } else {
        setStarforceTier((prev) => prev - 1); // 16~19성 단계 감소
        setFeverTimeCount((prev) => prev + 1);
      }
    }

    setTotalCost((prev) => prev + Math.round(result));
  };

  // 강화 초기화
  const resetStarForce = () => {
    setStarforceTier(1);
    setTotalCost(0);
    setSuccessProbability(0);
    setBreakProbability(0);
    setFailProbability(0);
  };

  useEffect(() => {
    calculateRate();
    calculateProbability();
  }, [starforceTier, starBreakPrevention, starForceCatch, feverTimeCount]);

  return {
    starforceTier,
    successProbability,
    failProbability,
    breakProbability,
    totalCost,
    result,
    toggleStarCatch,
    toggleStarBreakPrevention,
    enhance,
    resetStarForce,
  };
}
