import React, { useState, useEffect } from 'react'
import './stockSettingPage.css'
import mainLogo from './PoStocklogo.png';
import { useNavigate } from 'react-router';

const stockTypeArr = ['bio', 'construction', 'electronics', 'food', 'broadcast'];
const turnTypeArr = ['tot', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default function StockSettingPage({ price, setPrice }) {
  const stockPrice = price;
  const [priceList, setPriceList] = useState(stockPrice);

  const navigate = useNavigate();
  const goMainPage = () => {
    navigate('/');
  }

  useEffect(() => {
    const temp = document.getElementsByTagName('input')
    const tempList = Array.prototype.slice.call(temp);
    tempList.forEach(e => {
      const stockType = (Number(e.id) - Number(e.id)%10)/10;
      const turn = Number(e.id)%10;
      e.value = price[stockTypeArr[stockType - 1]][turnTypeArr[turn]];
    });
  }, [])

  const changeEnd = () => {
    setPrice(stockPrice);
    alert('수정이 완료되었습니다.');
    navigate('/');
  }

  const onChangeValue = e => {
    const stockType = (Number(e.target.id) - Number(e.target.id)%10)/10;
    const turn = Number(e.target.id)%10;
    const value = Number(e.target.value);

    stockPrice[stockTypeArr[stockType - 1]][turnTypeArr[turn]] = value;
    setPriceList(stockPrice);
    console.log(priceList);
  }

  return (
    <div>
      <div class="frame" id="n2_192">
        <div class="topbar" id="n2_193">
          <div class="topbar-background" id="n2_194">
            <img src={mainLogo} id="n2_195" alt="logo"/>
          </div>
        </div>
        <div id="n2">
          <div class="left top rectangle" id="n2_175"></div>
          <div class="left top text" id="n2_174">주식 정보 수정</div>
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
              <tr>
                <td class="tg-c3ow"><div id="n2_11"></div></td>
                <td class="tg-c3ow">생명</td>
                <td class="tg-c3ow">
                  <input id="10" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="11" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="12" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="13" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="14" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="15" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="16" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="17" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="18" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="19" onChange={onChangeValue}/>
                </td>
              </tr>
              <tr>
                <td class="tg-c3ow"><div id="n2_13"></div></td>
                <td class="tg-c3ow">전자</td>
                <td class="tg-c3ow">
                  <input id="20" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="21" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="22" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="23" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="24" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="25" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="26" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="27" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="28" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="29" onChange={onChangeValue}/>
                </td>
              </tr>
              <tr>
                <td class="tg-c3ow"><div id="n2_9"></div></td>
                <td class="tg-c3ow">건축</td>
                <td class="tg-c3ow">
                  <input id="30" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="31" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="32" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="33" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="34" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="35" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="36" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="37" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="38" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="39" onChange={onChangeValue}/>
                </td>
              </tr>
              <tr>
                <td class="tg-c3ow"><div id="n2_12"></div></td>
                <td class="tg-c3ow">식품</td>
                <td class="tg-c3ow">
                  <input id="40" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="41" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="42" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="43" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="44" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="45" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="46" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="47" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="48" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="49" onChange={onChangeValue}/>
                </td>
              </tr>
              <tr>
                <td class="tg-c3ow"><div id="n2_10"></div></td>
                <td class="tg-c3ow">방송</td>
                <td class="tg-c3ow">
                  <input id="50" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="51" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="52" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="53" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="54" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="55" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="56" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="57" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="58" onChange={onChangeValue}/>
                </td>
                <td class="tg-c3ow">
                  <input id="59" onChange={onChangeValue}/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="group" id="n2_462">
          <div class="left top rectangle" id="n2_448" onClick={changeEnd}>
            <div class="left top text" id="n2_450">수정완료</div>
          </div>
          <div class="left top rectangle" id="n2_447" onClick={goMainPage}>
            <div class="left top text" id="n2_449">메인화면</div>
          </div>
        </div>
      </div>
    </div>
  )
}
