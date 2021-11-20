import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import StockSettingPage from './pages/StockSettingPage';
import UserInfoSettingPage from './pages/UserInfoSettingPage';
import CurrentStatePage from './pages/CurrentStatePage';
import TotalSettingPage from './pages/TotalSettingPage';

const stockPrice = {"bio":{"tot":0, "1":0, "2":0, "3":0, "4":0, "5":0, "6":0, "7":0, "8":0, "9":0},
                  "construction":{"tot":0, "1":0, "2":0, "3":0, "4":0, "5":0, "6":0, "7":0, "8":0, "9":0},
                  "electronics":{"tot":0, "1":0, "2":0, "3":0, "4":0, "5":0, "6":0, "7":0, "8":0, "9":0},
                  "food":{"tot":0, "1":0, "2":0, "3":0, "4":0, "5":0, "6":0, "7":0, "8":0, "9":0},
                  "broadcast":{"tot":0, "1":0, "2":0, "3":0, "4":0, "5":0, "6":0, "7":0, "8":0, "9":0}
                  };
const groupCount = 1;
const groupInfoList = {'group1': {'tot':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0},
                    'group2': {'tot':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0},
                    'group3': {'tot':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0},
                    'group4': {'tot':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0},
                    'group5': {'tot':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0},
                    'group6': {'tot':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0},
                    'group7': {'tot':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0},
                    'group8': {'tot':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0},
                    'group9': {'tot':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0},
                    'group10': {'tot':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0},
                    'group11': {'tot':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0},
                    'group12': {'tot':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0}
                    };


function App() {
  const [price, setPrice] = useState(stockPrice);
  const [groupNumber, setGroupNumber] = useState(1);
  const [groupInfo, setGroupInfo] = useState(groupInfoList);

  return (
    <div>
      <Routes>
        <Route path = '/' exact element = {<MainPage/>} />
        <Route path = '/stockSetting' exact element = {<StockSettingPage price={price} setPrice={setPrice}/>} />
        <Route path = '/userInfo' exact element = {<UserInfoSettingPage groupNumber={groupNumber} setGroupNumber={setGroupNumber} groupInfo={groupInfo} setGroupInfo={setGroupInfo}/>} />
        <Route path = '/currentState' exact element = {<CurrentStatePage/>}/>
        <Route path = '/totalSetting' exact element = {<TotalSettingPage/>}/>
      </Routes>
    </div>
  );
}

export default App;