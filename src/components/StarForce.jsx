import StarForceSimulator1 from "./StarForceSimulator1";
import StarForceSimulator2 from "./StarForceSimulator2";
import React, { useState, useEffect } from "react";

function StarForce() {
  const [resultWindow, setResultWindow] = useState([]);

  return (
    <div
      className=" sm:border-2 sm:border-white/20 sm:rounded-lg sm:p-5
    sm:bg-gray-100/20"
    >
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-10">
        <StarForceSimulator1 setResultWindow={setResultWindow} />
        <StarForceSimulator2
          resultWindow={resultWindow}
          setResultWindow={setResultWindow}
        />
      </div>
    </div>
  );
  //<StarForceSimulator />
  // StarForceSimulator 스타포스 강화 창
}

export default StarForce;
