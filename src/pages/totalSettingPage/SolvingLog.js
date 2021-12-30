import React from 'react'
import axios from 'axios'
import { defaultAPI } from 'utils/GetConstant';

function SellTradeRow({groupTradeData}) {
  return (
    <>
      <tbody>
        <tr>
          <td class="n5_1_tg-0pky">{groupTradeData.teamId  + ' 조'}</td>
          <td class="n5_1_tg-0pky">{groupTradeData.answer}</td>
          <td class="n5_1_tg-0pky"><input class="solvingInput" id={groupTradeData.teamId}></input></td>
        </tr>
      </tbody>
    </>
  )
}

export default function SolvingLog({groupData}) {
  return (
    <>
      <table class="n5_1_tg">
      <thead>
        <tr>
          <th class="n5_1_tg-7btt">조 이름</th>
          <th class="n5_1_tg-7btt">보낸 정답</th>
          <th class="n5_1_tg-7btt">금액</th>
        </tr>
      </thead>
        {groupData.map((oneData) => (
          <SellTradeRow groupTradeData={oneData}/>
        ))}
      </table>
    </>
  )
}