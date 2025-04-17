import { useState, useEffect, useRef } from "react";
import CubeSimulItemInfo from "./CubeSimulItemInfo";
import {
  useAllcount,
  useSimulResultOption,
  useMeso,
  useTierUpHistory,
  useThreeOption,
  useCubeSimulItemInfoStore,
} from "../store";
import {
  pontentialCapValue,
  potentialUpgradeProbabilities,
  weaponLv100,
  weaponLv110,
  weaponLv111_119,
  weaponLv120_200,
  emblemLv100,
  emblemLv120_200,
  machineHeartLv100,
  machineHeartLv120_200,
  pendantLv100,
  pendantLv110,
  pendantLv111_119,
  pendantLv120_200,
  ringLv100,
  ringLv110,
  ringLv120_200,
  ringLv201_250,
  earringLv100,
  earringLv110,
  earringLv111_119,
  earringLv120_200,
  eyesAcceLv100,
  eyesAcceLv111_119,
  eyesAcceLv120_200,
  faceAcceLv100,
  faceAcceLv110,
  faceAcceLv111_119,
  faceAcceLv120_200,
  shoulderLv100,
  shoulderLv110,
  shoulderLv120_200,
  shoulderLv201_250,
  beltLv100,
  beltLv110,
  beltLv111_119,
  beltLv120_200,
  capeLv100,
  capeLv110,
  capeLv111_119,
  capeLv120_200,
  capeLv201_250,
  glovesLv100,
  glovesLv110,
  glovesLv111_119,
  glovesLv120_200,
  glovesLv201_250,
  shoesLv100,
  shoesLv110,
  shoesLv111_119,
  shoesLv120_200,
  shoesLv201_250,
  pantsLv100,
  pantsLv120_200,
  pantsLv201_250,
  topLv100,
  topLv111_119,
  topLv120_200,
  topLv201_250,
  onepieceLv100,
  onepieceLv110,
  onepieceLv111_119,
  onepieceLv120_200,
  hatLv100,
  hatLv110,
  hatLv111_119,
  hatLv120_200,
  hatLv201_250,
  shieldLv100,
  shieldLv110,
  shieldLv120_200,
  subWeaponLv100,
  subWeaponLv110,
  subWeaponLv120_200,
  subWeaponForceShieldAndSoulRingLv100,
  subWeaponForceShieldAndSoulRingLv110,
} from "../blackCubeOptions";
import {
  additionalCapValue,
  addiUpgradeProbabilities,
  addiWeaponLv100,
  addiWeaponLv110,
  addiWeaponLv111_119,
  addiWeaponLv120_200,
  addiEmblemLv100,
  addiEmblemLv120_200,
  addiMachineHeartLv100,
  addiMachineHeartLv120_200,
  addiPendantLv100,
  addiPendantLv110,
  addiPendantLv111_119,
  addiPendantLv120_200,
  addiRingLv100,
  addiRingLv110,
  addiRingLv120_200,
  addiEarringLv100,
  addiEarringLv110,
  addiEarringLv111_119,
  addiEarringLv120_200,
  addiEyesAcceLv100,
  addiEyesAcceLv111_119,
  addiEyesAcceLv120_200,
  addiFaceAcceLv100,
  addiFaceAcceLv110,
  addiFaceAcceLv111_119,
  addiFaceAcceLv120_200,
  addiShoulderLv100,
  addiShoulderLv110,
  addiShoulderLv120_200,
  addiShoulderLv201_250,
  addiBeltLv100,
  addiBeltLv110,
  addiBeltLv111_119,
  addiBeltLv120_200,
  addiCapeLv100,
  addiCapeLv110,
  addiCapeLv111_119,
  addiCapeLv120_200,
  addiCapeLv201_250,
  addiGlovesLv100,
  addiGlovesLv110,
  addiGlovesLv111_119,
  addiGlovesLv120_200,
  addiGlovesLv201_250,
  addiShoesLv100,
  addiShoesLv110,
  addiShoesLv111_119,
  addiShoesLv120_200,
  addiShoesLv201_250,
  addiPantsLv100,
  addiPantsLv120_200,
  addiPantsLv201_250,
  addiTopLv100,
  addiTopLv111_119,
  addiTopLv120_200,
  addiTopLv201_250,
  addiOnepieceLv100,
  addiOnepieceLv110,
  addiOnepieceLv111_119,
  addiOnepieceLv120_200,
  addiHatLv100,
  addiHatLv110,
  addiHatLv111_119,
  addiHatLv120_200,
  addiHatLv201_250,
  addiShieldLv100,
  addiShieldLv110,
  addiShieldLv120_200,
  addiSubWeaponLv100,
  addiSubWeaponLv110,
  addiSubWeaponLv120_200,
  addiSubWeaponForceShieldAndSoulRingLv100,
  addiSubWeaponForceShieldAndSoulRingLv110,
} from "../whiteCubeOptions";

function CubeSimulatorInfo() {
  //console.log("CubeSimulatorInfo 렌더링");
  const isTierUp = useRef(false);
  // 아이템 정보 상태
  // Zustand 스토어 사용
  const { itemInfo, upgradeTier, getCurrentItemInfo, setItemInfo } =
    useCubeSimulItemInfoStore();
  const [koreanTier, setKoreanTier] = useState("-");
  //등급 재설정 비용
  const [cubeCost, setCubeCost] = useState(0);
  // 타이머를 저장할 참조 변수
  const throttleTimeoutRef = useRef(null);
  // 현재 스로틀 중인지 여부를 저장할 참조 변수
  const isThrottledRef = useRef(false);
  //총 재설정 비용
  const calculateMeso = useMeso((state) => state.calculateMeso);
  //등급 업을 위한 카운트 state
  //const [tierUpCount, setTierUpCount] = useState(0);
  const tierUpCount = useRef(0);
  // 등급업 후 tierUpCount 리셋
  const resetTierUpCount = () => {
    tierUpCount.current = 0;
  };
  //시뮬레이션 횟수 카운트 state
  const [simulCount, setSimulCount] = useState(0);
  //등급업 천장 값
  const [capValue, setCapValue] = useState(0);
  //3줄 띄웠는지 안띄웠는지 state (전역변수로 관리)
  const isThreeOption = useThreeOption((state) => state.isThreeOption);
  const setIsThreeOption = useThreeOption((state) => state.setIsThreeOption);
  // 시뮬레이션 총 횟수 (전연벽수로 관리)
  const increaseAllcount = useAllcount((state) => state.increaseAllcount);
  //시뮬레이션 결과 옵션 3줄 (전역변수로 관리)
  const { simulResultOption, setSimulResultOption } = useSimulResultOption();
  //등급업한 이력 관리 state
  const addTierUpHistory = useTierUpHistory((state) => state.addTierUpHistory);
  //잠재 능력 재설정 버튼 클릭 시 시뮬레이션 작동
  const handleCubeSimulClick = () => {
    // 1️⃣ 스로틀 상태 확인
    if (!isThrottledRef.current) {
      // 2️⃣ 실제 작업 수행
      if (
        itemInfo.type &&
        itemInfo.parts &&
        itemInfo.level &&
        itemInfo.tier &&
        itemInfo.costRange &&
        itemInfo.mainStat
      ) {
        //등급업하는 카운트 증가(천장값 도달시 등급업)
        tierUpCount.current = tierUpCount.current + 1;
        //cubeSimulartorInfo 컴포넌트에서 실행되는 시뮬 횟수
        setSimulCount(simulCount + 1);
        ///cubeSimulartorResult 컴포넌트에서 실행되는 총 시뮬레이션 횟수
        increaseAllcount();
        handleSimul();
      } else {
        alert("시뮬레이션 정보를 입력하세요.");
        return;
      }
      // 3️⃣ 스로틀 상태 설정
      isThrottledRef.current = true;
      // 4️⃣ 타이머 설정
      throttleTimeoutRef.current = setTimeout(() => {
        isThrottledRef.current = false;
      }, 500);
    }
  };
  // 큐브 시뮬 비용 가져오기 함수
  const getTierCost = (itemInfo) => {
    let cost;
    if (itemInfo.type == "potential") {
      // 윗잠 재설정 비용 값 테이블
      const potentialCostTable = {
        rare: { 250: 5000000, 200: 4500000, 160: 4250000, 1: 4000000 },
        epic: { 250: 20000000, 200: 18000000, 160: 17000000, 1: 16000000 },
        unique: { 250: 42500000, 200: 38250000, 160: 36125000, 1: 34000000 },
        legendary: { 250: 50000000, 200: 45000000, 160: 42500000, 1: 40000000 },
      };

      // 250 이상 300 이하 250 ~300 구간
      if (itemInfo.costRange == 250) {
        cost = potentialCostTable[itemInfo.tier][250];
      }
      // 200 이상 249 이하  200~249 구간
      if (itemInfo.costRange == 200) {
        cost = potentialCostTable[itemInfo.tier][200];
      }
      // 160 이상 199 이하 160~199 구간
      if (itemInfo.costRange == 160) {
        cost = potentialCostTable[itemInfo.tier][160];
      }
      // 1 이상 159 이하 1~159 구간
      if (itemInfo.costRange == 1) {
        cost = potentialCostTable[itemInfo.tier][1];
      }
    } else {
      // 이렛잠 재설정 비용 값 테이블
      const additionalCostTable = {
        rare: { 250: 16250000, 200: 14625000, 160: 13812000, 1: 13000000 },
        epic: { 250: 45500000, 200: 40950000, 160: 38675000, 1: 36400000 },
        unique: { 250: 55250000, 200: 49725000, 160: 46962500, 1: 44200000 },
        legendary: { 250: 65000000, 200: 58500000, 160: 55250000, 1: 52000000 },
      };
      // 250 이상 300 이하 250 ~300 구간
      if (itemInfo.costRange == 250) {
        cost = additionalCostTable[itemInfo.tier][250];
      }
      // 200 이상 249 이하  200~249 구간
      if (itemInfo.costRange == 200) {
        cost = additionalCostTable[itemInfo.tier][200];
      }
      // 160 이상 199 이하 160~199 구간
      if (itemInfo.costRange == 160) {
        cost = additionalCostTable[itemInfo.tier][160];
      }
      // 1이상 159 이하 1~159 구간
      if (itemInfo.costRange == 1) {
        cost = additionalCostTable[itemInfo.tier][1];
      }
    }
    setCubeCost(cost);
  };
  //큐브 등급업 확률 함수
  const cubeTierUp = (capValue, upgradeProbabilities) => {
    const beforeTier = itemInfo.tier;
    // 레전더리 등급 처리
    if (beforeTier === "legendary") {
      setCapValue(0);
      return;
    }

    // 천장값 설정
    if (capValue[beforeTier]) {
      setCapValue(capValue[beforeTier].count);
    }

    // 등급업 조건 확인
    const isCeilingReached = tierUpCount.current >= capValue[beforeTier]?.count;
    const random = Math.random() * 100;
    const isProbabilitySuccess =
      random < upgradeProbabilities[beforeTier]?.chance;

    // 등급업 조건이 충족되면 등급업 실행
    if (isCeilingReached || isProbabilitySuccess) {
      const nextTier = capValue[beforeTier]?.next;
      const reason = isCeilingReached ? "천장값" : "기본 확률";

      //console.log(`${reason} 등급업`);
      addTierUpHistory(`${beforeTier} -> ${nextTier} ${reason}`);

      // 등급업 상태 업데이트
      upgradeTier(nextTier); //store에서 관리되는 시뮬아이템 정보의 등급 업데이트
      isTierUp.current = true;
      resetTierUpCount();

      // 애니메이션 타이머 설정
      setTimeout(() => {
        isTierUp.current = false;
      }, 1000);
    }
  };
  //시뮬레이션 장비에 해당하는 뽑힐수 있는 옵션 정보 가져오기
  const getOptions = () => {
    const currentItemInfo = getCurrentItemInfo();
    //console.log("currentItemInfo", currentItemInfo);

    const AllEquimentOptions = {
      weaponLv100,
      weaponLv110,
      weaponLv111_119,
      weaponLv120_200,
      emblemLv100,
      emblemLv120_200,
      machineHeartLv100,
      machineHeartLv120_200,
      pendantLv100,
      pendantLv110,
      pendantLv111_119,
      pendantLv120_200,
      ringLv100,
      ringLv110,
      ringLv120_200,
      ringLv201_250,
      earringLv100,
      earringLv110,
      earringLv111_119,
      earringLv120_200,
      eyesAcceLv100,
      eyesAcceLv111_119,
      eyesAcceLv120_200,
      faceAcceLv100,
      faceAcceLv110,
      faceAcceLv111_119,
      faceAcceLv120_200,
      shoulderLv100,
      shoulderLv110,
      shoulderLv120_200,
      shoulderLv201_250,
      beltLv100,
      beltLv110,
      beltLv111_119,
      beltLv120_200,
      capeLv100,
      capeLv110,
      capeLv111_119,
      capeLv120_200,
      capeLv201_250,
      glovesLv100,
      glovesLv110,
      glovesLv111_119,
      glovesLv120_200,
      glovesLv201_250,
      shoesLv100,
      shoesLv110,
      shoesLv111_119,
      shoesLv120_200,
      shoesLv201_250,
      pantsLv100,
      pantsLv120_200,
      pantsLv201_250,
      topLv100,
      topLv111_119,
      topLv120_200,
      topLv201_250,
      onepieceLv100,
      onepieceLv110,
      onepieceLv111_119,
      onepieceLv120_200,
      hatLv100,
      hatLv110,
      hatLv111_119,
      hatLv120_200,
      hatLv201_250,
      shieldLv100,
      shieldLv110,
      shieldLv120_200,
      subWeaponLv100,
      subWeaponLv110,
      subWeaponLv120_200,
      subWeaponForceShieldAndSoulRingLv100,
      subWeaponForceShieldAndSoulRingLv110,
      addiWeaponLv100,
      addiWeaponLv110,
      addiWeaponLv111_119,
      addiWeaponLv120_200,
      addiEmblemLv100,
      addiEmblemLv120_200,
      addiMachineHeartLv100,
      addiMachineHeartLv120_200,
      addiPendantLv100,
      addiPendantLv110,
      addiPendantLv111_119,
      addiPendantLv120_200,
      addiRingLv100,
      addiRingLv110,
      addiRingLv120_200,
      addiEarringLv100,
      addiEarringLv110,
      addiEarringLv111_119,
      addiEarringLv120_200,
      addiEyesAcceLv100,
      addiEyesAcceLv111_119,
      addiEyesAcceLv120_200,
      addiFaceAcceLv100,
      addiFaceAcceLv110,
      addiFaceAcceLv111_119,
      addiFaceAcceLv120_200,
      addiShoulderLv100,
      addiShoulderLv110,
      addiShoulderLv120_200,
      addiShoulderLv201_250,
      addiBeltLv100,
      addiBeltLv110,
      addiBeltLv111_119,
      addiBeltLv120_200,
      addiCapeLv100,
      addiCapeLv110,
      addiCapeLv111_119,
      addiCapeLv120_200,
      addiCapeLv201_250,
      addiGlovesLv100,
      addiGlovesLv110,
      addiGlovesLv111_119,
      addiGlovesLv120_200,
      addiGlovesLv201_250,
      addiShoesLv100,
      addiShoesLv110,
      addiShoesLv111_119,
      addiShoesLv120_200,
      addiShoesLv201_250,
      addiPantsLv100,
      addiPantsLv120_200,
      addiPantsLv201_250,
      addiTopLv100,
      addiTopLv111_119,
      addiTopLv120_200,
      addiTopLv201_250,
      addiOnepieceLv100,
      addiOnepieceLv110,
      addiOnepieceLv111_119,
      addiOnepieceLv120_200,
      addiHatLv100,
      addiHatLv110,
      addiHatLv111_119,
      addiHatLv120_200,
      addiHatLv201_250,
      addiShieldLv100,
      addiShieldLv110,
      addiShieldLv120_200,
      addiSubWeaponLv100,
      addiSubWeaponLv110,
      addiSubWeaponLv120_200,
      addiSubWeaponForceShieldAndSoulRingLv100,
      addiSubWeaponForceShieldAndSoulRingLv110,
    };
    let equiment = "";
    // 부위 선택 후 다른 부위로 변경시에  Iteminfo의 level이
    // 이전에 선택한 렙제로 남아있음
    // 만약 부위 변경시 해당 아이템의 렙제가 이전 장비의 렙제를
    // 포함하지 않을시에 에러가남 예를들어 상의 -> 렙제 201~250 선택후
    // 한벌옷으로 부위 변경시 페이지에서는 렙제 셀렉트가 100으로 선택되나
    // 실제 itemInfo의 level은 201~250 으로 남아있음
    // 이런 경우 옵션 랜덤 뽑기에서 에러가 나기 때문에 에러 처리 필요
    const { tier, parts, level, type } = currentItemInfo;
    //console.log("tier", tier);
    const levelRange = {
      range: [
        { Lv: "100" },
        { Lv: "110" },
        { Lv: "111_119" },
        { Lv: "120_200" },
        { Lv: "201_250" },
      ],
    };
    if (parts == "weapon") {
      for (const range of levelRange.range) {
        if (level == range.Lv) {
          const weaponKey = `${
            type === "additional" ? "addiWeapon" : "weapon"
          }Lv${range.Lv}`;
          equiment = AllEquimentOptions[weaponKey];
          equiment = equiment[tier];
        }
      }
    }
    if (parts == "emblem") {
      for (const range of levelRange.range) {
        if (level == range.Lv) {
          const weaponKey = `${
            type === "additional" ? "addiEmblem" : "emblem"
          }Lv${range.Lv}`;
          equiment = AllEquimentOptions[weaponKey];
          equiment = equiment[tier];
        }
      }
    }
    if (parts == "machineHeart") {
      for (const range of levelRange.range) {
        if (level == range.Lv) {
          const weaponKey = `${
            type === "additional" ? "addiMachineHeart" : "machineHeart"
          }Lv${range.Lv}`;
          equiment = AllEquimentOptions[weaponKey];
          equiment = equiment[tier];
        }
      }
    }
    if (parts == "pendant") {
      for (const range of levelRange.range) {
        if (level == range.Lv) {
          const weaponKey = `${
            type === "additional" ? "addiPendant" : "pendant"
          }Lv${range.Lv}`;
          equiment = AllEquimentOptions[weaponKey];
          equiment = equiment[tier];
        }
      }
    }
    if (parts == "ring") {
      for (const range of levelRange.range) {
        if (level == range.Lv) {
          const weaponKey = `${type === "additional" ? "addiRing" : "ring"}Lv${
            range.Lv
          }`;
          equiment = AllEquimentOptions[weaponKey];
          equiment = equiment[tier];
        }
      }
    }
    if (parts == "earring") {
      for (const range of levelRange.range) {
        if (level == range.Lv) {
          const weaponKey = `${
            type === "additional" ? "addiEarring" : "earring"
          }Lv${range.Lv}`;
          equiment = AllEquimentOptions[weaponKey];
          equiment = equiment[tier];
        }
      }
    }
    if (parts == "eyesAcce") {
      for (const range of levelRange.range) {
        if (level == range.Lv) {
          const weaponKey = `${
            type === "additional" ? "addiEyesAcce" : "eyesAcce"
          }Lv${range.Lv}`;
          equiment = AllEquimentOptions[weaponKey];
          equiment = equiment[tier];
        }
      }
    }
    if (parts == "faceAcce") {
      for (const range of levelRange.range) {
        if (level == range.Lv) {
          const weaponKey = `${
            type === "additional" ? "addiFaceAcce" : "faceAcce"
          }Lv${range.Lv}`;
          equiment = AllEquimentOptions[weaponKey];
          equiment = equiment[tier];
        }
      }
    }
    if (parts == "shoulder") {
      for (const range of levelRange.range) {
        if (level == range.Lv) {
          const weaponKey = `${
            type === "additional" ? "addiShoulder" : "shoulder"
          }Lv${range.Lv}`;
          equiment = AllEquimentOptions[weaponKey];
          equiment = equiment[tier];
        }
      }
    }
    if (parts == "belt") {
      for (const range of levelRange.range) {
        if (level == range.Lv) {
          const weaponKey = `${type === "additional" ? "addiBelt" : "belt"}Lv${
            range.Lv
          }`;
          equiment = AllEquimentOptions[weaponKey];
          equiment = equiment[tier];
        }
      }
    }
    if (parts == "cape") {
      for (const range of levelRange.range) {
        if (level == range.Lv) {
          const weaponKey = `${type === "additional" ? "addiCape" : "cape"}Lv${
            range.Lv
          }`;
          equiment = AllEquimentOptions[weaponKey];
          equiment = equiment[tier];
        }
      }
    }
    if (parts == "pants") {
      for (const range of levelRange.range) {
        if (level == range.Lv) {
          const weaponKey = `${
            type === "additional" ? "addiPants" : "pants"
          }Lv${range.Lv}`;
          equiment = AllEquimentOptions[weaponKey];
          equiment = equiment[tier];
        }
      }
    }
    if (parts == "shoes") {
      for (const range of levelRange.range) {
        if (level == range.Lv) {
          const weaponKey = `${
            type === "additional" ? "addiShoes" : "shoes"
          }Lv${range.Lv}`;
          equiment = AllEquimentOptions[weaponKey];
          equiment = equiment[tier];
        }
      }
    }
    if (parts == "gloves") {
      for (const range of levelRange.range) {
        if (level == range.Lv) {
          const weaponKey = `${
            type === "additional" ? "addiGloves" : "gloves"
          }Lv${range.Lv}`;
          equiment = AllEquimentOptions[weaponKey];
          equiment = equiment[tier];
        }
      }
    }
    if (parts == "top") {
      for (const range of levelRange.range) {
        if (level == range.Lv) {
          const weaponKey = `${type === "additional" ? "addiTop" : "top"}Lv${
            range.Lv
          }`;
          equiment = AllEquimentOptions[weaponKey];
          equiment = equiment[tier];
        }
      }
    }
    if (parts == "onepiece") {
      for (const range of levelRange.range) {
        if (level == range.Lv) {
          const weaponKey = `${
            type === "additional" ? "addiOnepiece" : "onepiece"
          }Lv${range.Lv}`;
          console.log("weaponKey", weaponKey);
          console.log("tier", tier);
          equiment = AllEquimentOptions[weaponKey];
          equiment = equiment[tier];
        }
      }
    }
    if (parts == "hat") {
      for (const range of levelRange.range) {
        if (level == range.Lv) {
          const weaponKey = `${type === "additional" ? "addiHat" : "hat"}Lv${
            range.Lv
          }`;
          equiment = AllEquimentOptions[weaponKey];
          equiment = equiment[tier];
        }
      }
    }
    if (parts == "subWeapon") {
      for (const range of levelRange.range) {
        if (level == range.Lv) {
          const weaponKey = `${
            type === "additional" ? "addiSubWeapon" : "subWeapon"
          }Lv${range.Lv}`;
          equiment = AllEquimentOptions[weaponKey];
          equiment = equiment[tier];
        }
      }
    }
    if (parts == "subWeaponForceShieldAndSoulRing") {
      for (const range of levelRange.range) {
        if (level == range.Lv) {
          const weaponKey = `${
            type === "additional"
              ? "addiSubWeaponForceShieldAndSoulRing"
              : "subWeaponForceShieldAndSoulRing"
          }Lv${range.Lv}`;
          equiment = AllEquimentOptions[weaponKey];
          equiment = equiment[tier];
        }
      }
    }
    if (parts == "shield") {
      for (const range of levelRange.range) {
        if (level == range.Lv) {
          const weaponKey = `${
            type === "additional" ? "addiShield" : "shield"
          }Lv${range.Lv}`;
          equiment = AllEquimentOptions[weaponKey];
          equiment = equiment[tier];
        }
      }
    }
    return equiment;
  };
  //옵션 랜덤 뽑기
  const getRandomOption = (options) => {
    if (!options || options.length === 0) return null; // 옵션 리스트가 비어 있으면 null 반환

    // 확률 비율 계산
    const totalProbability = options.reduce((sum, option) => {
      return sum + parseFloat(option.probability.replace("%", ""));
    }, 0);

    //console.log("totalProbability", totalProbability)
    // 0부터 전체 확률 합까지의 랜덤 값 생성
    const randomValue = Math.random() * totalProbability;
    //console.log("randomValue", randomValue)

    // 누적 확률에 따라 옵션 선택
    let cumulativeSum = 0;
    for (let i = 0; i < options.length; i++) {
      cumulativeSum += parseFloat(options[i].probability.replace("%", ""));
      if (randomValue <= cumulativeSum) {
        //console.log("cumulativeSum", cumulativeSum)
        //console.log("optionList[i]", optionList[i])
        return options[i]; // 선택된 옵션 반환
      }
    }
  };
  //큐브 등급 한글 변환
  const transformTier = (tier) => {
    if (tier == "rare") {
      setKoreanTier("레어");
    } else if (tier == "epic") {
      setKoreanTier("에픽");
    } else if (tier == "unique") {
      setKoreanTier("유니크");
    } else if (tier == "legendary") {
      setKoreanTier("레전드리");
    }
  };
  // 옵션, 옵션값으로 나눠지는 형태일 경우 true 반환
  const checkVaildOption = (option, value) => {
    if (option && value) return true;
    return false;
  };
  //잠재 능력 재설정 버튼 클릭 시 simulCount 증가에 따른 시뮬 실행
  const handleSimul = () => {
    // 아이템 정보가 모두 있는 경우에만 시뮬레이션 실행
    //console.log("itemInfo", itemInfo);
    let optionList;
    //윗잠인 경우
    if (itemInfo.type === "potential") {
      //큐브 시물 비용
      getTierCost(itemInfo); //업그레이드 직전까지는 이전 등급의 비용을 가져오도록
      //cubeTierUp에서 등급업 진행 후 업데이트된 정보 생성
      cubeTierUp(pontentialCapValue, potentialUpgradeProbabilities);
      //시뮬레이션 장비에 해당하는 옵션 리스트 가져오기
      optionList = getOptions();
      if (optionList) {
        const first = getRandomOption(optionList.options.firstOption);
        const second = getRandomOption(optionList.options.secondOption);
        const third = getRandomOption(optionList.options.thirdOption);
        // 모든 스킬의 재사용 대기시간 옵션이 뽑힌 경우
        const options = [first.option, second.option, third.option].map(
          (option) => {
            return option.includes("모든 스킬의 재사용 대기시간")
              ? option.split("(")[0].trim()
              : option; // 옵션명 줄이기
          }
        );
        setSimulResultOption(options);
      }
      //아랫잠인 경우
    } else {
      //큐브 시물 비용
      getTierCost(itemInfo);
      // 버튼을 눌렀을 경우에만 실행이 되도록
      //cubeTierUp에서 등급업 진행 후 업데이트된 정보 생성
      // 업데이트된 정보 생성
      cubeTierUp(additionalCapValue, addiUpgradeProbabilities);
      optionList = getOptions(itemInfo);
      if (optionList) {
        const first = getRandomOption(optionList.options.firstOption);
        const second = getRandomOption(optionList.options.secondOption);
        const third = getRandomOption(optionList.options.thirdOption);
        // 모든 스킬의 재사용 대기시간 옵션이 뽑힌 경우
        const options = [first.option, second.option, third.option].map(
          (option) => {
            return option.includes("모든 스킬의 재사용 대기시간")
              ? option.split("(")[0].trim()
              : option; // 옵션명 줄이기
          }
        );
        setSimulResultOption(options);
      }
    }
    // 시뮬레이션 작동
  };
  // 시뮬 아이템 등급 한글 변환 후 표시 (등급업 후에도 표시되게)
  useEffect(() => {
    transformTier(itemInfo.tier);
  }, [itemInfo.tier]);

  // 큐브 시뮬 비용 계산하기
  useEffect(() => {
    //console.log(cubeCost);
    if (simulCount >= 1) {
      calculateMeso(cubeCost);
    }
  }, [cubeCost, simulCount, calculateMeso]);
  //옵션 결과 바뀔 때마다 유효 3줄인지 확인하기
  // 유효 3옵션 띄었을 경우 폭죽 터트리기
  useEffect(() => {
    //console.log("itemInfo", itemInfo);
    if (simulResultOption.length === 3) {
      //console.log("itemInfo", itemInfo);
      // 시뮬 결과 옵션 3줄
      const [first, second, third] = simulResultOption;
      // 각 옵션을 ':' 기준으로 분리
      // 만약 공격시 ~ 이런 옵션일 경우 ":" 이 포함 되지 않음!!
      // 옵션 문자열에서 옵션명과 값을 추출하는 함수
      const extractOptionAndValue = (optionStr) => {
        if (optionStr.includes(":")) {
          const [option, value] = optionStr.split(":");
          return [option.trim(), value.trim()];
        }
        return [optionStr.trim(), ""];
      };
      // 함수 사용
      const [firstOption, firstValue] = extractOptionAndValue(first);
      const [secondOption, secondValue] = extractOptionAndValue(second);
      const [thirdOption, thirdValue] = extractOptionAndValue(third);
      const check1 = checkVaildOption(firstOption, firstValue);
      const check2 = checkVaildOption(secondOption, secondValue);
      const check3 = checkVaildOption(thirdOption, thirdValue);
      // 유효 옵션이 % 수치인 경우 true 반환 하나라도 포함안될 경우 false 반환
      // 유효 옵션 수치가 % 인 경우에만 사용
      const isPercent =
        firstValue.includes("%") &&
        secondValue.includes("%") &&
        thirdValue.includes("%");
      // 메인스탯 값 가져오기
      let mainStatValue;
      if (itemInfo.mainStat === "INT") {
        mainStatValue = "INT";
      } else if (itemInfo.mainStat === "STR") {
        mainStatValue = "STR";
      } else if (itemInfo.mainStat === "LUK") {
        mainStatValue = "LUK";
      } else if (itemInfo.mainStat === "DEX") {
        mainStatValue = "DEX";
      } else if (itemInfo.mainStat === "최대 HP") {
        mainStatValue = "최대 HP";
      } else if (itemInfo.mainStat === "ALL") {
        mainStatValue = "올스탯";
      }
      //옵션명, 옵션값으로 나눠지는 경우 유효 3옵션 체크
      if (check1 && check2 && check3) {
        //잠재인 경우
        if (itemInfo.type === "potential") {
          //잠재에서 무기부위 / 보조무기 3유효 검증
          if (
            itemInfo.parts === "weapon" ||
            itemInfo.parts === "subWeapon" ||
            itemInfo.parts === "subWeaponForceShieldAndSoulRing" ||
            itemInfo.parts === "shield"
          ) {
            const potentialVaildWeaponOption = [
              "보스 몬스터 공격 시 데미지",
              "몬스터 방어율 무시",
              // 주스탯에 따라 유효옵션 변경
              itemInfo.mainStat === "INT" ? "마력" : "공격력",
            ];
            // 유효 옵션이 포함될 경우 true 하나라도 포함안될 경우 false 반환
            const isVaild =
              potentialVaildWeaponOption.includes(firstOption) &&
              potentialVaildWeaponOption.includes(secondOption) &&
              potentialVaildWeaponOption.includes(thirdOption);
            //유효옵션들 + 유효 옵션 수치인 경우
            if (isVaild && isPercent) {
              setIsThreeOption(true);
            }
          }
          // 잠재에서 엠블렘 3유효 검증
          else if (itemInfo.parts === "emblem") {
            const potentialVaildEmblemOption =
              itemInfo.mainStat === "INT"
                ? ["마력", "몬스터 방어율 무시"]
                : ["공격력", "몬스터 방어율 무시"];
            console.log(potentialVaildEmblemOption);
            const isVaild =
              potentialVaildEmblemOption.includes(firstOption) &&
              potentialVaildEmblemOption.includes(secondOption) &&
              potentialVaildEmblemOption.includes(thirdOption);
            // console.log(isVaild, isPercent);
            if (isVaild && isPercent) {
              console.log(firstOption, secondOption, thirdOption);
              setIsThreeOption(true);
            }
          }
          // 잠재에서 모자 3유효 검증
          else if (itemInfo.parts === "hat") {
            const potentialVaildHatOption = [
              "모든 스킬의 재사용 대기시간",
              mainStatValue !== "최대 HP" ? "올스탯" : "",
              mainStatValue,
            ].filter(Boolean);
            //유효옵션에 해당하면 true
            const isVaild =
              potentialVaildHatOption.includes(firstOption) &&
              potentialVaildHatOption.includes(secondOption) &&
              potentialVaildHatOption.includes(thirdOption);
            // 유효 옵션에 해당하는 경우 유효 수치 검증
            if (isVaild) {
              const isValidStats =
                firstOption &&
                (firstValue.endsWith("%") ||
                  firstOption === "모든 스킬의 재사용 대기시간") &&
                secondOption &&
                (secondValue.endsWith("%") ||
                  secondOption === "모든 스킬의 재사용 대기시간") &&
                thirdOption &&
                (thirdValue.endsWith("%") ||
                  thirdOption === "모든 스킬의 재사용 대기시간");
              if (isValidStats) {
                setIsThreeOption(true);
              }
            }
          }
          // 잠재에서 장갑 3유효 검증
          else if (itemInfo.parts === "gloves") {
            const potentialVaildGlovesOption = [
              "크리티컬 데미지",
              //hp가 주스탯인 경우 올스탯 비활성화
              mainStatValue !== "최대 HP" ? "올스탯" : "",
              mainStatValue,
            ].filter(Boolean);
            console.log(potentialVaildGlovesOption);
            //유효옵션에 해당하면 true
            const isVaild =
              potentialVaildGlovesOption.includes(firstOption) &&
              potentialVaildGlovesOption.includes(secondOption) &&
              potentialVaildGlovesOption.includes(thirdOption);
            // 유효 옵션에 해당하는 경우 유효 수치 검증
            if (isVaild) {
              const isValidStats =
                firstOption &&
                (firstValue.endsWith("%") ||
                  firstOption === "크리티컬 데미지") &&
                secondOption &&
                (secondValue.endsWith("%") ||
                  secondOption === "크리티컬 데미지") &&
                thirdOption &&
                (thirdValue.endsWith("%") || thirdOption === "크리티컬 데미지");
              if (isValidStats) {
                setIsThreeOption(true);
              }
            }
          }
          // 눈장식, 얼굴장식,반지,펜던트,귀고리 3유효 검증
          // 주스탯 3줄 또는 메획 2줄 아드는 2줄이여도 유효
          else if (
            itemInfo.parts === "eyesAcce" ||
            itemInfo.parts === "faceAcce" ||
            itemInfo.parts === "ring" ||
            itemInfo.parts === "pendant" ||
            itemInfo.parts === "earring"
          ) {
            //console.log(itemInfo.parts);
            // 잠재에서 장신구 3유효 검증 옵션
            const potentialVaildAccessoryOption = [
              "아이템 드롭률",
              "메소 획득량",
              //hp가 주스탯인 경우 올스탯 비활성화
              mainStatValue !== "최대 HP" ? "올스탯" : "",
              mainStatValue,
            ].filter(Boolean);
            //console.log(potentialVaildAccessoryOption);
            //유효 옵션 포함 했는지 여부
            const isVaild =
              potentialVaildAccessoryOption.includes(firstOption) &&
              potentialVaildAccessoryOption.includes(secondOption) &&
              potentialVaildAccessoryOption.includes(thirdOption);
            //유효 수치인 경우 유효 검증
            if (isPercent) {
              // 아드 옵션이 2줄 이상인 경우 유효
              const adOptions = [firstOption, secondOption, thirdOption].filter(
                (option) => option.includes("아이템 드롭률")
              );

              if (adOptions.length >= 2) {
                setIsThreeOption(true);
              }
              // 메획 옵션이 2줄 이상인 경우 유효
              const mesoOptions = [
                firstOption,
                secondOption,
                thirdOption,
              ].filter((option) => option.includes("메소 획득량"));
              if (mesoOptions.length >= 2) {
                setIsThreeOption(true);
              }
              // 메인스탯 옵션이 3줄 이상인 경우 유효
              if (isVaild) {
                //console.log(firstOption, secondOption, thirdOption);
                const mainStatOption = [
                  firstOption,
                  secondOption,
                  thirdOption,
                ].filter(
                  (option) =>
                    // mainStatValue와 일치하거나 "올스탯"인 경우
                    option === mainStatValue || option === "올스탯"
                );
                if (mainStatOption.length >= 3) {
                  setIsThreeOption(true);
                }
              }
            }
          }
          //나머지 부위들 3유효 검증
          else {
            const potentialVaildOtherOption = [
              mainStatValue, //hp가 주스탯인 경우 올스탯 비활성화
              mainStatValue !== "최대 HP" ? "올스탯" : "",
            ].filter(Boolean);
            console.log(potentialVaildOtherOption);
            console.log(firstOption, secondOption, thirdOption);
            const isVaild =
              potentialVaildOtherOption.includes(firstOption) &&
              potentialVaildOtherOption.includes(secondOption) &&
              potentialVaildOtherOption.includes(thirdOption);
            if (isVaild && isPercent) {
              setIsThreeOption(true);
            }
          }
        }
        //에디인 경우
        if (itemInfo.type === "additional") {
          //에디에서 무기부위 / 보조무기 3유효 검증
          if (
            itemInfo.parts === "weapon" ||
            itemInfo.parts === "subWeapon" ||
            itemInfo.parts === "subWeaponForceShieldAndSoulRing" ||
            itemInfo.parts === "shield"
          ) {
            const additionalVaildWeaponOption = [
              "보스 몬스터 공격 시 데미지",
              // 주스탯에 따라 유효옵션 변경
              itemInfo.mainStat === "INT" ? "마력" : "공격력",
            ];
            // 유효 옵션이 포함될 경우 true 하나라도 포함안될 경우 false 반환
            const isVaild =
              additionalVaildWeaponOption.includes(firstOption) &&
              additionalVaildWeaponOption.includes(secondOption) &&
              additionalVaildWeaponOption.includes(thirdOption);
            //유효옵션들 + 유효 옵션 수치인 경우
            if (isVaild && isPercent) {
              setIsThreeOption(true);
            }
          }
          // 에디에서 엠블렘 3유효 검증
          else if (itemInfo.parts === "emblem") {
            const additionalVaildEmblemOption = [
              // 주스탯에 따라 유효옵션 변경
              itemInfo.mainStat === "INT" ? "마력" : "공격력",
            ];
            const isVaild =
              additionalVaildEmblemOption.includes(firstOption) &&
              additionalVaildEmblemOption.includes(secondOption) &&
              additionalVaildEmblemOption.includes(thirdOption);
            if (isVaild && isPercent) {
              setIsThreeOption(true);
            }
          }
          // 에디에서 모자 3유효 검증
          else if (itemInfo.parts === "hat") {
            const potentialVaildHatOption = [
              "모든 스킬의 재사용 대기시간",
              //hp가 주스탯인 경우 올스탯 비활성화
              mainStatValue !== "최대 HP" ? "올스탯" : "",
              mainStatValue,
              itemInfo.mainStat === "INT" ? "마력" : "공격력",
              mainStatValue,
              // 주스탯이 올스탯인 경우 캐릭터 기준 9레벨 옵션 유효 아니니까 비워두기
              itemInfo.mainStat === "ALL"
                ? ""
                : "캐릭터 기준 9레벨 당 " + itemInfo.mainStat,
              itemInfo.mainStat === "ALL"
                ? ""
                : "캐릭터 기준 9레벨 당 " + itemInfo.mainStat,
            ].filter(Boolean);
            //유효옵션에 해당하면 true
            const isVaild =
              potentialVaildHatOption.includes(firstOption) &&
              potentialVaildHatOption.includes(secondOption) &&
              potentialVaildHatOption.includes(thirdOption);
            // 유효 옵션에 해당하는 경우 유효 수치 검증
            if (isVaild) {
              const isValidStats =
                firstOption &&
                (firstValue.endsWith("%") ||
                  firstOption === "모든 스킬의 재사용 대기시간" ||
                  firstOption.includes("캐릭터 기준 9레벨 당") ||
                  firstOption === "마력" ||
                  firstOption === "공격력") &&
                secondOption &&
                (secondValue.endsWith("%") ||
                  secondOption === "모든 스킬의 재사용 대기시간" ||
                  secondOption.includes("캐릭터 기준 9레벨 당") ||
                  secondOption === "마력" ||
                  secondOption === "공격력") &&
                thirdOption &&
                (thirdValue.endsWith("%") ||
                  thirdOption === "모든 스킬의 재사용 대기시간" ||
                  thirdOption.includes("캐릭터 기준 9레벨 당") ||
                  thirdOption === "마력" ||
                  thirdOption === "공격력");
              if (isValidStats) {
                setIsThreeOption(true);
              }
            }
          }
          // 에디에서 장갑 3유효 검증
          else if (itemInfo.parts === "gloves") {
            const additionalVaildGlovesOption = [
              "크리티컬 데미지",
              //hp가 주스탯인 경우 올스탯 비활성화
              mainStatValue !== "최대 HP" ? "올스탯" : "",
              itemInfo.mainStat === "INT" ? "마력" : "공격력",
              mainStatValue,
              // 주스탯이 올스탯인 경우 캐릭터 기준 9레벨 옵션 유효 아니니까 비워두기
              itemInfo.mainStat === "ALL"
                ? ""
                : "캐릭터 기준 9레벨 당 " + itemInfo.mainStat,
              itemInfo.mainStat === "ALL"
                ? ""
                : "캐릭터 기준 9레벨 당 " + itemInfo.mainStat,
            ].filter(Boolean);
            //유효옵션에 해당하면 true
            const isVaild =
              additionalVaildGlovesOption.includes(firstOption) &&
              additionalVaildGlovesOption.includes(secondOption) &&
              additionalVaildGlovesOption.includes(thirdOption);
            // 유효 옵션에 해당하는 경우 유효 수치 검증
            if (isVaild) {
              const isValidStats =
                firstOption &&
                (firstValue.endsWith("%") ||
                  firstOption === "모든 스킬의 재사용 대기시간" ||
                  firstOption.includes("캐릭터 기준 9레벨 당") ||
                  firstOption === "마력" ||
                  firstOption === "공격력") &&
                secondOption &&
                (secondValue.endsWith("%") ||
                  secondOption === "모든 스킬의 재사용 대기시간" ||
                  secondOption.includes("캐릭터 기준 9레벨 당") ||
                  secondOption === "마력" ||
                  secondOption === "공격력") &&
                thirdOption &&
                (thirdValue.endsWith("%") ||
                  thirdOption === "모든 스킬의 재사용 대기시간" ||
                  thirdOption.includes("캐릭터 기준 9레벨 당") ||
                  thirdOption === "마력" ||
                  thirdOption === "공격력");
              if (isValidStats) {
                setIsThreeOption(true);
              }
            }
          }
          //나머지 부위들 3유효 검증
          else {
            const additionalVaildOtherOption = [
              //hp가 주스탯인 경우 올스탯 비활성화
              mainStatValue !== "최대 HP" ? "올스탯" : "",
              mainStatValue,
              itemInfo.mainStat === "INT" ? "마력" : "공격력",
              // 주스탯이 올스탯인 경우 캐릭터 기준 9레벨 옵션 유효 아니니까 비워두기
              itemInfo.mainStat === "ALL"
                ? ""
                : "캐릭터 기준 9레벨 당 " + itemInfo.mainStat,
              itemInfo.mainStat === "ALL"
                ? ""
                : "캐릭터 기준 9레벨 당 " + itemInfo.mainStat,
            ].filter(Boolean);
            //유효 옵션에 해당하는 경우
            const isVaild =
              additionalVaildOtherOption.includes(firstOption) &&
              additionalVaildOtherOption.includes(secondOption) &&
              additionalVaildOtherOption.includes(thirdOption);
            if (isVaild) {
              const isValidStats =
                firstOption &&
                (firstValue.endsWith("%") ||
                  firstOption.includes("캐릭터 기준 9레벨 당") ||
                  firstOption.includes("마력") ||
                  firstOption.includes("공격력")) &&
                secondOption &&
                (secondValue.endsWith("%") ||
                  secondOption.includes("캐릭터 기준 9레벨 당") ||
                  secondOption.includes("마력") ||
                  secondOption.includes("공격력")) &&
                thirdOption &&
                (thirdValue.endsWith("%") ||
                  thirdOption.includes("캐릭터 기준 9레벨 당") ||
                  thirdOption.includes("마력") ||
                  thirdOption.includes("공격력"));
              if (isValidStats) {
                setIsThreeOption(true);
              }
            }
          }
        }
      }
    }
  }, [simulResultOption, setIsThreeOption]);
  useEffect(() => {
    if (isThreeOption) {
      //alert("축하합니다! 3줄 유효 옵션을 찾았습니다!");
    }
  }, [isThreeOption]);
  // 아이템 등급업 횟수 천장값 가져오기
  useEffect(() => {
    if (itemInfo.type && itemInfo.tier) {
      if (itemInfo.type === "potential") {
        if (itemInfo.tier === "legendary") {
          setCapValue(0);
        } else {
          setCapValue(pontentialCapValue[itemInfo.tier].count);
        }
      } else {
        if (itemInfo.tier === "legendary") {
          setCapValue(0);
        } else {
          setCapValue(additionalCapValue[itemInfo.tier].count);
        }
      }
    }
  }, [itemInfo.type, itemInfo.tier]);
  return (
    <div className="w-full h-full flex items-center">
      <div className="w-full h-full " id="cubeSimulator">
        {/*큐브 시뮬 타이틀*/}
        <div id="cube-title">
          <h1>CUBE SIMULATOR</h1>
        </div>
        {/* 큐브 본체 */}
        <div id="cube-body" className="flex flex-row">
          {/* 큐브 상단 */}
          <div id="cube-header">
            {itemInfo.type === "potential" ? (
              <img src="../img/blackCue.jpg" id="cubeImg" alt="큐브" />
            ) : (
              <img src="../img/AdditionalCube.jpg" id="cubeImg" alt="큐브" />
            )}
            <p>
              시뮬레이션 <span>아이템 정보</span>를 선택해주세요!
            </p>
          </div>
          <CubeSimulItemInfo
            setCubeCost={setCubeCost}
            itemInfo={itemInfo}
            setItemInfo={setItemInfo}
            simulCount={simulCount}
            setKoreanTier={setKoreanTier}
            setTierUpCount={resetTierUpCount}
            setSimulCount={setSimulCount}
            setCapValue={setCapValue}
          />
          {/* 장비 이미지 */}
          <div id="item-imageDv">
            {isTierUp.current && (
              <div className="tier-up-animation">TIER UP!</div>
            )}
            {itemInfo.parts && (
              <img src={`../img/${itemInfo.parts}.png`} alt="장비" />
            )}
          </div>
          {/* 결과 영역 애프터 */}
          <div id="cube-after">
            <div id="cube-after-info" className="h-[190px]">
              {/* 천장 카운트 표시 추후에 수정좀 해야함 !! */}
              <div className="flex flex-col gap-2 items-center justify-center">
                <span className="text-sm font-galmuri text-white">
                  {koreanTier === "레전드리"
                    ? "MAX"
                    : `천장 ${tierUpCount.current} / ${capValue || "0"}`}
                </span>
                <div className="bg-amber-300 w-full h-[3px]"></div>
              </div>
              <p className="cube-tier" id="after-cube-tier">
                {koreanTier}
              </p>

              <ul
                className="text-white flex gap-3 p-2 px-5 cube-stats"
                id="after-stats"
              >
                {simulResultOption.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            {/* 버튼 영역 */}
            <div id="cube-footer">
              <button
                onClick={handleCubeSimulClick}
                className="cube-button"
                id="oneMoreBtn"
              >
                잠재 능력 재설정
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CubeSimulatorInfo;
