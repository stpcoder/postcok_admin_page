import React from 'react'

function OneElement({ id, onChange }) {
  return (
    <>
      <td class="n2_tg-c3ow">
        <input id={id} class="stockInput" onChange={onChange}/>
      </td>
    </>
  )
}

export default function OneRow({ rowData }) {
  return (
    <>
      <tr>
        <td class="n2_tg-c3ow">
          <img src={rowData.logo} id="n2_9" alt={rowData.alt}/>
        </td>
        <td class="n2_tg-c3ow">{rowData.title}</td>
        {rowData.elementData.map((elemenet) => (
          <OneElement id={elemenet} onChange={rowData.onChange}/>
        ))}
      </tr>
    </>
  )
}
