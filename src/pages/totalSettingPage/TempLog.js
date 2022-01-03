import React from 'react'
import axios from 'axios'
import { defaultAPI } from 'utils/GetConstant';

function SellTradeRow({groupTradeData, one, two, three}) {
  const findRow2 = three[one.indexOf(groupTradeData)];
  const findRow1 = two[one.indexOf(groupTradeData)];
  const text1 = findRow1.bio === 0? '' : '생명 ' + findRow1.bio + '주, ';
  const text2 = findRow1.electronics === 0 ? '' : '전자 ' + findRow1.electronics + '주, ';
  const text3 = findRow1.construction === 0 ? '' : '건축 ' + findRow1.construction + '주, ';
  const text4 = findRow1.broadcast === 0 ? '' : '방송 ' + findRow1.broadcast + '주, ';
  const text5 = findRow1.food === 0 ? '' : '식품 ' + findRow1.food + '주';

  const text6 = findRow2.bio === 0 ? '' : '생명 ' + findRow2.bio + '주, ';
  const text7 = findRow2.electronics === 0 ? '' : '전자 ' + findRow2.electronics + '주, ';
  const text8 = findRow2.construction === 0 ? '' : '건축 ' + findRow2.construction + '주, ';
  const text9 = findRow2.broadcast === 0 ? '' : '방송 ' + findRow2.broadcast + '주, ';
  const text10 = findRow2.food === 0 ? '' : '식품 ' + findRow2.food + '주';

  const outputFirstText = text1 + text2 + text3 + text4 + text5;
  const outputSecondText = text6 + text7 + text8 + text9 + text10;

  return (
    <>
      <tbody>
        <tr>
          <td class="n5_1_tg-0pky">{groupTradeData.teamId  + ' 조'}</td>
          <td class="n5_1_tg-0pky">{outputFirstText}</td>
          <td class="n5_1_tg-0pky">{outputSecondText}</td>
          <td class="n5_1_tg-0pky">{groupTradeData.answer}</td>
          <td class="n5_1_tg-0pky"><input class="solvingInput" id={groupTradeData.teamId}></input></td>
        </tr>
      </tbody>
    </>
  )
}

export default function TempLog({groupData, sellData, successData}) {
  return (
    <>
      <table class="n5_1_tg">
      <thead>
        <tr>
          <th class="n5_1_tg-7btt">조 이름</th>
          <th class="n5_1_tg-7btt">예약 정보</th>
          <th class="n5_1_tg-7btt">체결 정보</th>
          <th class="n5_1_tg-7btt">보낸 정답</th>
          <th class="n5_1_tg-7btt">금액</th>
        </tr>
      </thead>
        {groupData.map((oneData) => (
          <SellTradeRow groupTradeData={oneData} one={groupData} two={sellData} three={successData}/>
        ))}
      </table>
    </>
  )
}