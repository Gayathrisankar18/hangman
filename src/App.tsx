import React , { useState, useEffect } from 'react'
import './App.css'
import HangingManDrawing from './HangingManDrawing';
import words from './wordList.json'

type GameStatusValues = {
  [key: number]: string;
};

const gameStatusValues: GameStatusValues = {
  1: "Winner!",
  2: "Game Over, try again"
}

function App() {
  const [word, setWord] = useState<string>(() => {
    return words[Math.floor(Math.random() * words.length)].toUpperCase()
  });
  const [availableRetry, setAvailableRetry] = useState<number>(6);
  const [correctGuesses, setCorrectGuesses] = useState<Array<string>>([]);
  const [wrongGuesses, setWrongGuesses] = useState<Array<string>>([]);
  const [gameStatus, setGameStatus] = useState<number | null>(null)
  const [time,setTime] = useState<number>(0)
  // const [wordFetchStatus, setWordFetchStatus] = useState<string>('Loading...')

  // useEffect( () => {
  //   // const fetchWord = async() => {
  //   //   const response = await fetch('https://random-word-api.herokuapp.com/word?length=20')
  //   //   const decoded = await response.json() as string[]
  //   //   setWord(decoded[0].toUpperCase())
  //   // }
  //     // fetchWord()
  // }, [])

  // const fetchWord = async () => {
  //   try{
  //   const response = await fetch('https://random-word-api.herokuapp.com/word?length=20');
  //   const decoded = (await response.json()) as string[];
  //   setWord(decoded[0]?.toUpperCase() || '');
  //   setWordFetchStatus('');
  //   setAvailableRetry(6);
  //   setCorrectGuesses([]);
  //   setWrongGuesses([]);
  //   setGameStatus(null);
  //   }catch(e) {
  //     if (e instanceof Error) {
  //       setWordFetchStatus("Error in fetching word, " + e.message)
  //     }
  //   }
  // };

  const handleLetterSelect = (letter: string): void => {
    if(!correctGuesses.includes(letter) && word.includes(letter)) {
      setCorrectGuesses((val) => [...val, letter])
    }
    if(!word.includes(letter)) {
      if(availableRetry === 1) {
        setGameStatus(2)
      }
      setWrongGuesses((val) => [...val, letter])
      setAvailableRetry((val) => val-1)
    }
  }

  useEffect(() => {
    const nonDuplicatedWord = new Set(word.split(''))
    if(word && nonDuplicatedWord.size === correctGuesses.length && correctGuesses.every(l => nonDuplicatedWord.has(l))) {
      setGameStatus(1)
    }
  }, [correctGuesses, word])

  useEffect(() => {
    const timer = setTimeout(() => {
      if(gameStatus === null) {
        setGameStatus(2)
      }
    }, 1000 * 20)
    return () => clearTimeout(timer)
  }, [gameStatus])

  useEffect(() => {
    let timer: number = 0
    if(gameStatus) {
      clearTimeout(timer)
      setTime(0)
    }else {
      timer = setTimeout(() => {
        setTime((time) => time+1)
      }, 1000)
    }
    return () => clearTimeout(timer)
  }, [time, gameStatus])

  return (
      <div className='main-container'>
         {gameStatus && 
            <div className='game-status-message-container'><span>{gameStatusValues[gameStatus]}</span>
            <button onClick={() => window.location.reload()}>Restart</button></div>}
        {word?.length ? 
        <div className='content-wrapper'>
            <div>Time : {time}</div>
           
            <HangingManDrawing availableRetry={availableRetry}/>
          
          <>
        <div className='word-container'>
        
          {word.split('').map((letter, index) => {
            return <div key={index} className='letter-container'>
              <span className={`letter ${correctGuesses.includes(letter) ? 'selected' : ''} ${(gameStatus === 2 && !correctGuesses.includes(letter)) ? 'gameOver': ''}`}>{letter}</span>
              <hr className='horizontal-line'/>
              </div>
          })}
        </div>
        <div className="letter-buttons-container">
        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        .map((letter, index) => {
          return <button 
          key={`${letter}-${index}`} 
          onClick={(e) => handleLetterSelect((e.target as HTMLButtonElement).value)} 
          value={letter}
          className={`${correctGuesses.includes(letter) && 'letter-button-selected'} letter-button`}
          disabled={wrongGuesses.includes(letter) || !!gameStatus}
          >
            {letter}
          </button>
        })}
        </div>
        </>
        </div>: <span>{wordFetchStatus}</span>}
      </div>
  )
}

export default App
