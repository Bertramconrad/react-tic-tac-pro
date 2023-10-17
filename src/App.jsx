import { useState } from 'react';
import './styles.css'

function Square({value, onSquareClick}){
  return <button className="square" onClick={onSquareClick}>{value}</button>;
  //return <button className="square" onClick={onSquareClick}>{value===null ? " " : null}</button>;
}

function Board({xIsNext, squares, onPlay}){
/*   const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null)); */

  function handleClick(i){
    const nextSquares = squares.slice();
    if (nextSquares[i] || calculateWinner(squares)){
      return;
    }
    if (xIsNext){
      nextSquares[i] = 'X';
    }
    else{
      nextSquares[i] = 'O';

    }
    //setXIsNext(!xIsNext);
    onPlay(nextSquares);
  }

  const winner = calculateWinner (squares);
  let description;
  if (winner){
    description = 'The winner is: ' + winner;
  }
  else{
    description = 'The ' + (xIsNext ? 'X':'O') + ' is playing';
  }

  return(
    <div>
     <div className="status">{description}</div>
     <div className="board-row">
      <Square value={squares[0]} onSquareClick={()=>{handleClick(0)}}/>
      <Square value={squares[1]} onSquareClick={()=>{handleClick(1)}}/>
      <Square value={squares[2]} onSquareClick={()=>{handleClick(2)}}/>     
     </div>
     <div className="board-row">
      <Square value={squares[3]} onSquareClick={()=>{handleClick(3)}}/>
      <Square value={squares[4]} onSquareClick={()=>{handleClick(4)}}/>
      <Square value={squares[5]} onSquareClick={()=>{handleClick(5)}}/>    
     </div>
     <div className="board-row"> 
      <Square value={squares[6]} onSquareClick={()=>{handleClick(6)}}/>
      <Square value={squares[7]} onSquareClick={()=>{handleClick(7)}}/>
      <Square value={squares[8]} onSquareClick={()=>{handleClick(8)}}/>     
     </div>
    </div>
  )
}

export default function game(){
  //const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  //const currentSquares = history[history.length-1]
  
  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0,currentMove + 1),nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    //setXIsNext(!xIsNext);
    //setHistory([...history,nextSquares]);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    //setXIsNext(nextMove % 2 ===0); 
  }
  
  const moves = history.map((squares, move) => {
    let description;
    if(move >0 ){
      description = 'Go to move #' + move;
    }else{
      description = '***Go to GAME START***';
    }
     
    return(
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>      
      </li>
    );
  })

  return(
    <div>
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
    </div>
  )
}

function calculateWinner(squares){
  const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ];

    for (let i=0; i<lines.length; i++){
      const [a,b,c] = lines[i];
      if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
        return squares[a];
      }
    }
  return null;
}