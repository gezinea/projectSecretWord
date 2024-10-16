import "./style/startScreen.css";

const startScreen = ({startGame}: {startGame: () => void}) => {
    return(
        <div className="start">
            <h1>Secret Word</h1>
            <p>Clique no botão abaixo para iniciar o jogo!</p>
            <button onClick={startGame}>
                Iniciar Jogo!
            </button>
        </div>
    )
}

export default startScreen;