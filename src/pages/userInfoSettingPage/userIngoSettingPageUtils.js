import React from 'react'

export default function oneInput({ num, show, onClick}) {
  const text = num.toString() + '조';
  return (
    <>
      {show && 
        <div class={num} id="n3_403">
          <div class={text} id="n3_410" onClick={onClick}>{text}</div>
        </div>
      }
    </>
  )
}