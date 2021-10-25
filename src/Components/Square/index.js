import React from 'react'

const Square = ({value, onClick, bold}) => {
  if (!bold)
    return (
        <button className="square" onClick={onClick}>
          {value}
        </button>
    );
  else
  return (
    <button className="square-bold" onClick={onClick}>
      {value}
    </button>
  )
}

export default Square