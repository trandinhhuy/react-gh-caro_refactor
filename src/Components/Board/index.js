import React from 'react'
import Square from '../Square';
const Board = ({row, col, squares, onClick, bold}) => {
    const renderSquare = (i) => {
        console.log(bold[i])
        if (bold[i] == true)
        return (
            <Square
            bold = {true}
            value={squares[i]}
            onClick={() => onClick(i)}
          />
        )
        else 
        return (
          <Square
            bold = {false}
            value={squares[i]}
            onClick={() => onClick(i)}
          />
        );
    }
    const renderRow = (rowNumber) => {
        const eachCol = Array(col).fill(null)
        for (let i = 0 ; i < col ; i++){
            eachCol[i] = renderSquare(row * rowNumber + i)
        }
        return eachCol
    }
    const renderBoard = () =>{
        const eachRow = Array(row).fill(null)
        for (let i = 0 ; i < row ; i++){
            eachRow[i] = (
                <div className = "board-row">
                    {renderRow(i)}
                </div>
            )
        }
        return eachRow
    }
    return (
        <div>
          {renderBoard()}
        </div>
      );
}

export default Board