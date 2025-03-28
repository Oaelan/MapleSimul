import StarForceSimulator from "./StarForceSimulator";

function StarForceSimulator2({ resultWindow, setResultWindow }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center"
      id="cubeSimulator"
    >
      <div className="w-full flex-1 flex flex-col">
        <div id="cube-title">
          <span>SIMULATION RESULT</span>
        </div>
        <div id="cube-after" className="flex-1 flex flex-col">
          <div
            id="cube-after-info"
            className="font-galmuri items-center flex flex-col gap-10 flex-1 text-xs"
          >
            <div className="max-h-[350px] overflow-y-auto w-80 flex flex-col gap-2 amber-scrollbar text-white">
              {/* 여기에 강화 결과 넣기 */}
              {resultWindow
                .slice(0)
                .reverse()
                .map((a, i) => (
                  <div
                    key={i}
                    className={`p-1 rounded-md text-center ${
                      a.includes("실패")
                        ? "text-red-500"
                        : a.includes("성공")
                        ? "text-green-500"
                        : a.includes("파괴")
                        ? "text-yellow-700"
                        : "text-white"
                    }`}
                  >
                    {a}
                  </div>
                ))}
            </div>
          </div>
          <div id="cube-footer">
            <button
              className="cube-button"
              id="oneMoreBtn"
              onClick={() => {
                setResultWindow([]);
              }}
            >
              초기화
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StarForceSimulator2;
