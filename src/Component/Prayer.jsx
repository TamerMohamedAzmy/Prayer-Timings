import React from 'react'

export default function Prayer({image,name,time}) {
  return (
    <div>
      <div className="cards">
         <div className="card">
            <img  src={image} alt="img"/>
            <div className="name">
                <span>{name}</span>
            </div>
            <h1>{time}</h1>
         </div>
      </div>
    </div>
  )
}
