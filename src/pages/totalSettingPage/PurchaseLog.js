import React from 'react'
function SellTradeRow({sellData, second, third}) {
  const findRow = second[third.indexOf(sellData)];
  const text1 = (sellData.bio === 0) ? '' : '생명 ' + sellData.bio + '주, ';
  const text2 = sellData.electronics === 0 ? '' : '전자 ' + sellData.electronics + '주, ';
  const text3 = sellData.construction === 0 ? '' : '건축 ' + sellData.construction + '주, ';
  const text4 = sellData.broadcast === 0 ? '' : '방송 ' + sellData.broadcast + '주, ';
  const text5 = sellData.food === 0 ? '' : '식품 ' + sellData.food + '주';
  const outputFirstText = text1 + text2 + text3 + text4 + text5;
  return (
    <>
      <tbody>
        <tr>
          <td class="n5_1_tg-0pky">{sellData.teamId  + '조'}</td>
          <td class="n5_1_tg-0pky">{outputFirstText}</td>
        </tr>
      </tbody>
    </>
  )
}

export default function PurchaseLog({sellData, successData}) {
  return (
    <>
      <table class="n5_1_tg">
      <thead>
        <tr>
          <th class="n5_1_tg-7btt">조 이름</th>
          <th class="n5_1_tg-7btt">예약 정보</th>
        </tr>
      </thead>
        {sellData.map((oneData) => (
          <SellTradeRow sellData={oneData} second={successData} third={sellData}/>
        ))}
      </table>
    </>
  )
}