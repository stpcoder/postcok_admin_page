import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from 'pages/mainPage/MainPage';
import StockSettingPage from 'pages/stockSettingPage/StockSettingPage';
import UserInfoSettingPage from 'pages/userInfoSettingPage/UserInfoSettingPage';
import CurrentStatePage from 'pages/currentStatePage/CurrentStatePage';
import TotalSettingPage from 'pages/totalSettingPage/TotalSettingPage';
import { defaultAPI, groupInfoList } from 'utils/GetConstant';
import axios from 'axios';
import io from 'socket.io-client';

function App() {
  const [groupNumber, setGroupNumber] = useState(1);
  const [turn, setTurn] = useState(1);
  const [groupInfo, setGroupInfo] = useState(groupInfoList);

  // useEffect(() => {
  //   document.body.style.cssText = `
  //     position: fixed; 
  //     top: -${window.scrollY}px;
  //     overflow-y: scroll;
  //     width: 100%;`;
  //   return () => {
  //     const scrollY = document.body.style.top;
  //     document.body.style.cssText = '';
  //     window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  //   };
  // }, []);

  useEffect(async () => {
    var temp = await axios.get(defaultAPI + '/teams');
    temp = temp.data;
    setGroupNumber(temp.length);
  }, []);

  const socket = io(defaultAPI,  {transports : ['websocket']});

  return (
    <div>
      <Routes>
        <Route path = '/' exact element = {<MainPage/>} />
        <Route path = '/stockSetting' exact element = {<StockSettingPage/>}/>
        <Route path = '/userInfo' exact element = {<UserInfoSettingPage/>}/>
        <Route path = '/currentState' exact element = {<CurrentStatePage/>}/>
        <Route path = '/totalSetting' exact element = {<TotalSettingPage socket = {socket} groupNum={groupNumber} turn={turn} setTurn={setTurn} />}/>
      </Routes>
    </div>
  );
}

export default App;