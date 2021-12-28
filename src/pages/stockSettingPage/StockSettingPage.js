import React, { useEffect } from 'react'
import './stockSettingPage.css'
import { useNavigate } from 'react-router';
import { logos } from 'utils/GetLogo';
import { stockTypeArr, turnTypeArr, stockPrice, defaultAPI } from 'utils/GetConstant';
import OneRow from 'pages/stockSettingPage/stockSettingUtils';
import axios from 'axios';

export default function StockSettingPage() {
  const navigate = useNavigate();
  const goMainPage = () => {
    navigate('/');
  }
  const changeEnd = () => {
    const deleteData = async() => {
      const text = defaultAPI + '/stocks';
      await axios.delete(text);
    }
    const updateData = () => {
      stockTypeArr.forEach(async (currStockType) => {
        const defaultPutData = {
          "price" : [],
          "count" : 0
        }
        turnTypeArr.forEach((currTurnType) => {
          if (currTurnType !== 'count') defaultPutData.price.push(stockPrice[currStockType][currTurnType]);
          else defaultPutData.count = stockPrice[currStockType][currTurnType];
        });
        const serverUrl = defaultAPI + '/stocks/' + currStockType;
        await axios.post(serverUrl, defaultPutData);
      });
      alert('수정이 완료되었습니다.');
    }
    deleteData();
    updateData();
  }
  const onChangeValue = e => {
    const stockType = (Number(e.target.id) - Number(e.target.id) % 10) / 10;
    const turn = Number(e.target.id) % 10;
    const value = Number(e.target.value);
    stockPrice[stockTypeArr[stockType - 1]][turnTypeArr[turn]] = value;
  }

  const rowDataList = [{logo: logos.bioLogo, alt: "bioLogo", title: "생명", elementData: ["10", "11", "12", "13", "14", "15", "16", "17", "18", "19"], onChange: onChangeValue}, 
                      {logo: logos.elecLogo, alt: "elecLogo", title: "전자", elementData: ["20", "21", "22", "23", "24", "25", "26", "27", "28", "29"], onChange: onChangeValue}, 
                      {logo: logos.conLogo, alt: "conLogo", title: "건축", elementData: ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39"], onChange: onChangeValue}, 
                      {logo: logos.foodLogo, alt: "foodLogo", title: "식품", elementData: ["40", "41", "42", "43", "44", "45", "46", "47", "48", "49"], onChange: onChangeValue}, 
                      {logo: logos.broadLogo, alt: "broadLogo", title: "방송", elementData: ["50", "51", "52", "53", "54", "55", "56", "57", "58", "59"], onChange: onChangeValue}];

  useEffect(() => {
    var tempData;
    var i = 0;
    const getData = async () => {
      const text = defaultAPI + '/stocks';
      tempData = await axios.get(text);
      tempData = tempData.data;

      tempData.forEach((oneData) => {
        const title = oneData.title;
        const count = oneData.count;
        stockPrice[title]['count'] = count;
        
        turnTypeArr.forEach((tempTurnType) => {
          if (tempTurnType !== 'count') {
            stockPrice[title][tempTurnType] = oneData.price[i] ? oneData.price[i] : 0;
            i++;
          }
        });
        i = 0;
      });

      const temp = document.getElementsByTagName('input')
      const tempList = Array.prototype.slice.call(temp);
      tempList.forEach(e => {
        e.type = "number";
        const stockType = (Number(e.id) - Number(e.id) % 10) / 10;
        const turn = Number(e.id) % 10;
        e.value = stockPrice[stockTypeArr[stockType - 1]][turnTypeArr[turn]];
      });
      
      alert('데이터를 불러왔습니다.');
    }
    getData();
  }, []);

  return (
    <div>
      <div class="frame" id="n2_192">
        <div class="topbar" id="n2_193">
          <div id="n2_190">
            <img src={logos.mainLogo} id="n2_195" alt="mainlogo"/>
          </div>
        </div>
        <div id="n2">
          <img src={logos.stockLogo} id="n2_175" alt="stockLogo"/>
          <div id="n2_174">주식 정보 수정</div>
        </div>
        <div id="n2_2">
          <table class="n2_tg">
            <thead>
              <tr>
                <th class="n2_th-tg-c3ow">로고</th>
                <th class="n2_th-tg-c3ow">종목</th>
                <th class="n2_th-tg-c3ow">주식 수</th>
                <th class="n2_th-tg-c3ow" colspan="9">턴 별 가격</th>
              </tr>
            </thead>
            <tbody>
              {rowDataList.map((rowData) => (
                <OneRow rowData={rowData} />
              ))}
            </tbody>
          </table>
        </div>
        <div id="n2_462">
          <div id="n2_448" onClick={changeEnd}>
            <div id="n2_450">수정완료</div>
          </div>
          <div id="n2_447" onClick={goMainPage}>
            <div id="n2_449">메인화면</div>
          </div>
        </div>
      </div>
    </div>
  )
}