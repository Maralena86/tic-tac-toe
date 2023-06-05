
import './App.css'
import { useState } from 'react'
 
console.log('hola')
const CHOICES = {
  x: 'x',
  o: 'o'

}

const Square = ({children, isSelected, updateBoard, index}) =>
 {
  const className = `square ${isSelected ? 'is-selected':''}` 
  const handleClick = () => {
    updateBoard(index)
  }
  return(
    <div onClick ={handleClick} className={className}>
     {children}
    </div>
  )
 }

 const WINNER_SPACES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
 ]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  console.log= board

  const [turn, setTurn] = useState(CHOICES.x)

  //null=no winner, false=equal
  const [winner, setWinner] = useState(null) 

  const checkWinner = (boardToCheck) => {
    for(const combo of WINNER_SPACES){
      const [a,b,c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a]=== boardToCheck[c]

      ){
        alert(`The ${boardToCheck[a]} wins`)
        return boardToCheck[a];
      }
      
    }
    return null
  }

  const updateBoard = (index) => {
    //If there's a value in the square we cannot rewrite
    if (board[index] || winner)return;
    //Board's actualisation
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    //New player can play, it's the turn with the choice alternate "x", "o"
    const newChoice = turn === CHOICES.x ? CHOICES.o : CHOICES.x;
    setTurn(newChoice);
    //Verifies  if there's a winner
    const newWinner = checkWinner(newBoard);
    

    if(newWinner){
      setWinner(newWinner);
    }
  }

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setWinner(null)
    setTurn(CHOICES.x)
  }
  

  return (
    <>
      <h1>Tic tac toe</h1>
      <div className='grid-game' >
        {
          board.map((_, index)=>{
            return(
              <Square key={index} index={index} updateBoard = {updateBoard}>{board[index]}</Square>
            )
          })
        }
        </div>
        <div className='choice-container'>
          <Square isSelected={turn === CHOICES.x}>{CHOICES.x}</Square>
          <Square isSelected={turn === CHOICES.o}>{CHOICES.o}</Square>
        </div>
        {
          winner != null && (
          <div>
            <h2>
              {
              winner === false ? 'Equal':'Win'
              }
            </h2>
            <button onClick={resetGame}>New game</button>
           </div>
    
          )
        }
      

    </>
  )
}

export default App
