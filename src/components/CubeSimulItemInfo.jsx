/* eslint-disable react/prop-types */
import { useSimulResultOption, useCubeSimulItemInfoStore } from "../store";

function CubeSimulItemInfo({
  //itemInfo,
  //setItemInfo,
  setKoreanTier,
  setTierUpCount,
  setSimulCount,
  simulCount,
  setCubeCost,
  setCapValue,
}) {
  // 아이템 정보 상태
  const itemInfo = useCubeSimulItemInfoStore((state) => state.itemInfo);
  // 아이템 정보 설정 함수
  const setItemInfo = useCubeSimulItemInfoStore((state) => state.setItemInfo);
  // 아이템 정보 초기화 함수
  const initializeItemInfos = useCubeSimulItemInfoStore(
    (state) => state.initializeItemInfo
  );
  const handleChangeSelect = (e) => {
    const { name, value } = e.target;
    //setItemInfo({ ...itemInfo, [name]: value });
    setItemInfo(name, value);
  };
  const itemRange = [
    { weapon: ["100", "110", "111_119", "120_200"] },
    { emblem: ["100", "120_200"] },
    { subWeapon: ["100", "110", "120_200"] },
    { subWeaponForceShieldAndSoulRing: ["100", "110"] },
    { shield: ["100", "110", "120_200"] },
    { hat: ["100", "110", "111_119", "120_200", "201_250"] },
    { top: ["100", "110", "111_119", "120_200", "201_250"] },
    { pants: ["100", "120_200", "201_250"] },
    { shoes: ["100", "110", "111_119", "120_200", "201_250"] },
    { gloves: ["100", "110", "111_119", "120_200", "201_250"] },
    { cape: ["100", "110", "111_119", "120_200", "201_250"] },
    { belt: ["100", "110", "111_119", "120_200"] },
    { shoulder: ["100", "110", "120_200", "201_250"] },
    { faceAcce: ["100", "110", "111_119", "120_200"] },
    { eyesAcce: ["100", "111_119", "120_200"] },
    { earring: ["100", "110", "111_119", "120_200"] },
    { ring: ["100", "110", "120_200", "201_250"] },
    { pendant: ["100", "110", "111_119", "120_200"] },
    { machineHeart: ["100", "120_200"] },
    { onepiece: ["100", "110", "111_119", "120_200"] },
  ];
  // 초기화 버튼 누를시에 옵션 값들도 초기화
  const initialize = useSimulResultOption((state) => state.initialize);
  return (
    <div>
      {/* 부위, 레벨, 큐브 등급 */}
      <div className="font-galmuri flex flex-col items-center gap-5 p-5">
        {/* 장비 부위 */}
        <select
          name="parts"
          value={itemInfo.parts}
          disabled={simulCount > 0}
          onChange={handleChangeSelect}
          className="text-center w-full h-5 select-sm select select-ghost"
        >
          <option value="" disabled={true}>
            장비
          </option>
          <option value="weapon">무기</option>
          <option value="emblem">엠블렘</option>
          <option value="subWeapon">보조무기(포스실드, 소울링 제외)</option>
          <option value="subWeaponForceShieldAndSoulRing">
            포스실드, 소울링
          </option>
          <option value="shield">방패</option>
          <option value="hat">모자</option>
          <option value="top">상의</option>
          <option value="onepiece">한벌옷</option>
          <option value="pants">하의</option>
          <option value="shoes">신발</option>
          <option value="gloves">장갑</option>
          <option value="cape">망토</option>
          <option value="belt">벨트</option>
          <option value="shoulder">어깨장식</option>
          <option value="faceAcce">얼굴장식</option>
          <option value="eyesAcce">눈장식</option>
          <option value="earring">귀고리</option>
          <option value="ring">반지</option>
          <option value="pendant">펜던트</option>
          <option value="machineHeart">기계심장</option>
        </select>
        {/* 아이템 레벨 , 큐브 등급*/}
        <div className="grid grid-cols-3 gap-2 w-full justify-center items-center">
          {/* 아이템 레벨 */}
          <select
            disabled={simulCount > 0}
            value={itemInfo.level}
            name="level"
            onChange={handleChangeSelect}
            className="text-center w-full h-5 select-sm select select-ghost"
          >
            <option disabled={true} value="">
              레벨
            </option>
            {itemRange
              .find((item) => itemInfo.parts in item) // 객체에 해당 키가 있는지 확인
              ?.[
                // 해당 키의 값을 배열로 가져와서 옵션 요소 만들기
                itemInfo.parts
              ]?.map((levelValue) => (
                <option key={levelValue} value={levelValue}>
                  {levelValue}
                </option>
              )) || null}
          </select>
          {/* 큐브 등급 */}
          <select
            disabled={simulCount > 0}
            value={itemInfo.tier}
            name="tier"
            onChange={handleChangeSelect}
            className="text-center w-full h-5 select-sm select select-ghost"
          >
            <option value="" disabled={true}>
              등급
            </option>
            <option value="rare">레어</option>
            <option value="epic">에픽</option>
            <option value="unique">유니크</option>
            <option value="legendary">레전드리</option>
          </select>
          {/* 초기화 버튼 */}
          <button
            onClick={() => {
              // 아이템 정보 초기화
              initializeItemInfos();
              setTierUpCount(0);
              setSimulCount(0);
              setKoreanTier("-");
              initialize();
              setCubeCost(0);
              setCapValue(0);
            }}
            className="h-fit btn btn-sm btn-soft btn-error"
          >
            초기화
          </button>
        </div>
      </div>
      {/*옵션 타입*/}
      <div id="cubeSimulEquiPartsDiv">
        {/* 잠재/에디 체크박스 요소 */}
        <div id="cubeSimulType">
          <label id="cubeSimulTypePot">
            <input
              disabled={simulCount > 0}
              type="radio"
              name="type"
              value="potential"
              checked={itemInfo.type === "potential"}
              onChange={handleChangeSelect}
            />
            잠재
          </label>
          <label id="cubeSimulTypeAddi">
            <input
              disabled={simulCount > 0}
              type="radio"
              name="type"
              value="additional"
              checked={itemInfo.type === "additional"}
              onChange={handleChangeSelect}
            />
            에디
          </label>
        </div>
      </div>
      <div className="mt-4 mb-4 w-full" id="cube-header">
        <span className="text-green-200"> 잠재 비용</span> 설정을 해주세요!
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-2 items-center justify-center">
        <div className="flex flex-col gap-2 justify-center items-center">
          <label className=" shadow-md px-5 py-1 radio-span bg-blue-200">
            1~159
          </label>
          <input
            type="radio"
            name="costRange"
            value="1"
            onChange={handleChangeSelect}
            checked={itemInfo.costRange === "1"}
            disabled={simulCount > 0}
          />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <label className="shadow-md px-5 py-1 radio-span bg-purple-200">
            160~199
          </label>
          <input
            type="radio"
            name="costRange"
            value="160"
            onChange={handleChangeSelect}
            checked={itemInfo.costRange === "160"}
            disabled={simulCount > 0}
          />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <label className="shadow-md px-5 py-1 radio-span bg-yellow-200">
            200~249
          </label>
          <input
            type="radio"
            name="costRange"
            value="200"
            onChange={handleChangeSelect}
            checked={itemInfo.costRange === "200"}
            disabled={simulCount > 0}
          />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <label className="shadow-md px-5 py-1 radio-span bg-green-200">
            250~300
          </label>
          <input
            type="radio"
            name="costRange"
            value="250"
            onChange={handleChangeSelect}
            checked={itemInfo.costRange === "250"}
            disabled={simulCount > 0}
          />
        </div>
      </div>
    </div>
  );
}

export default CubeSimulItemInfo;
