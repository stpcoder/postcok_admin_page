import React, { useState, useEffect } from 'react'
import mainLogo from './PoStocklogo.png';
import './totalSettingPage.css';
import totalLogo from './adminTotalLogo.png';
import { useNavigate } from 'react-router';


export default function TotalSettingPage() {
  const [sellMinute, setSellMinute] = useState(0);
  const [sellSecond, setSellSecond] = useState(0);
  const [solveMinute, setSolveMinute] = useState(0);
  const [solveSecond, setSolveSecond] = useState(0);
  const [buyMinute, setBuyMinute] = useState(0);
  const [buySecond, setBuySecond] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [turn, setTurn] = useState(1);
  const [gameType, setGameType] = useState(1);

  const navigate = useNavigate();
  const goMainPage = () => {
    navigate('/');
  }
  
  const startTimer = () => {
    if (!timerActive) setTimerActive(true);

  }

  const stopTimer = () => {
    if (timerActive) setTimerActive(false);

  }

  useEffect(() => {}, []);

  const onChangeTimer = (e) => {
    if (timerActive) return;
    switch ((Number(e.target.id) - Number(e.target.id) % 10)/10) {
      case 1 : 
        (Number(e.target.id) % 10) === 1 ? setSellMinute(Number(e.target.value)) : setSellSecond(Number(e.target.value));
        break;
      case 2 : 
        (Number(e.target.id) % 10) === 1 ? setSolveMinute(Number(e.target.value)) : setSolveSecond(Number(e.target.value));
        break;
      case 3 : 
        (Number(e.target.id) % 10) === 1 ? setBuyMinute(Number(e.target.value)) : setBuySecond(Number(e.target.value));
        break;
      default :
        return;
    }
  }

  return (
    <div>
      <div class="frame" id="n5_192">
        <div class="topbar" id="n5_193">
          <div id="n5_190">
            <img src={mainLogo} id="n5_195" alt="mainlogo"/>
          </div>
        </div>
        <div id="n5_191">
          <div class="group" id="n5_402">
            <img src={totalLogo} id="n5_401" alt="userLogo"/>
            <div id="n3_400">전체 설정</div>
          </div>
          <div id="n5_196">
              <div id="n5_198" onClick={stopTimer}>
                <div id="n5_199">정지</div>
              </div>
              <div id="n5_197" onClick={startTimer}>
                <div id="n5_200">시작</div>
              </div>
          </div>
        </div>
        <div id="n5_300">
          <div id="n5_304">
            <div id="n5_301">
              <div id="n5_305">
                <div id="n5_306">판매</div>
              </div>
              <div id="n5_307">
                {!timerActive ?
                  <input class="test" id="11" value={sellMinute} onChange={onChangeTimer}></input> :
                  <div id="n5_308">{sellMinute}</div> }
              </div>
              <div id="n5_309">
                <div id="n5_310">분</div>
              </div>
              <div id="n5_307">
                {!timerActive ? 
                  <input class="test" id="12" value={sellSecond} onChange={onChangeTimer}></input> :
                  <div id="n5_308">{sellSecond}</div> }
              </div>
              <div id="n5_309">
                <div id="n5_310">초</div>
              </div>
            </div>
            <div id="n5_302"> 
              <div id="n5_305">
                <div id="n5_306">문제풀이</div>
              </div>
              <div id="n5_307">
                {!timerActive ?
                  <input class="test" id="21" value={solveMinute} onChange={onChangeTimer}></input> :
                  <div id="n5_308">{solveMinute}</div> }
              </div>
              <div id="n5_309">
                <div id="n5_310">분</div>
              </div>
              <div id="n5_307">
                {!timerActive ?
                  <input class="test" id="22" value={solveSecond} onChange={onChangeTimer}></input> :
                  <div id="n5_308">{solveSecond}</div> }
              </div>
              <div id="n5_309">
                <div id="n5_310">초</div>
              </div>
            </div>
            <div id="n5_303">
              <div id="n5_305">
                <div id="n5_306">구매</div>
              </div>
              <div id="n5_307">
                {!timerActive ?
                  <input class="test" id="31" value={buyMinute} onChange={onChangeTimer}></input> :
                  <div id="n5_308">{buyMinute}</div> }
              </div>
              <div id="n5_309">
                <div id="n5_310">분</div>
              </div>
              <div id="n5_307">
                {!timerActive ?
                  <input class="test" id="32" value={buySecond} onChange={onChangeTimer}></input> :
                  <div id="n5_308">{buySecond}</div> }
              </div>
              <div id="n5_309">
                <div id="n5_310">초</div>
              </div>
            </div>
          </div>
        </div>
        <div id="n5_403">
          <div id="n5_406">
            <div id="n5_404">
              <div id="n5_407" class="turn1">
                <div id="n5_408">1턴</div>
              </div>
              <div id="n5_407" class="turn2">
                <div id="n5_408">2턴</div>
              </div>
              <div id="n5_407" class="turn3">
                <div id="n5_408">3턴</div>
              </div>
              <div id="n5_407" class="turn4">
                <div id="n5_408">4턴</div>
              </div>
              <div id="n5_407" class="turn5">
                <div id="n5_408">5턴</div>
              </div>
              <div id="n5_407" class="turn6">
                <div id="n5_408">6턴</div>
              </div>
              <div id="n5_407" class="turn7">
                <div id="n5_408">7턴</div>
              </div>
              <div id="n5_407" class="turn8">
                <div id="n5_408">8턴</div>
              </div>
              <div id="n5_407" class="turn9">
                <div id="n5_408">9턴</div>
              </div>
            </div>
            <div id="n5_405">

            </div>
          </div>
        </div>
        <div id="n5_462">
          <div id="n5_447" onClick={goMainPage}>
            <div id="n5_449">메인화면</div>
          </div>
        </div>
      </div>
    </div>
  )
}
