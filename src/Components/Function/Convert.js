const convertIndexToCoordinate = (maxRow, maxCol, index) => {
    let col = index % maxCol
    let row = Math.floor(index / maxRow)
    return {row, col}
}
const convertCoordinateToIndex = (maxRow, maxCol, coorDinate) => {
    return (coorDinate.row * maxCol + coorDinate.col) 
}

let Convert = {
    convertIndexToCoordinate,
    convertCoordinateToIndex
}
export default Convert