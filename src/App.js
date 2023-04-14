import React, { useState } from 'react';
import ModalDialog from './components/Modal';
// Write an N x N game of tic tac toe meant to be run in the browser. 

// Two players, at the same computer, will play the game. Player one will begin by placing an 'X' in some spot.
// Player 2 will follow by placing an 'O' in some spot. Once there are N 'X's or N 'O's in a row horizontally, vertically, or diagonally
// A winner should be declared.

// If there is no winner and there are no more spots, a tie should be declared.

// Use react functional components to construct the board and the game logic.

// -----------------------------------------Write your code below this point-----------------------------------------------------
  
Array.prototype.count = function(item) {
  let appearance = 0;
  this.forEach(index=> {
    if (index === item)
      appearance++
  })
  return appearance;
}

export default function TicTacToe(n) {
  n=3;
  const x = 'X';
  const o = 'O';
  

  //Fill the value of N in the array
  let initialBoard = Array.from({length: n}, e => Array(n).fill(undefined));
  
  //The Array containing N letters
  const [gameBoard, setGameBoard] = useState(initialBoard);
  const [turn, setTurn] = useState(true);
  const [gameWon, setGameWon] = useState(false);

  //Function to Check each section of the array for N X's and O's
  function checkForWin() {
    //Horizontal Check
    for(let i=0; i<gameBoard.length; i++) {
      if (gameBoard[i].count(x)===n) return x;
      else if (gameBoard[i].count(o)===n) return o;
    }  
    
    //Vertical Check
    let xCount=0;
    let oCount=0;
    for(let i=0; i<gameBoard.length; i++) {
      for(let j=0; j<gameBoard.length; j++) {
        if (gameBoard[j][i]===x) xCount++;
        else if (gameBoard[j][i]===o) oCount++;
      }
      if (xCount===n) return x;
      else if (oCount===n) return o;
      xCount=0;
      oCount=0;
    }

    //Diagonal Check
    let xDCount=0;
    let oDCount=0;
    for(let i=0; i<gameBoard.length; i++) {
      if (gameBoard[i][i]===x) xDCount++;
      else if (gameBoard[i][i]===o) oDCount++;
      if (xDCount===n) return x;
      else if (oDCount===n) return o;
    }
    xDCount=0;
    oDCount=0;


    //Diagonal Check
    let xOppDCount=0;
    let oOppDCount=0;
    let inverse=n-1;
    for(let i=0; i<gameBoard.length; i++) {
      if (gameBoard[i][inverse]===x) xOppDCount++;
      else if (gameBoard[i][inverse]===o) oOppDCount++;
      if (xOppDCount===n) return x;
      else if (oOppDCount===n) return o;
      inverse--;
    }
    xOppDCount=0;
    oOppDCount=0;
  }

  //Function to place X's and O's in the array
  function placeXAndO(outerIndex, innerIndex) {
    //Determine the current Turn
    function currentTurn(){
      let currentTurn = turn ? 'X' : 'O';
      setTurn((prev)=>!prev);
      return currentTurn;
    }

    // Place X or O
    if (gameBoard[outerIndex][innerIndex]===undefined){
      gameBoard[outerIndex][innerIndex]=currentTurn();
      // setGameBoard(prev=>{
      //     let currPrev = [...prev];
      //     currPrev[outerIndex][innerIndex]=currentTurn();
      //     console.log(outerIndex);
      //     console.log(innerIndex);
      //     console.log(currPrev);
      //     return currPrev
      // })
    }
    
    if(checkForWin()) {
      setGameWon(()=>checkForWin())
      setGameBoard(initialBoard)
    }
  }
  
  return(  
    <section 
      style={{
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#3CAAFD'
      }}
    >
      <ModalDialog gameWon={gameWon} setGameWon={setGameWon} />
      <h1 className="display-5" style={{color: 'white'}}>TicTacToe</h1>
      <div 
        style={{
          backgroundColor: 'white',
          border: '3px solid black',
          borderRadius: '25px',
          overflow: 'hidden'
        }}
      >
        
        {gameBoard.map((item, outerIndex)=>{     
          return(
            <div
              key={outerIndex}
              style={{
                display: 'flex', 
                direction: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {item.map((itemEach, innerIndex)=>{
                  return (
                    <h1 
                      key={innerIndex}
                      style={{
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0,
                        margin: 0,
                        textAlign: 'center',
                        width: '60px',
                        height: '60px',
                        border: '1px solid black'
                      }} 
                      onClick={()=>placeXAndO(outerIndex, innerIndex)}
                    >
                      {itemEach}
                    </h1>
                  )
              })}
            </div>
            )
          }
          )
        }
      </div>
    </section>
  );
}
