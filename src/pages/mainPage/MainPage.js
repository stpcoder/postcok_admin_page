import React from 'react'
import { useNavigate } from 'react-router';
import './mainPage.css';
import { logos } from 'utils/GetLogo';

export default function MainPage() {
  const navigate = useNavigate();
  const goStockPage = () => {
    navigate('/stockSetting');
  }

  const goUserInfo = () => {
    navigate('/userInfo');
  }

  const goCurrent = () => {
    navigate('/currentState');
  }

  const goTotal = () => {
    navigate('/totalSetting');
  }

  return (
    <div>
      <div class="mainpage" id="n1_192">
        <div class="topbar" id="n1_193">
          <div id="n1_190">
            <img src={logos.mainLogo} id="n1_195" alt="mainlogo"/>
          </div>
        </div>
        <div id="n1_200">
          <div id="n1_197">
            <div id="n1_198">초기 설정</div>
            <div id="n1_199">
              <div onClick={goStockPage} id="n1_201">
                <img src={logos.stockLogo} id="n1_203" alt="stockLogo"/>
                <div id="n1_202">주식 정보 수정</div>
              </div>
              <div onClick={goUserInfo} id="n1_205">
                <img src={logos.userLogo} alt="userLogo" id="n1_207"/>
                <div id="n1_206">참가자 정보 수정</div>
              </div>
            </div>
          </div>

          <div id="n1_209">
            <div id="n1_210">진행 중 조작 사항</div>
            <div id="n1_211">
              <div onClick={goCurrent} id="n1_213">
                <img src={logos.currentLogo} id="n1_215" alt="currentLogo"/>
                <div id="n1_214">현재 상황</div>
              </div>
              <div onClick={goTotal} id="n1_217">
                <img src={logos.totalLogo} id="n1_219" alt="totalLogo"/>
                <div id="n1_218">전체 설정</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}