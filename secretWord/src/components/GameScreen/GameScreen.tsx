import React, { useRef, useState } from "react";
import "./style/gameScreen.css";

const GameScreen = ({verifyLetters, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score}) => {
   const [letter, setLetter] = useState<string>('');
   const letterRef = useRef<any>(null);
   
    const handleSubmit = (e: any): void => {
        e.preventDefault();

        verifyLetters(letter);
        setLetter('');

        letterRef.current.focus();
    }

    return(
        <div className="game">
            <p className="points">
                <span>Pontuação:</span>
                <span>{score}</span>
            </p>
            <h1>Adivinhe a palavra!</h1>
            <h3 className="tip">
                Dica sobre a palavra: <span>{pickedCategory}</span>
            </h3>
            <p>Você ainda tem {guesses} tentativas</p>
            <div className="wordContainer">
                {letters.map((letter:any , i: any) => (
                    guessedLetters.includes(letter) ? (
                        <span key={i} className="letter">{letter}</span>
                    ) : (
                        <span key={i} className="blankSquare"></span>
                    )
                ))}
            </div>
            <div className="letterContainer">
                <p>Tente adivinhar uma letra da palavra:</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" maxLength={1} required value={letter} ref={letterRef} onChange={(e) => {
                        setLetter(e.target.value);
                    }}/>
                    <button>Jogar!</button>
                </form>
            </div>
            <div className="wrongLettersContainer">
                <p>Letras já utilizadas:</p>
                <span className="wrongLetter">
                    {wrongLetters.map((letter: any, i: any) => (
                        <span key={i}>{letter}, </span>
                    ))}
                    </span>
            </div>
        </div>
    )
}

export default GameScreen;