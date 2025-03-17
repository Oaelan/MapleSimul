import { create } from "zustand";

const useCubeSimulItemInfoStore = create((set, get) => ({
  //시뮬할 아이템 정보를 담는
  itemInfo: {
    type: "potential",
    parts: "",
    level: "",
    tier: "",
    costRange: "1",
  },
  //CubeSimulItemInfo 컴포넌트에서 아이템 정보 선택시에 호출되는 함수
  setItemInfo: (name, value) =>
    set((state) => ({ itemInfo: { ...state.itemInfo, [name]: value } })),
  // 등급업 함수 추가
  upgradeTier: (nextTier) => {
    set((state) => ({
      itemInfo: { ...state.itemInfo, tier: nextTier },
    }));
  },
  //CubeSimulItemInfo 컴포넌트에서 아이템 정보 초기화시에 호출되는 함수
  initializeItemInfo: () =>
    set({
      itemInfo: {
        type: "potential",
        parts: "",
        level: "",
        tier: "",
        costRange: "1",
      },
    }),
  // 현재 아이템 정보 가져오기
  getCurrentItemInfo: () => get().itemInfo,
  //
}));

// 시뮬레이션 총 횟수 관리 state
const useAllcount = create((set) => ({
  Allcount: 0,
  increaseAllcount: () => set((state) => ({ Allcount: state.Allcount + 1 })),
  initializeAllcount: () => set({ Allcount: 0 }),
}));

//시뮬레이션 총 매소 관리 state
const useMeso = create((set) => ({
  meso: 0,
  calculateMeso: (cubeCost) => {
    console.log("cubeCost", cubeCost);
    set((state) => ({ meso: state.meso + cubeCost }));
  },
  initializeMeso: () => set({ meso: 0 }),
}));

//시뮬레이션 결과 옵션 3줄 관리 state
const useSimulResultOption = create((set) => ({
  simulResultOption: [],
  setSimulResultOption: (simulResultOption) =>
    set(() => ({
      simulResultOption: simulResultOption,
    })),
  initialize: () => set({ simulResultOption: [] }),
}));

//등급업한 이력 관리 state
const useTierUpHistory = create((set) => ({
  tierUpHistory: [],
  addTierUpHistory: (history) =>
    set((state) => ({
      tierUpHistory: [
        ...state.tierUpHistory,
        {
          text: history,
          timestamp: Date.now(),
        },
      ],
    })),
  initializeTierUpHistory: () => set({ tierUpHistory: [] }),
}));

// 3줄 유효 여부 관리 state
const useThreeOption = create((set) => ({
  isThreeOption: false,
  setIsThreeOption: (isThreeOption) => set({ isThreeOption }),
}));

export {
  useAllcount,
  useMeso,
  useSimulResultOption,
  useTierUpHistory,
  useThreeOption,
  useCubeSimulItemInfoStore,
};
