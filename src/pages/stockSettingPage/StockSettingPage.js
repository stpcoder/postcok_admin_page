import React, { useState, useEffect } from 'react'
import 'pages/stockSettingPage/stockSettingPage.css'
import { useNavigate } from 'react-router';
import { logos } from 'utils/GetLogo';
import { stockTypeArr, turnTypeArr } from 'utils/GetConstant';
import OneRow from 'pages/stockSettingPage/stockSettingUtils';
import axios from 'axios';

const stockPrice = {"bio":{"count":0, "price1":0, "price2":0, "price3":0, "price4":0, "price5":0, "price6":0, "price7":0, "price8":0, "price9":0},
                  "construction":{"count":0, "price1":0, "price2":0, "price3":0, "price4":0, "price5":0, "price6":0, "price7":0, "price8":0, "price9":0},
                  "electronics":{"count":0, "price1":0, "price2":0, "price3":0, "price4":0, "price5":0, "price6":0, "price7":0, "price8":0, "price9":0},
                  "food":{"count":0, "price1":0, "price2":0, "price3":0, "price4":0, "price5":0, "price6":0, "price7":0, "price8":0, "price9":0},
                  "broadcast":{"count":0, "price1":0, "price2":0, "price3":0, "price4":0, "price5":0, "price6":0, "price7":0, "price8":0, "price9":0}
                  }

export default function StockSettingPage({ price, setPrice }) {
  stockTypeArr.forEach((stockType) => {
    turnTypeArr.forEach((turnType) => {
      stockPrice[stockType][turnType] = price[stockType][turnType];
    });
  });
  const [priceList, setPriceList] = useState(stockPrice);
  const navigate = useNavigate();
  const goMainPage = () => {
    navigate('/');
  }
  const changeEnd = () => {
    const deleteData = async() => {
      await axios.delete('http://18.221.173.188:8080/stocks');
    }
    const updateData = () => {
      stockTypeArr.forEach(async (currStockType) => {
        const defaultPutData = {
          "price" : [],
          "count" : 0
        }
        turnTypeArr.forEach((currTurnType) => {
          if (currTurnType !== 'count') defaultPutData.price.push(priceList[currStockType][currTurnType]);
          else defaultPutData.count = priceList[currStockType][currTurnType];
        });
        const serverUrl = 'http://18.221.173.188:8080/stocks' + '/' + currStockType;
        await axios.post(serverUrl, defaultPutData);
        console.log(defaultPutData + 'type : ' + currStockType);
      });
      alert('수정이 완료되었습니다.');
    }
    setPrice(priceList);
    deleteData();
    updateData();
    navigate('/');
  }

  const onChangeValue = e => {
    const stockType = (Number(e.target.id) - Number(e.target.id) % 10) / 10;
    const turn = Number(e.target.id) % 10;
    const value = Number(e.target.value);

    stockPrice[stockTypeArr[stockType - 1]][turnTypeArr[turn]] = value;
    setPriceList(stockPrice);
  }

  const rowDataList = [{logo: logos.bioLogo, alt: "bioLogo", title: "생명", elementData: ["10", "11", "12", "13", "14", "15", "16", "17", "18", "19"], onChange: onChangeValue}, 
                      {logo: logos.elecLogo, alt: "elecLogo", title: "전자", elementData: ["20", "21", "22", "23", "24", "25", "26", "27", "28", "29"], onChange: onChangeValue}, 
                      {logo: logos.conLogo, alt: "conLogo", title: "건축", elementData: ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39"], onChange: onChangeValue}, 
                      {logo: logos.foodLogo, alt: "foodLogo", title: "식품", elementData: ["40", "41", "42", "43", "44", "45", "46", "47", "48", "49"], onChange: onChangeValue}, 
                      {logo: logos.broadLogo, alt: "broadLogo", title: "방송", elementData: ["50", "51", "52", "53", "54", "55", "56", "57", "58", "59"], onChange: onChangeValue}];

  useEffect(() => {
    var tempData;
    const getData = async () => {
      tempData = await axios.get('http://18.221.173.188:8080/stocks');
      tempData = tempData.data;
      tempData.forEach((oneData) => {
        stockPrice[oneData.title]['count'] = oneData.count;
        stockPrice[oneData.title]['price1'] = oneData.price1;
        stockPrice[oneData.title]['price2'] = oneData.price2;
        stockPrice[oneData.title]['price3'] = oneData.price3;
        stockPrice[oneData.title]['price4'] = oneData.price4;
        stockPrice[oneData.title]['price5'] = oneData.price5;
        stockPrice[oneData.title]['price6'] = oneData.price6;
        stockPrice[oneData.title]['price7'] = oneData.price7;
        stockPrice[oneData.title]['price8'] = oneData.price8;
        stockPrice[oneData.title]['price9'] = oneData.price9;
      });
      setPrice(stockPrice);
      setPriceList(stockPrice);
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
          <table class="tg">
            <thead>
              <tr>
                <th class="tg-c3ow">로고</th>
                <th class="tg-c3ow">종목</th>
                <th class="tg-c3ow">주식 수</th>
                <th class="tg-c3ow" colspan="9">턴 별 가격</th>
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