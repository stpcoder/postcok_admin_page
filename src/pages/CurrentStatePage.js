import React from 'react'
import mainLogo from './PoStocklogo.png';
import './currentStatePage.css';
import currentLogo from './adminCurrentLogo.png';
import { useNavigate } from 'react-router';

export default function CurrentStatePage({ groupNumber }) {
  const navigate = useNavigate();
  const goMainPage = () => {
    navigate('/');
  }


  return (
    <div>
      <div class="frame" id="n4_192">
        <div class="topbar" id="n4_193">
          <div id="n4_190">
            <img src={mainLogo} id="n4_195" alt="mainlogo"/>
          </div>
        </div>
        <div class="group" id="n4_402">
          <img src={currentLogo} id="n4_401" alt="userLogo"/>
          <div id="n3_400">현재 상황</div>
        </div>
        <div id="n4_403">
          <div id="n4_404">
            table
          </div>
        </div>
        <div id="n4_462">
          <div id="n4_447" onClick={goMainPage}>
            <div id="n4_449">메인화면</div>
          </div>
        </div>
      </div>
    </div>
  )
}