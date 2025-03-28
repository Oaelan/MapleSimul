import StarForceSimulator from "./StarForceSimulator";

function StarForceSimulator1({ setResultWindow }) {
  return (
    <div className="w-full h-full flex items-center">
      <div className="w-full h-full" id="cubeSimulator">
        {/* 큐브 시뮬 타이틀 */}
        <div id="cube-title">
          <span>STARFORCE SIMULATOR</span>
        </div>
        {/* 큐브 본체 */}
        <div id="cube-body" className="flex flex-row">
          <StarForceSimulator setResultWindow={setResultWindow} />
          <></>
        </div>
      </div>
    </div>
  );
}

export default StarForceSimulator1;
