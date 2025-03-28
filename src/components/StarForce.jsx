import StarForceSimulator1 from "./StarForceSimulator1";
import StarForceSimulator2 from "./StarForceSimulator2";
import React, { useState, useEffect } from "react";

function StarForce() {
  const [resultWindow, setResultWindow] = useState([]);

  return (
    <div className="w-full h-full grid grid-cols-2 gap-10">
      <StarForceSimulator1 setResultWindow={setResultWindow} />
      <StarForceSimulator2
        resultWindow={resultWindow}
        setResultWindow={setResultWindow}
      />
    </div>
  );
  //<StarForceSimulator />
  // StarForceSimulator 스타포스 강화 창
}

export default StarForce;
