import React from 'react'
import { useNavigate } from 'react-router';
import './mainpage.css';
import mainLogo from './PoStocklogo.png';

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
          <div class="topbar-background" id="n1_190">
            <img src={mainLogo} id="n1_195" alt="logo"/>
          </div>
        </div>
        <div id='n1_200'>
          <div class="initial setting total" id="n1_197">
            <div class="initial setting text" id="n1_198">초기 설정</div>
            <div class="initial setting content" id="n1_199">
              <div class="stock info change box" onClick={goStockPage} id="n1_201">
                <div class="stock info" id="n1_203"></div>
                <div class="stock info change text" id="n1_202">주식 정보 수정</div>
              </div>
              <div class="left top rectangle" onClick={goUserInfo} id="n1_205">
                <div class="left top rectangle" id="n1_207"></div>
                <div class="left top text" id="n1_206">참가자 정보 수정</div>
              </div>
            </div>
          </div>

          <div class="left top rectangle" id="n1_209">
            <div class="left top text" id="n1_210">진행 중 조작 사항</div>
            <div class="left top rectangle" id="n1_211">
              <div class="left top rectangle" onClick={goCurrent} id="n1_213">
                <div class="left top rectangle" id="n1_215"></div>
                <div class="left top text" id="n1_214">현재 상황</div>
              </div>
              <div class="left top rectangle" onClick={goTotal} id="n1_217">
                <div class="left top rectangle" id="n1_219"></div>
                <div class="left top text" id="n1_218">전체 설정</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}