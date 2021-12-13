import React, { useState, useEffect } from 'react'
import './totalSettingPage.css';
import { logos } from 'utils/GetLogo';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { defaultAPI } from 'utils/GetConstant';

function SellTradeRow({groupTradeData}) {
  const outputText = '생명 ' + groupTradeData.bio + '주, 전자 ' + groupTradeData.electronics + '주, 건축 ' + groupTradeData.construction + '주, 방송 ' + groupTradeData.broadcast + '주, 식풍 ' + groupTradeData.food;
  return (
    <>
      <tbody>
        <tr>
          <td class="n5_1_tg-0pky">{groupTradeData.teamID  + '조'}</td>
          <td class="n5_1_tg-0pky">{outputText}</td>
        </tr>
      </tbody>
    </>
  )
}

function SellTradeLog({sellData}) {
  return (
    <>
      <table class="n5_1_tg">
      <thead>
        <tr>
          <th class="n5_1_tg-7btt">조 이름</th>
          <th class="n5_1_tg-7btt">판매 정보</th>
        </tr>
      </thead>
        {sellData.map((oneData) => (
          <SellTradeRow groupTradeData={oneData}/>
        ))}
      </table>
    </>
  )
}




const defaultTime = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0],];

export default function TotalSettingPage({ turn, setTurn, price }) {
  const [sellMinute, setSellMinute] = useState(0);
  const [sellSecond, setSellSecond] = useState(0);
  const [solveMinute, setSolveMinute] = useState(0);
  const [solveSecond, setSolveSecond] = useState(0);
  const [buyMinute, setBuyMinute] = useState(0);
  const [buySecond, setBuySecond] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [sellStart, setSellStart] = useState(false);
  const [solveStart, setSolveStart] = useState(false);
  const [buyStart, setBuyStart] = useState(false);
  const [localTurn, setLocalTurn] = useState(turn);
  const [gameType, setGameType] = useState(1);
  const [sellData, setSellData] = useState([]);

  const getData = async (dataType) => {
    const tradeData = await axios.get(defaultAPI + '/all').data;
    
    if (dataType === 'sell') {
      
    }
  }

  const timeUpdate = (turnNum) => {
    setSellMinute(defaultTime[turnNum - 1][0]);
    setSellSecond(defaultTime[turnNum - 1][1]);
    setSolveMinute(defaultTime[turnNum - 1][2]);
    setSolveSecond(defaultTime[turnNum - 1][3]);
    setBuyMinute(defaultTime[turnNum - 1][4]);
    setBuySecond(defaultTime[turnNum - 1][5]);
  }

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

  useEffect(() => {
    const gameTemp = gameType === 1 ? 'sell' : gameType === 2 ? 'buy' : 'solve';
    document.getElementsByClassName(gameTemp)[0].style.background = "#94A8D6";
    document.getElementsByClassName('turn' + localTurn)[0].style.background = "#94A8D6";

  }, []);

  useEffect(() => {
    const start = timerActive ? true : false;
    switch(gameType) {
      case 1:
        setSellStart(start);
        break;
      case 2:
        setSolveStart(start);
        break;
      case 3:
        setBuyStart(start);
        break;
      default:
        break;
    }
  }, [timerActive]);

  useEffect(() => {
    switch(gameType) {
      case 1:
        document.getElementsByClassName('buy')[0].style.background = "white";
        document.getElementsByClassName('sell')[0].style.background = "#94A8D6";
        setBuyStart(false);
        break;

      case 2:
        document.getElementsByClassName('sell')[0].style.background = "white";
        document.getElementsByClassName('solve')[0].style.background = "#94A8D6";
        setSellStart(false);
        setSolveStart(true);
        break;

      case 3:
        document.getElementsByClassName('solve')[0].style.background = "white";
        document.getElementsByClassName('buy')[0].style.background = "#94A8D6";
        setSolveStart(false);
        setBuyStart(true);
        break;

      default:
        return;
    }
  }, [gameType]);

  useEffect(() => {
    if (sellStart) {
      const sellTimer = setInterval(() => {
        if (sellSecond > 0) {
          setSellSecond(sellSecond - 1);
        } else if (sellSecond === 0) {
          if (sellMinute === 0) {
            clearInterval(sellTimer);
            setGameType(2);
          } else {
            setSellMinute(sellMinute - 1);
            setSellSecond(59);
          }
        }
      }, 1000);
      return () => clearInterval(sellTimer);
    } else if (solveStart) {
      const solveTimer = setInterval(() => {
        if (solveSecond > 0) {
          setSolveSecond(solveSecond - 1);
        } else if (solveSecond === 0) {
          if (solveMinute === 0) {
            clearInterval(solveTimer);
            setGameType(3);
          } else {
            setSolveMinute(solveMinute - 1);
            setSolveMinute(59);
          }
        }
      }, 1000);
      return () => clearInterval(solveTimer);
    } else if (buyStart) {
      const buyTimer = setInterval(() => {
        if (buySecond > 0) {
          setBuySecond(buySecond - 1);
        } else if (buySecond === 0) {
          if (buyMinute === 0) {
            clearInterval(buyTimer);
            setGameType(1);
            setTimerActive(false);
            const nextTurn = localTurn === 9 ? 1 : localTurn + 1;
            setLocalTurn(nextTurn);
            setTurn(nextTurn);
            document.getElementsByClassName('turn' + localTurn)[0].style.background = "white";
            document.getElementsByClassName('turn' + nextTurn)[0].style.background = "#94A8D6";
          } else {
            setBuyMinute(buyMinute - 1);
            setBuySecond(59);
          }
        }
      }, 1000);
      return () => clearInterval(buyTimer);
    }
  }, [sellStart, solveStart, buyStart, sellSecond, sellMinute, solveSecond, solveMinute, buySecond, buyMinute]);

  const onChangeTimer = (e) => {
    if (timerActive) return;
    switch ((Number(e.target.id) - Number(e.target.id) % 10)/10) {
      case 1 : 
        (Number(e.target.id) % 10) === 1 ? setSellMinute(Number(e.target.value)) : setSellSecond(Number(e.target.value));
        if ((Number(e.target.id) % 10) === 1) {
          defaultTime[localTurn - 1][0] = Number(e.target.id);
        } else {
          defaultTime[localTurn - 1][1] = Number(e.target.id);
        }
        break;

      case 2 : 
        (Number(e.target.id) % 10) === 1 ? setSolveMinute(Number(e.target.value)) : setSolveSecond(Number(e.target.value));
        if ((Number(e.target.id) % 10) === 1) {
          defaultTime[localTurn - 1][2] = Number(e.target.id);
        } else {
          defaultTime[localTurn - 1][3] = Number(e.target.id);
        }
        break;

      case 3 : 
        (Number(e.target.id) % 10) === 1 ? setBuyMinute(Number(e.target.value)) : setBuySecond(Number(e.target.value));
        if ((Number(e.target.id) % 10) === 1) {
          defaultTime[localTurn - 1][4] = Number(e.target.id);
        } else {
          defaultTime[localTurn - 1][5] = Number(e.target.id);
        }
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
            <img src={logos.mainLogo} id="n5_195" alt="mainlogo"/>
          </div>
        </div>
        <div id="n5_191">
          <div class="group" id="n5_402">
            <img src={logos.totalLogo} id="n5_401" alt="userLogo"/>
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
              <div class="sell" id="n5_305">
                <div id="n5_306">판매</div>
              </div>
              <div id="n5_307">
                {!timerActive ?
                  <input class="test" id="11" value={sellMinute} onChange={onChangeTimer} type="number"></input> :
                  <div id="n5_308">{sellMinute}</div> }
              </div>
              <div id="n5_309">
                <div id="n5_310">분</div>
              </div>
              <div id="n5_307">
                {!timerActive ? 
                  <input class="test" id="12" value={sellSecond} onChange={onChangeTimer} type="number"></input> :
                  <div id="n5_308">{sellSecond}</div> }
              </div>
              <div id="n5_309">
                <div id="n5_310">초</div>
              </div>
            </div>
            <div id="n5_302"> 
              <div class="solve" id="n5_305">
                <div id="n5_306">문제풀이</div>
              </div>
              <div id="n5_307">
                {!timerActive ?
                  <input class="test" id="21" value={solveMinute} onChange={onChangeTimer} type="number"></input> :
                  <div id="n5_308">{solveMinute}</div> }
              </div>
              <div id="n5_309">
                <div id="n5_310">분</div>
              </div>
              <div id="n5_307">
                {!timerActive ?
                  <input class="test" id="22" value={solveSecond} onChange={onChangeTimer} type="number"></input> :
                  <div id="n5_308">{solveSecond}</div> }
              </div>
              <div id="n5_309">
                <div id="n5_310">초</div>
              </div>
            </div>
            <div id="n5_303">
              <div class="buy" id="n5_305">
                <div id="n5_306">구매</div>
              </div>
              <div id="n5_307">
                {!timerActive ?
                  <input class="test" id="31" value={buyMinute} onChange={onChangeTimer} type="number"></input> :
                  <div id="n5_308">{buyMinute}</div> }
              </div>
              <div id="n5_309">
                <div id="n5_310">분</div>
              </div>
              <div id="n5_307">
                {!timerActive ?
                  <input class="test" id="32" value={buySecond} onChange={onChangeTimer} type="number"></input> :
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
