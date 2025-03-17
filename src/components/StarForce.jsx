import React from 'react';
import '../App.css';

function StarForce() {
  const closePopup = () => {
    document.getElementById('popup').classList.add('hidden');
  };

  const printStarForce = (e) => {
    console.log('Star Force input changed:', e.target.value);
  };

  const starCatch_Checkbox = (checkbox) => {
    console.log('스타캐치 체크:', checkbox.checked);
  };

  const starBreakPrevention_Checkbox = (checkbox) => {
    console.log('파괴방지 체크:', checkbox.checked);
  };

  const enhanceBtn = () => {
    console.log('강화 버튼 클릭됨');
  };

  const resetStarForce = () => {
    console.log('초기화 버튼 클릭됨');
  };

  return (
    <>
      <div className="popup-overlay hidden" id="popup">
        <div className="popup-container">
          <div className="popup-content">
            <div className="item-row">
              <img src="/sword.png" alt="Item Icon" className="item-icon" />
              <span className="arrow">&gt;</span>
              <img src="/sword.png" alt="Item Icon" className="item-icon" />
            </div>
            <div className="popup">
              <p className="popup-message"></p>
            </div>
            <button className="confirm-btn" onClick={closePopup}>확인</button>
          </div>
        </div>
      </div>

      <div className="container">
        <p className="top-text">스타포스 강화</p>
        <div className="equipment-enchant">
          <div className="tabs">
            <button className="tab">주문서</button>
            <button className="tab active">스타포스 강화</button>
            <button className="tab">장비전승</button>
          </div>

          <p className="description">메소를 사용하여 장비를 강화합니다.</p>

          <div className="enchant-content">
            <div className="item-info">
              <img src="/sword.png" alt="Item Icon" className="item-icon" />
              <div id="star-info"></div>
              <p>성공확률: <span className="success-rate" id="starForce_Probability">95.0%</span></p>
              <p>실패(유지)확률: <span className="fail-rate" id="starForcefail_Probability">5.0%</span></p>
              <div id="starForcebreak_robability"></div>
            </div>

            <div className="options">
              <div className="checkbox-option">
                <input type="checkbox" id="starForce_Catch" onClick={(e) => starCatch_Checkbox(e.target)} defaultChecked />
                <label htmlFor="starForce_Catch">스타캐치 확률 업!</label>
              </div>
              <div className="checkbox-option">
                <input type="checkbox" id="starBreak_prevention" onClick={(e) => starBreakPrevention_Checkbox(e.target)} disabled />
                <label htmlFor="starBreak_prevention">파괴방지</label>
              </div>
            </div>

            <div className="cost">
              <p>필요한 메소: <span className="cost-value" id="starForce_cost">0</span></p>
              <p>사용한 메소: <span className="cost-value" id="starForce_totalCost">0</span></p>
            </div>

            <div className="buttons">
              <button className="enhance-btn" onClick={enhanceBtn}>강화</button>
              <button className="enhance-btn2" onClick={resetStarForce}>초기화(1성 시작)</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default StarForce;
