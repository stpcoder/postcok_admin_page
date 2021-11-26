import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from 'pages/mainPage/MainPage';
import StockSettingPage from 'pages/stockSettingPage/StockSettingPage';
import UserInfoSettingPage from 'pages/userInfoSettingPage/UserInfoSettingPage';
import CurrentStatePage from 'pages/currentStatePage/CurrentStatePage';
import TotalSettingPage from 'pages/totalSettingPage/TotalSettingPage';
import { stockPrice, groupInfoList } from 'utils/GetConstant';

function App() {
  const [price, setPrice] = useState(stockPrice);
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

  return (
    <div>
      <Routes>
        <Route path = '/' exact element = {<MainPage/>} />
        <Route path = '/stockSetting' exact element = {<StockSettingPage price={price} setPrice={setPrice}/>} />
        <Route path = '/userInfo' exact element = {<UserInfoSettingPage groupNumber={groupNumber} setGroupNumber={setGroupNumber} groupInfo={groupInfo} setGroupInfo={setGroupInfo}/>} />
        <Route path = '/currentState' exact element = {<CurrentStatePage groupNumber={groupNumber}/>}/>
        <Route path = '/totalSetting' exact element = {<TotalSettingPage turn={turn} setTurn={setTurn} groupNumber={groupNumber} price={price}/>}/>
      </Routes>
    </div>
  );
}

export default App;