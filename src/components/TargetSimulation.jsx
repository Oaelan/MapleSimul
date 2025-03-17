function TargetSimulation() {
  return (
    <div id="cube-before">
      <div className="titleAndOkBtn">
        <p id="cube-after-title">
          {" "}
          목표 <br /> 옵션 선택
        </p>
        <button className="cube-button confirm" id="afterOkBtn">
          확인
        </button>
      </div>
      <div id="cube-before-info">
        <select
          onChange={(e) => {
            setTargetTier(e.target.value);
          }}
          value={targetTier}
          className="cube-tier"
          id="before-cube-tier"
        >
          <option value="legendary">레전드리</option>
        </select>
        <div className="flex flex-col gap-2 p-2 font-galmuri">
          <select
            onChange={(e) => {
              setTargetOptions([
                e.target.value,
                targetOptions[1],
                targetOptions[2],
              ]);
            }}
            defaultValue="-"
            className="h-full firstOption select select-ghost select-sm"
          >
            {/*첫번째 줄*/}
            <option disabled value="-">
              -
            </option>
            {targetOptionList?.options?.firstOption?.map((option, index) => (
              <option key={index}>{option.option}</option>
            ))}
          </select>
          <select
            onChange={(e) => {
              setTargetOptions([
                targetOptions[0],
                e.target.value,
                targetOptions[2],
              ]);
            }}
            defaultValue="-"
            className="h-full secondOption select select-ghost select-sm"
          >
            {/*두번째 줄*/}
            <option disabled value="-">
              -
            </option>
            {targetOptionList?.options?.secondOption?.map((option, index) => (
              <option key={index}>{option.option}</option>
            ))}
          </select>
          <select
            onChange={(e) => {
              setTargetOptions([
                targetOptions[0],
                targetOptions[1],
                e.target.value,
              ]);
            }}
            defaultValue="-"
            className="h-full thirdOption select select-ghost select-sm"
          >
            {/*세번째 줄*/}
            <option disabled value="-">
              -
            </option>
            {targetOptionList?.options?.thirdOption?.map((option, index) => (
              <option key={index}>{option.option}</option>
            ))}
          </select>
        </div>
      </div>
      {/* 버튼 영역 */}
      <div id="cube-footer">
        <button
          onClick={handleTargetOptionsChange}
          className="cube-button"
          id="oneMoreBtn"
        >
          목표 결과 확인하기
        </button>
      </div>
    </div>
  );
}

export default TargetSimulation;
