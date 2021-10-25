import React from 'react'
import '../../index.css'
import Board from '../Board'
import { Switch } from 'antd'
import 'antd/dist/antd.css';
import Convert from '../Function/Convert';
const Game = ({size}) =>{

    let row = size, col = size // board size

    const [history, setHistory] = React.useState([{squares: Array(row * col).fill(null), lastStep: null}])
    const [stepNumber, setStepNumber] = React.useState(0)
    const [xIsNext, setXIsNext] = React.useState(true)
    const [isAscending, setIsAscending] = React.useState(true)
    const [isWin, setIsWin] = React.useState(false)
    const [boldSquare, setBoldSquare] = React.useState(Array(row * col).fill(false))

    const handleClick = (i) => {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const squares = current.squares.slice();
        if (isWin || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? "X" : "O";
        
        setHistory(newHistory.concat([{squares: squares, lastStep: i}]))
        setStepNumber(newHistory.length)
        setXIsNext(!xIsNext)
        if (calculateWinner(squares, i)) {
            setIsWin(squares[i])
            setBoldSquare(calculateWinner(squares, i).bold)
            return;
        }
        else {
            setBoldSquare(Array(row*col).fill(false))
        }
      }
    
    const jumpTo = (step) => {
        const current = history[step];
        const winner = calculateWinner(current.squares, current.lastStep);
        setStepNumber(step)
        setXIsNext(step % 2 === 0)
        if (winner == null) {
            setIsWin(null)
            setBoldSquare(Array(col*row).fill(false))
        }
        if (winner){
            setIsWin(current.lastStep)
            setBoldSquare(winner.bold)
        }
    }
    const calculateWinner = (squares, i) => {
        var leftSide = {
            row: [-1, -2, -3, -4],
            col: [0, 0, 0, 0]
        }
        var rightSide = {
            row: [1, 2, 3, 4],
            col: [0, 0, 0, 0]
        }
        let ifWin = checkWinnerInDirection(leftSide, rightSide, squares, i)
        if (ifWin != null){
            let winner = ifWin.winner
            let bold = ifWin.bold
            return {winner, bold}
        }
        
        leftSide = {
            row: [0, 0, 0, 0],
            col: [-1, -2, -3, -4]
        }
        rightSide = {
            row: [0, 0, 0, 0],
            col: [1, 2, 3, 4]
        }

        ifWin = checkWinnerInDirection(leftSide, rightSide, squares, i)
        if (ifWin != null){
            let winner = ifWin.winner
            let bold = ifWin.bold
            return {winner, bold}
        }
        leftSide = {
            row: [-1, -2, -3, -4],
            col: [-1, -2, -3, -4]
        }
        rightSide = {
            row: [1, 2, 3, 4],
            col: [1, 2, 3, 4]
        }

        ifWin = checkWinnerInDirection(leftSide, rightSide, squares, i)
        if (ifWin != null){
            let winner = ifWin.winner
            let bold = ifWin.bold
            return {winner, bold}
        }
        leftSide = {
            row: [-1, -2, -3, -4],
            col: [1, 2, 3, 4]
        }
        rightSide = {
            row: [1, 2, 3, 4],
            col: [-1, -2, -3, -4]
        }

        ifWin = checkWinnerInDirection(leftSide, rightSide, squares, i)
        if (ifWin != null){
            let winner = ifWin.winner
            let bold = ifWin.bold
            return {winner, bold}
        }
        return null
    }
    const checkWinnerInDirection = (leftSide, rightSide, squares, j) => {
        let count = 1;
        let bold = Array(col*row).fill(false)
        for (let i = 0 ; i < leftSide.row.length ; i++){
            let currentCoordinate = Convert.convertIndexToCoordinate(row, col, j)
            let newCoordinate = {
                row: currentCoordinate.row + leftSide.row[i],
                col: currentCoordinate.col + leftSide.col[i]
            }
            let currentIndex = Convert.convertCoordinateToIndex(row, col, newCoordinate)
            if (currentIndex >= 0 && currentIndex < row*col){
                if (squares[j] === squares[currentIndex] && squares[j] != null){
                    bold[currentIndex] = true
                    count++
                }
                else {
                    break;
                }
                if (count === 5){
                    bold[j] = true
                    let winner = squares[j]
                    return {winner, bold}
                }
            }
        }
        for (let i = 0 ; i < rightSide.row.length ; i++){
            let currentCoordinate = Convert.convertIndexToCoordinate(row, col, j)
            currentCoordinate.row += rightSide.row[i]
            currentCoordinate.col += rightSide.col[i]
            let currentIndex = Convert.convertCoordinateToIndex(row, col, currentCoordinate)
            if (currentIndex > 0 && currentIndex < row*col){
                if (squares[j] === squares[currentIndex]){
                    bold[currentIndex] = true
                    count++
                }
                else {
                    break;
                }
                if (count === 5){
                    bold[j] = true
                    let winner = squares[j]
                    return {winner, bold}
                }
            }
        }
        return null
    }
    let historyArray = history.slice();
    
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares, current.lastStep);
    const moves = historyArray.map((step, move) => {
        const desc = move ?
        'Go to move #' + move + ' {'+Convert.convertIndexToCoordinate(row, col, step.lastStep).row + ',' + Convert.convertIndexToCoordinate(row, col, step.lastStep).col +'}' :
        'Go to game start';
        if (move === stepNumber)
        return (
        <li key={move}>
            <button onClick={() => jumpTo(move)} className = "button-bold">{desc}</button>
        </li>
        );
        else 
        return(
        <li key={move}>
            <button onClick={() => jumpTo(move)} className = "button">{desc}</button>
        </li>
        )
    });
    
    let status
    if (winner) {
        status = "Winner: " + winner.winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }
    if (stepNumber == col * row){
        status = "Draw"
    }
    const onChangeSwitch = (checked) => {
        if (checked){
            setIsAscending(false)
        }
        else {
            setIsAscending(true)
        }
    }
    const renderHistory = () => {
        if (!isAscending){
            return moves.reverse()
        }
        return(
            moves
        )
    }
    return (
        <div className="game">
        <div className="game-board">
            <Board
            row = {row}
            col = {col}
            squares={current.squares}
            onClick={i => handleClick(i)}
            bold = {boldSquare}
            />
        </div>
        <div className="game-info">
            <div>{status}</div>
            <ol>
                <Switch checkedChildren = "DSC" unCheckedChildren = "ACS" onChange = {onChangeSwitch}/>
            </ol>
            <ol>{renderHistory()}</ol>
        </div>
        </div>
    );
    
}
export default Game