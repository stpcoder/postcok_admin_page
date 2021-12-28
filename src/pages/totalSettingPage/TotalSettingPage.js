import React, { useState, useEffect } from 'react'
import './totalSettingPage.css';
import { logos } from 'utils/GetLogo';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { defaultAPI, groupCount } from 'utils/GetConstant';
import SellTradeLog from './SellLog';
import SolvingLog from './SolvingLog';
import PurchaseLog from './PurchaseLog';

const defaultTime = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0],];


export default function TotalSettingPage({ socket, turn, setTurn, price, groupNum }) {
  var tradeDataInterval;
  const groupData = [];
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
  const [tradeData, setTradeData] = useState([]);
  const [successData, setSuccessData] = useState([]);

  const getData = async (dataType) => {
    clearInterval(tradeDataInterval);
    if (dataType === 'solving') {
      var temp = [];
      for (var i = 0; i < groupNum; i++) {
        temp.push({
          id : i, solution : null
        });
      }
      setTradeData(temp);
      return;
    }

    var tradeData = await axios.get(defaultAPI + '/trade/all');
    tradeData = tradeData.data;
    tradeData.filter((element) => (element.type === dataType));
    tradeData.filter((element) => (element.turn === turn));
    setTradeData(tradeData);

    if (dataType === 'purchase') {
      var tempSuccessData = [];
      tradeData.forEach(async (oneElement) => {
        if (dataType === 'purchase') {
          var successData = await axios.get(defaultAPI + '/trade/success', oneElement.teamID, oneElement.turn, 'purchase');
          successData = successData ? successData.data : {teamID : oneElement.teamID};
          tempSuccessData.append(successData);
        }
      });
      setSuccessData(tempSuccessData);
    }
  }

  const sendMoney = async () => {
    const buttonList = document.getElementsByClassName('solvingInput');
    buttonList.forEach(async (element) => {
      var value = await axios.get(defaultAPI + '/teams/' + element.id + '/cash');
      value = value.data.count + element.value;
      await axios.put(defaultAPI + '/teams/' + element.id + '/cash', {cash : value});
    });
  }

  const navigate = useNavigate();
  const goMainPage = () => {
    navigate('/');
  }
  
  const startTimer = () => {
    if (!timerActive) {
      setTimerActive(true);
      const lastTime = sellMinute * 60 + sellSecond + buyMinute * 60 + buySecond + solveMinute * 60 + solveSecond;
      socket.on('gameStart', () => {
        socket.emit('gameStart', {lastTime});
      });
    } 
  }

  const stopTimer = () => {
    if (timerActive) {
      setTimerActive(false);
      const lastTime = sellMinute * 60 + sellSecond + buyMinute * 60 + buySecond + solveMinute * 60 + solveSecond;
      socket.on('gameStop', () => {
        socket.emit('gameStop', lastTime);
      });
    }
  }

  useEffect(() => {
    const gameTemp = gameType === 1 ? 'sell' : gameType === 2 ? 'buy' : 'solve';
    document.getElementsByClassName(gameTemp)[0].style.background = "#94A8D6";
    document.getElementsByClassName('turn' + localTurn)[0].style.background = "#94A8D6";
    getData('sale');
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
        getData('sale');
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
        getData('solving');
        if (solveSecond > 0) {
          setSolveSecond(solveSecond - 1);
        } else if (solveSecond === 0) {
          if (solveMinute === 0) {
            clearInterval(solveTimer);
            setGameType(3);
          } else {
            setSolveMinute(solveMinute - 1);
            setSolveSecond(59);
          }
        }
      }, 1000);
      return () => clearInterval(solveTimer);
    } else if (buyStart) {
      const buyTimer = setInterval(() => {
        getData('purchase');
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
            socket.on('nextTurn', () => {
              socket.emit('nextTurn', nextTurn);
            });
            socket.on('endPurchase', () => {
              socket.emit('endPurchase', true);
            });
            socket.on('gameStop', () => {
              socket.emit('gameStop', 0);
            });
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
              {(gameType === 1) && <SellTradeLog sellData={tradeData}/>}
              {(gameType === 2) && <SolvingLog groupData={groupData}/>}
              {(gameType === 2) && <button id="n5_447" onClick={sendMoney}><div id="n5_449">보내기</div></button>}
              {(gameType === 3) && <PurchaseLog sellData={tradeData} successData={successData}/>}
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

