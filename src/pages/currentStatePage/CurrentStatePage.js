import React, { useEffect, useState } from 'react'
import './currentStatePage.css';
import { logos } from 'utils/GetLogo';
import { useNavigate } from 'react-router';
import axios from 'axios';

function MakeRow({ data }) {
  const stockText = '생명 : ' + data.bio + '주/ 전자 : ' + data.electronics + '주/ 건축 : ' + data.construction + '주/ 방송 : ' + data.broadcast + '주/ 식품 : ' + data.food + '주';
  return (
    <>
      <tr>
        <td class="n4_tg-c3ow">{data.rank}</td>
        <td class="n4_tg-c3ow">{data.id}</td>
        <td class="n4_tg-c3ow">{data.asset}</td>
        <td class="n4_tg-c3ow">{data.cash}</td>
        <td class="n4_tg-c3ow">{stockText}</td>
      </tr>
    </>
  )
}

function MakeTable( { dataList }) {
  return (
    <>
      <table class="n4_tg">
        <thead>
          <tr>
            <th class="n4_tg-c3ow">순위</th>
            <th class="n4_tg-c3ow">조</th>
            <th class="n4_tg-c3ow">환전 자산</th>
            <th class="n4_tg-c3ow">현금</th>
            <th class="n4_tg-c3ow">주식 보유 현황</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((data) => (
            <MakeRow data={data}/>
          ))}
        </tbody>
      </table>
    </>
  )
}


export default function CurrentStatePage() {
  const serverLink = '';
  const [dataList, setDataList] = useState([]);
  const [init, setInit] = useState(true);

  useEffect(() => {
    var tempData;
    const getData = setInterval(async () => {
      tempData = await axios.get('http://18.221.173.188:8080/teams');
      tempData = tempData.data;
      tempData.sort((a, b)  => {
        if(a.cash < b.cash) return 1;
        if(a.cash === b.cash) return 0;
        if(a.cash > b.cash) return -1;
      });
      var rank = 0;
      var before = -1;
      var i = 0;
      var gap = 0;
      for (i = 0; i < tempData.length; i++) {
        if (before !== tempData[i].cash) {
          rank = i + 1;
          before = tempData[i].cash;
          tempData[i].rank = rank;
          gap = 0;
        } else {
          tempData[i].rank = rank;
          gap++;
        }
      }
      setDataList(tempData);
    }, 1000);
  }, []);

  const navigate = useNavigate();
  const goMainPage = () => {
    navigate('/');
  }

  return (
    <div>
      <div class="frame" id="n4_192">
        <div class="topbar" id="n4_193">
          <div id="n4_190">
            <img src={logos.mainLogo} id="n4_195" alt="mainlogo"/>
          </div>
        </div>
        <div class="group" id="n4_402">
          <img src={logos.currentLogo} id="n4_401" alt="userLogo"/>
          <div id="n3_400">현재 상황</div>
        </div>
        <div id="n4_403">
          <div id="n4_404">
            <MakeTable dataList={dataList}/>
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