import './App.css'
import { useEffect, useState } from 'react';
import { wordsList } from './data/words';

import StartScreen from './components/startScreen/startScreen';
import Game from './components/GameScreen/GameScreen';
import EndScreen from './components/EndScreen/EndScreen';

const stages = [
{id: 1, name: "start"},
{id: 2, name: "game"},
{id: 3, name: "end"}
]

const guessesQty = 3;


function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  useEffect(() => {

    if(guesses <= 0){
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses])

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];
    if(uniqueLetters.length === guessedLetters.length){
      setScore((actualScore) => actualScore += 100);

      startGame();
    }

  },[guessedLetters])

  const pickWordAndCategory = () => {
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    console.log(category);
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
      console.log(word);
      setPickedWord(word);
      setPickedCategory(category);

      return {word, category}
  }

  const startGame = () => {
    clearLetterStates();
    
    const {word, category} = pickWordAndCategory();

    let letters = word.split('');
    letters = letters.map((l) => l.toLowerCase());

    setLetters(letters);
    setGameStage(stages[1].name);
  }

  const verifyLetters = (letter: string) => {
    const normalizedLetter= letter.toLowerCase();
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }

    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  }

  const retry = () => {
    setGuesses(guessesQty);
    setScore(0);
    setWrongLetters([]);
    setGuessedLetters([]);

    setGameStage(stages[0].name);
  }

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }


  return (
      <div className="App">
        {gameStage === "start" && <StartScreen startGame={startGame} />}
        {gameStage === "game" && 
        (<Game 
          verifyLetters={verifyLetters} 
          pickedWord={pickedWord} 
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
         />)}
        {gameStage === "end" && <EndScreen retry={retry} score={score} />}
      </div>
  );
}

export default App
