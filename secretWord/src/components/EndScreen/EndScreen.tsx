import React from "react";
import "./style/endScreen.css";

const endScreen = ({retry, score}) => {
    return(
        <div>
            <h1>Secret Word</h1>
            <p>Fim de Jogo!</p>
            <h3>Sua Pontuação foi: <span>{score}</span></h3>
            <button onClick={retry}>
                Reiniciar Jogo!
            </button>
        </div>
    )
}

export default endScreen;
