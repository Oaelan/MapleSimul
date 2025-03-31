import StarForceSimulator from "./StarForceSimulator";

function StarForceSimulator1({ setResultWindow }) {
  return (
    <>
      <div className="">
        <div className="">
          <div className="" id="cubeSimulator">
            <div id="cube-title">
              <span>STARFORCE SIMULATOR</span>
            </div>
            <div id="cube-body" className="">
              <StarForceSimulator setResultWindow={setResultWindow} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StarForceSimulator1;
