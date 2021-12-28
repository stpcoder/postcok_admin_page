import React from 'react'
function SellTradeRow({sellData}) {
  const outputFirstText = '생명 ' + sellData.bio + '주, 전자 ' + sellData.electronics + '주, 건축 ' + sellData.construction + '주, 방송 ' + sellData.broadcast + '주, 식품 ' + sellData.food;
  const outputSecondText = '생명 ' + sellData.bio + '주, 전자 ' + sellData.electronics + '주, 건축 ' + sellData.construction + '주, 방송 ' + sellData.broadcast + '주, 식품 ' + sellData.food;
  return (
    <>
      <tbody>
        <tr>
          <td class="n5_1_tg-0pky">{sellData.teamID  + '조'}</td>
          <td class="n5_1_tg-0pky">{outputFirstText}</td>
          <td class="n5_1_tg-0pky">{outputSecondText}</td>
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
          <th class="n5_1_tg-7btt">체결 정보</th>
        </tr>
      </thead>
        {sellData.map((oneData) => (
          <SellTradeRow sellData={oneData}/>
        ))}
      </table>
    </>
  )
}