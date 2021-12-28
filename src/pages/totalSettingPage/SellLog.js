import React from 'react'
function SellTradeRow({groupTradeData}) {
  const outputText = '생명 ' + groupTradeData.bio + '주, 전자 ' + groupTradeData.electronics + '주, 건축 ' + groupTradeData.construction + '주, 방송 ' + groupTradeData.broadcast + '주, 식품 ' + groupTradeData.food;
  return (
    <>
      <tbody>
        <tr>
          <td class="n5_1_tg-0pky">{groupTradeData.teamID  + '조'}</td>
          <td class="n5_1_tg-0pky">{outputText}</td>
        </tr>
      </tbody>
    </>
  )
}

export default function SellTradeLog({sellData}) {
  return (
    <>
      <table class="n5_1_tg">
        <thead>
          <tr>
            <th class="n5_1_tg-7btt">조 이름</th>
            <th class="n5_1_tg-7btt">판매 정보</th>
          </tr>
        </thead>
        {sellData.map((oneData) => (
          <SellTradeRow groupTradeData={oneData}/>
        ))}
      </table>
    </>
  )
}