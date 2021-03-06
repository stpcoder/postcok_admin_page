import React, { useState, useEffect, useRef } from 'react'
import './totalSettingPage.css';
import { logos } from 'utils/GetLogo';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { defaultAPI, groupCount } from 'utils/GetConstant';
import SellTradeLog from './SellLog';
import SolvingLog from './SolvingLog';
import PurchaseLog from './PurchaseLog';
import TempLog from './TempLog';
const { setIntervalAsync } = require('set-interval-async/dynamic');
const { clearIntervalAsync } = require('set-interval-async');

const defaultTime = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0],];

export default function TotalSettingPage({ socket, turn, setTurn, price }) {
  var tradeDataInterval;
  var groupNum;
  var tempTrade = [];
  var tempPurchase = [];
  var tempAnswerList = [];
  var tempSuccess = [];
  const logData = [];
  const groupData = [];
  const tempTurn = useRef(1);
  const dataType = useRef('sale');
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
  const [localTurn, setLocalTurn] = useState(1);
  const [gameType, setGameType] = useState(1);
  const [tradeData, setTradeData] = useState([]);
  const [successData, setSuccessData] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const [purchaseList, setPurchaseList] = useState([]);
  const [init, setInit] = useState(true);
  const [defaultTimer, setDefaultTime] = useState([]);

  const makeInterval = async () => {
    var checkturn = tempTurn.current;
    console.log('???' + tempTurn.current + '??????' + dataType.current);
    if (dataType.current === 'sale') {
      var tradeDataList = await axios.get(defaultAPI + '/trade/all');
      tradeDataList = tradeDataList.data;
      var tempTradeData = tempTrade;
      tradeDataList.forEach((element1) => {
        if (element1.tradeType === 'sale') {
          if (element1.turn === tempTurn.current) {
            tempTradeData.forEach((element2) => {
              if (element1.teamId === element2.teamId) {
                element2.bio = element1.bio;
                element2.construction = element1.construction;
                element2.broadcast = element1.broadcast;
                element2.food = element1.food;
                element2.electronics = element1.electronics;
                setTradeData(tempTradeData);
                console.log(tempTradeData);
                tempTrade = tempTradeData;
              }
            });
            console.log(tempTradeData);
          }
        }
      });
    }
  
    if (dataType.current === 'purchase') {
      var i = 1;
      var tradeDataList = await axios.get(defaultAPI + '/trade/all');
      tradeDataList = tradeDataList.data;
      var tempPurchaseList = tempPurchase;
      var tempSuccessList = tempSuccess;
      if (tempTurn.current === 1) {
        tempPurchaseList = tempPurchase;
        tempSuccessList = tempSuccess;
      }
      tradeDataList.forEach((element1) => {
        if (element1.tradeType === 'purchase') {
          if (element1.turn === tempTurn.current) {
            tempPurchaseList.forEach((element2) => {
              if (element1.teamId === element2.teamId) {
                element2.bio = element1.bio;
                element2.construction = element1.construction;
                element2.broadcast = element1.broadcast;
                element2.food = element1.food;
                element2.electronics = element1.electronics;
                tempPurchase = tempPurchaseList
                setPurchaseList(tempPurchaseList);          
                
                tempSuccessList.forEach((element3) => {
                  if (element3.teamId === element1.teamId) {
                    element3.bio = element1.bioSuccess;
                    element3.construction = element1.constructionSuccess;
                    element3.broadcast = element1.broadcastSuccess;
                    element3.food = element1.foodSuccess;
                    element3.electronics = element1.electronicsSuccess;
                    tempSuccess = tempSuccessList;
                    setSuccessData(tempSuccessList);
                  }
                });
              }
            });
          }
        }
      });
    }
  }

  const updateSuccess = async() => {
    var i = 1;
    var tradeDataList = await axios.get(defaultAPI + '/trade/all');
    tradeDataList = tradeDataList.data;
    var tempPurchaseList = tempPurchase;
    var tempSuccessList = tempSuccess;
    if (tempTurn.current === 1) {
      tempPurchaseList = tempPurchase;
      tempSuccessList = tempSuccess;
    }
    tradeDataList.forEach((element1) => {
      if (element1.tradeType === 'purchase') {
        if (element1.turn === (tempTurn.current - 1)) {
          tempPurchaseList.forEach((element2) => {
            if (element1.teamId === element2.teamId) {
              element2.bio = element1.bio;
              element2.construction = element1.construction;
              element2.broadcast = element1.broadcast;
              element2.food = element1.food;
              element2.electronics = element1.electronics;
              tempPurchase = tempPurchaseList
              setPurchaseList(tempPurchaseList);          
              
              tempSuccessList.forEach((element3) => {
                if (element3.teamId === element1.teamId) {
                  element3.bio = element1.bioSuccess;
                  element3.construction = element1.constructionSuccess;
                  element3.broadcast = element1.broadcastSuccess;
                  element3.food = element1.foodSuccess;
                  element3.electronics = element1.electronicsSuccess;
                  tempSuccess = tempSuccessList;
                  setSuccessData(tempSuccessList);
                }
              });
            }
          });
        }
      }
    });
  }

  const getData = () => {
    tradeDataInterval = setIntervalAsync(() => {
      makeInterval();
    }, 1000);
    return() => clearIntervalAsync(tradeDataInterval);
  }

  const sendMoney = async () => {
    var buttonList = document.getElementsByClassName('solvingInput');
    buttonList = Array.prototype.slice.call(buttonList);
    var i = 0;
    var element = buttonList[i];
    for(i = 0; i < buttonList.length; i++) {
      element = buttonList[i];
      var value = await axios.get(defaultAPI + '/teams/' + element.id);
      value = value.data;
      value.cash = ((element.value) ? (Number(element.value) + Number(value.cash)) : (Number(0) + Number(value.cash)));
      delete value.id;
      await axios.put(defaultAPI + '/teams/' + element.id, value);
      element.value = 0;
    }
  }

  const navigate = useNavigate();
  const goMainPage = () => {
    navigate('/');
  }
  
  const startTimer = () => {
    if (!timerActive) {
      setTimerActive(true);
      const sellTime = sellMinute * 60 + sellSecond;
      const buyTime =  buyMinute * 60 + buySecond;
      const solveTime = solveMinute * 60 + solveSecond;
      var time;

      if (init) {
        var tempArr = [sellMinute, sellSecond, solveMinute, solveSecond, buyMinute, buySecond];
        setDefaultTime(tempArr);
        setInit(false);
      }

      switch(gameType) {
        case 1:
          time = sellTime;
          break;
        case 2:
          time = solveTime;
          break;
        case 3:
          time = buyTime;
          break;
        case 4:
          time = sellTime;
          setGameType(1);
          break;
      }
      socket.emit('gameStart', {time : time, gameType : (gameType - 1)});
    }
  }

  const stopTimer = () => {
    if (timerActive) {
      setTimerActive(false);
      const sellTime = sellMinute * 60 + sellSecond;
      const buyTime =  buyMinute * 60 + buySecond;
      const solveTime = solveMinute * 60 + solveSecond;
      var time;
      switch(gameType) {
        case 1:
          time = sellTime;
          break;
        case 2:
          time = solveTime;
          break;
        case 3:
          time = buyTime;
          break;
      }
      socket.emit('gameStop', {time : time, gameType : (gameType - 1)});
    }
  }

  useEffect(async () => {
    try {
      await axios.delete(defaultAPI + '/game/turn');
      await axios.delete(defaultAPI + '/trade');
    } catch {
      alert('????????? ??? ????????? ??????????????????. ?????? ??????????????????.');
    }

    groupNum = await axios.get(defaultAPI + '/teams');
    groupNum = groupNum.data;
    groupNum = groupNum.length;
    getData();
    var i = 1;
    for (i = 1; i <= groupNum; i++) {
      tempTrade.push({teamId : i, bio: 0, electronics: 0, construction : 0, broadcast : 0, food : 0});
      tempPurchase.push({teamId : i, bio: 0, electronics: 0, construction : 0, broadcast : 0, food : 0});
      tempAnswerList.push({teamId : i, answer : null});
      tempSuccess.push({teamId : i, bio: 0, electronics: 0, construction : 0, broadcast : 0, food : 0});
    }
    setTradeData(tempTrade);
    setPurchaseList(tempPurchase);
    setAnswerList(tempAnswerList);
    setSuccessData(tempSuccess);

    const gameTemp = gameType === 1 ? 'sell' : gameType === 2 ? 'buy' : 'solve';
    document.getElementsByClassName(gameTemp)[0].style.background = "#94A8D6";
    document.getElementsByClassName('turn' + localTurn)[0].style.background = "#94A8D6";

    socket.on('answer', (data) => {
      const tempAnswer = tempAnswerList;
      tempAnswer.forEach((element) => {
        if (element.teamId === data.teamId) {
          element.answer = data.answer;
        }
      });
      setAnswerList(tempAnswer);
    })
  }, []);

  useEffect(() => {
    const start = timerActive ? true : false;
    if (start)  {
      const sellTime = sellMinute * 60 + sellSecond;
      const buyTime =  buyMinute * 60 + buySecond;
      const solveTime = solveMinute * 60 + solveSecond;
      var time;
      switch(gameType) {
        case 1:
          time = sellTime;
          break;
        case 2:
          time = solveTime;
          break;
        case 3:
          time = buyTime;
          break;
        case 4:
          time = sellTime;
          break;
      }
      socket.emit('gameStart', {time : time, gameType : (gameType - 1)});
    }

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
      case 4:
        setSellStart(start);
        break;
      default:
        break;
    }
  }, [timerActive]);

  useEffect(() => {
    switch(gameType) {
      case 1:
        dataType.current = 'sale';
        document.getElementsByClassName('buy')[0].style.background = "white";
        document.getElementsByClassName('sell')[0].style.background = "#94A8D6";
        setBuyStart(false);
        break;

      case 2:
        dataType.current = 'solving';
        tradeDataInterval = 0;
        document.getElementsByClassName('sell')[0].style.background = "white";
        document.getElementsByClassName('solve')[0].style.background = "#94A8D6";
        setSellStart(false);
        setSolveStart(true);
        const solveTime = solveMinute * 60 + solveSecond;
        socket.emit('gameStart', {time : solveTime, gameType : (gameType - 1)});
        break;

      case 3:
        dataType.current = 'purchase'
        document.getElementsByClassName('solve')[0].style.background = "white";
        document.getElementsByClassName('buy')[0].style.background = "#94A8D6";
        setSolveStart(false);
        setBuyStart(true);
        const buyTime = buyMinute * 60 + buySecond;
        socket.emit('gameStart', {time : buyTime, gameType : (gameType - 1)});
        break;

      case 4:
        dataType.current = 'sale';
        document.getElementsByClassName('buy')[0].style.background = "white";
        document.getElementsByClassName('sell')[0].style.background = "#94A8D6";
        setBuyStart(false);
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
            setSolveSecond(59);
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
            setGameType(4);
            setTimerActive(false);
            const nextTurn = localTurn === 10 ? 1 : localTurn + 1;
            setLocalTurn(nextTurn);
            tempTurn.current = nextTurn;
            setTurn(nextTurn);
            socket.emit('nextTurn', {nextTurn : nextTurn});
            socket.emit('endPurchase', {endPurchase : true});
            socket.emit('gameStop', {time : 0, gameType: 0});
            document.getElementsByClassName('turn' + localTurn)[0].style.background = "white";
            document.getElementsByClassName('turn' + nextTurn)[0].style.background = "#94A8D6";

            updateSuccess();

            setBuyMinute(defaultTimer[4]);
            setBuySecond(defaultTimer[5]);
            setSellMinute(defaultTimer[0]);
            setSellSecond(defaultTimer[1]);
            setSolveMinute(defaultTimer[2]);
            setSolveSecond(defaultTimer[3]);

            var tempTradeData = tradeData;
            var tempPurchase = purchaseList;
            var tempSuccessData = successData;
            var tempAnswerList = answerList;
            tempTradeData.forEach((element) => {
              element.bio = 0;
              element.electronics = 0;
              element.food = 0;
              element.construction = 0;
              element.broadcast = 0;
            });
            tempPurchase.forEach((element) => {
              element.bio = 0;
              element.electronics = 0;
              element.food = 0;
              element.construction = 0;
              element.broadcast = 0;
            });
            tempSuccessData.forEach((element) => {
              element.bio = 0;
              element.electronics = 0;
              element.food = 0;
              element.construction = 0;
              element.broadcast = 0;
            });
            tempAnswerList.forEach((element) => {
              element.answer = null;
            });
            // setTradeData(tempTradeData);
            setPurchaseList(tempPurchase);
            setSuccessData(tempSuccessData);
            setAnswerList(tempAnswerList);

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
            <div id="n3_400">?????? ??????</div>
          </div>
          <div id="n5_196">
              <div id="n5_198" onClick={stopTimer}>
                <div id="n5_199">??????</div>
              </div>
              <div id="n5_197" onClick={startTimer}>
                <div id="n5_200">??????</div>
              </div>
          </div>
        </div>
        <div id="n5_300">
          <div id="n5_304">
            <div id="n5_301">
              <div class="sell" id="n5_305">
                <div id="n5_306">??????</div>
              </div>
              <div id="n5_307">
                {!timerActive ?
                  <input class="test" id="11" value={sellMinute} onChange={onChangeTimer} type="number"></input> :
                  <div id="n5_308">{sellMinute}</div> }
              </div>
              <div id="n5_309">
                <div id="n5_310">???</div>
              </div>
              <div id="n5_307">
                {!timerActive ? 
                  <input class="test" id="12" value={sellSecond} onChange={onChangeTimer} type="number"></input> :
                  <div id="n5_308">{sellSecond}</div> }
              </div>
              <div id="n5_309">
                <div id="n5_310">???</div>
              </div>
            </div>
            <div id="n5_302"> 
              <div class="solve" id="n5_305">
                <div id="n5_306">????????????</div>
              </div>
              <div id="n5_307">
                {!timerActive ?
                  <input class="test" id="21" value={solveMinute} onChange={onChangeTimer} type="number"></input> :
                  <div id="n5_308">{solveMinute}</div> }
              </div>
              <div id="n5_309">
                <div id="n5_310">???</div>
              </div>
              <div id="n5_307">
                {!timerActive ?
                  <input class="test" id="22" value={solveSecond} onChange={onChangeTimer} type="number"></input> :
                  <div id="n5_308">{solveSecond}</div> }
              </div>
              <div id="n5_309">
                <div id="n5_310">???</div>
              </div>
            </div>
            <div id="n5_303">
              <div class="buy" id="n5_305">
                <div id="n5_306">??????</div>
              </div>
              <div id="n5_307">
                {!timerActive ?
                  <input class="test" id="31" value={buyMinute} onChange={onChangeTimer} type="number"></input> :
                  <div id="n5_308">{buyMinute}</div> }
              </div>
              <div id="n5_309">
                <div id="n5_310">???</div>
              </div>
              <div id="n5_307">
                {!timerActive ?
                  <input class="test" id="32" value={buySecond} onChange={onChangeTimer} type="number"></input> :
                  <div id="n5_308">{buySecond}</div> }
              </div>
              <div id="n5_309">
                <div id="n5_310">???</div>
              </div>
            </div>
          </div>
        </div>
        <div id="n5_403">
          <div id="n5_406">
            <div id="n5_404">
              <div id="n5_407" class="turn1">
                <div id="n5_408">1???</div>
              </div>
              <div id="n5_407" class="turn2">
                <div id="n5_408">2???</div>
              </div>
              <div id="n5_407" class="turn3">
                <div id="n5_408">3???</div>
              </div>
              <div id="n5_407" class="turn4">
                <div id="n5_408">4???</div>
              </div>
              <div id="n5_407" class="turn5">
                <div id="n5_408">5???</div>
              </div>
              <div id="n5_407" class="turn6">
                <div id="n5_408">6???</div>
              </div>
              <div id="n5_407" class="turn7">
                <div id="n5_408">7???</div>
              </div>
              <div id="n5_407" class="turn8">
                <div id="n5_408">8???</div>
              </div>
              <div id="n5_407" class="turn9">
                <div id="n5_408">9???</div>
              </div>
              <div id="n5_407" class="turn10">
                <div id="n5_409">?????????</div>
              </div>
            </div>
            <div id="n5_405">
              {(gameType === 1) && <SellTradeLog sellData={tradeData}/>}
              {(gameType === 2) && <SolvingLog groupData={answerList}/>}
              {(gameType === 3) && <PurchaseLog sellData={purchaseList} successData={successData}/>}
              {(gameType === 4) && <TempLog groupData={answerList} sellData={purchaseList} successData={successData}/>}
              {(gameType === 4 || gameType === 2) && <button id="n5_4447" onClick={sendMoney}><div id="n5_4449">?????????</div></button>}
            </div>
          </div>
        </div>
        <div id="n5_462">
          <div id="n5_447" onClick={goMainPage}>
            <div id="n5_449">????????????</div>
          </div>
        </div>
      </div>
    </div>
  )
}

