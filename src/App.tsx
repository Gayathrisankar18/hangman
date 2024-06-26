import React , { useState, useEffect } from 'react'
import './App.css'

type GameStatusValues = {
  [key: number]: string;
};

const gameStatusValues: GameStatusValues = {
  1: "Winner!",
  2: "Game Over, try again"
}

function App() {
  const [word, setWord] = useState<string>('');
  const [availableRetry, setAvailableRetry] = useState<number>(6);
  const [correctGuesses, setCorrectGuesses] = useState<Array<string>>([]);
  const [wrongGuesses, setWrongGuesses] = useState<Array<string>>([]);
  const [gameStatus, setGameStatus] = useState<number | null>(null)


  useEffect( () => {
    // const fetchWord = async() => {
    //   const response = await fetch('https://random-word-api.herokuapp.com/word?length=5')
    //   const decoded = await response.json() as string[]
    //   setWord(decoded[0].toUpperCase())
    // }
    fetchWord()
  }, [])

  const fetchWord = async () => {
    const response = await fetch('https://random-word-api.herokuapp.com/word?length=5');
    const decoded = (await response.json()) as string[];
    setWord(decoded[0]?.toUpperCase() || '');
    setAvailableRetry(6);
    setCorrectGuesses([]);
    setWrongGuesses([]);
    setGameStatus(null);
  };

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

  return (
      <div className='main-container'>
        {word?.length ? 
        <div className='content-wrapper'>
            {gameStatus == 2 && <div><span>{gameStatusValues[gameStatus]}</span>
            <button onClick={fetchWord}>Restart</button></div>}
          {gameStatus == 1 ? <div>
            <span>{gameStatusValues[gameStatus]}</span>
            <button onClick={fetchWord}>Restart</button>
            </div> : 
          <>
        <div className='word-container'>
        
          {word.split('').map((letter, index) => {
            return <div key={index} className='letter-container'>
              <span className={`letter ${correctGuesses.includes(letter) ? 'selected' : ''} ${gameStatus === 2 ? 'gameOver': ''}`}>{letter}</span>
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
          className={`${correctGuesses.includes(letter) && 'letter-button-selected'}`}
          disabled={wrongGuesses.includes(letter) || gameStatus === 2}
          >
            {letter}
          </button>
        })}
        </div>
        </> }
        </div>: <span>Loading....</span>}
        
      </div>
  )
}

export default App
