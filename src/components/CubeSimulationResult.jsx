import {
  useAllcount,
  useMeso,
  useTierUpHistory,
  useSimulResultOption,
} from "../store";
function CubeSimulationResult() {
  const Allcount = useAllcount((state) => state.Allcount);
  const meso = useMeso((state) => state.meso);
  const initializeAllcount = useAllcount((state) => state.initializeAllcount);
  const initializeMeso = useMeso((state) => state.initializeMeso);
  const tierUpHistory = useTierUpHistory((state) => state.tierUpHistory);
  const optionHistory = useSimulResultOption((state) => state.optionHistory);
  const initializeTierUpHistory = useTierUpHistory(
    (state) => state.initializeTierUpHistory
  );

  const initializeOptionHistory = useSimulResultOption(
    (state) => state.initializeOptionHistory
  );
  //옵션 히스토리 색깔 변경
  const getOptions = (option) => {
    // 고정된 클래스 이름 사용
    if (option.includes("STR")) return "text-red-500";
    if (option.includes("DEX")) return "text-green-500";
    if (option.includes("INT")) return "text-blue-500";
    if (option.includes("LUK")) return "text-yellow-500";
    if (option.includes("최대 HP")) return "text-secondary";
    if (option.includes("올스탯")) return "text-purple-500";
    if (option.includes("보스 몬스터 공격 시 데미지")) return "text-orange-500";
    if (option.includes("몬스터 방어율 무시")) return "text-orange-500";
    if (option.includes("크리티컬 확률")) return "text-orange-500";
    if (option.includes("마력")) return "text-sky-300";
    if (option.includes("공격력")) return "text-rose-300";
    if (option.includes("크리티컬 데미지")) return "text-amber-300";
    if (option.includes("모든 스킬의 재사용 대기시간")) return "text-cyan-300";
    if (option.includes("아이템 드롭률")) return "text-amber-500";
    if (option.includes("메소 획득량")) return "text-amber-400";
    return "text-gray-300";
  };

  return (
    <article className="flex flex-col gap-9 h-full">
      <div className="h-full" id="cubeSimulator">
        {/*큐브 시뮬 타이틀*/}
        <div id="cube-title">
          <span>SIMULATION RESULT</span>
        </div>
        {/* 큐브 본체 */}
        <div id="cube-body" className="h-full">
          {/* 큐브 상단 */}
          <div id="cube-header" className="flex flex-col gap-2 font-galmuri">
            <div className="w-full p-2 flex items-center">
              사용된 총 메소 :
              <span className="text-yellow-500 ">
                &nbsp;{meso.toLocaleString("kr")}
              </span>
            </div>
            <div className="w-full p-2 flex items-center">
              총 재설정 횟수 :
              <span className="text-yellow-500">&nbsp;{Allcount}</span>
            </div>
          </div>

          {/* 결과 영역 애프터 */}
          <div id="cube-after" className="h-full">
            <div
              id="cube-after-info"
              className="font-galmuri items-center flex flex-col gap-10 h-full text-xs"
            >
              <div className="max-h-[250px] min-h-[250px] sm:max-h-[550px] sm:min-h-[550px] overflow-y-auto w-full flex flex-col gap-2 amber-scrollbar">
                {[
                  ...tierUpHistory.map((item) => ({
                    ...item,
                    timestamp: item.timestamp - 1,
                  })),
                  ...optionHistory,
                ]
                  .sort((a, b) => b.timestamp - a.timestamp)
                  .map((item, index) => (
                    <div
                      className={`flex w-full p-2 gap-2 ${
                        item.result
                          ? "bg-slate-800/90 border border-cyan-500/30" // 옵션 결과
                          : "bg-yellow-500/30 border border-amber-500/30 text-yellow-500" // 등급업 결과
                      }`}
                      key={index}
                    >
                      {item.result
                        ? // 옵션 히스토리인 경우
                          item.result.map((option, idx) => (
                            <span className={`${getOptions(option)}`} key={idx}>
                              {option}
                            </span>
                          ))
                        : // 등급업 히스토리인 경우
                          item.text.toUpperCase()}
                    </div>
                  ))}
              </div>
            </div>
            {/* 버튼 영역 */}
            <div id="cube-footer">
              <button
                className="cube-button"
                id="oneMoreBtn"
                onClick={() => {
                  //총 시뮬 횟수 초기화
                  initializeAllcount();
                  //총 메소 초기화
                  initializeMeso();
                  //등급업 히스토리 초기화
                  initializeTierUpHistory();
                  //옵션 히스토리 초기화
                  initializeOptionHistory();
                }}
              >
                초기화
              </button>
            </div>
          </div>
          {/* 딸깍으로 원하는 값 시뮬레이션 하기 */}
        </div>
      </div>
    </article>
  );
}

export default CubeSimulationResult;
