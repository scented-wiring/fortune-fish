import { useState } from "react";

import "../styles/App.css";

const App = () => {
  const [gameStatus, setGameStatus] = useState("initial");
  const [notReadyClick, setNotReadyClick] = useState(0);

  let message, buttons;

  const handleNotReadyClick = () => {
    setGameStatus("not ready");
    setNotReadyClick(notReadyClick + 1);
  };

  const handleFortune = () => {
    const num = Math.floor(Math.random() * 7) + 1;
    if (num === 7) setGameStatus("fortune-jealousy");
    if (num === 6) setGameStatus("fortune-indifferent");
    if (num === 5) setGameStatus("fortune-love");
    if (num === 4) setGameStatus("fortune-fickle");
    if (num === 3) setGameStatus("fortune-false");
    if (num === 2) setGameStatus("fortune-tired");
    if (num === 1) setGameStatus("fortune-passionate");
  };

  if (gameStatus === "initial") {
    message = "Present your palm, my child.";
    buttons = (
      <button onClick={() => setGameStatus("palm presented")}>OK</button>
    );
  } else if (gameStatus === "palm presented") {
    message = "Are you ready to hear your fortune?";
    buttons = (
      <div>
        <button onClick={() => setGameStatus("ready")}>Yes</button>
        <button onClick={handleNotReadyClick}>No</button>
      </div>
    );
  } else if (gameStatus === "not ready" && notReadyClick === 1) {
    message = "How about now?";
    buttons = (
      <div>
        <button onClick={() => setGameStatus("ready")}>Yes</button>
        <button onClick={handleNotReadyClick}>No</button>
      </div>
    );
  } else if (gameStatus === "not ready" && notReadyClick === 2) {
    message = "...Now?";
    buttons = (
      <div>
        <button onClick={() => setGameStatus("ready")}>Yes</button>
        <button onClick={handleNotReadyClick}>No</button>
      </div>
    );
  } else if (gameStatus === "not ready" && notReadyClick === 3) {
    message = "Right, just forget it then";
    buttons = null;
  } else if (gameStatus === "ready") {
    message = "Here comes the fish";
    buttons = <button onClick={handleFortune}>...</button>;
  } else if (gameStatus === "fortune-jealousy") {
    message = "The fortune fish has determined you to be a jealous person.";
    buttons = (
      <button onClick={() => setGameStatus("try again")}>Try Again</button>
    );
  } else if (gameStatus === "fortune-indifferent") {
    message = "The fortune fish has determined that you are indifferent.";
    buttons = (
      <button onClick={() => setGameStatus("try again")}>Try Again</button>
    );
  } else if (gameStatus === "fortune-love") {
    message = "The fortune fish has determined that you are in love.";
    buttons = (
      <button onClick={() => setGameStatus("try again")}>Try Again</button>
    );
  } else if (gameStatus === "fortune-fickle") {
    message = "The fortune fish has determined you to be a fickle person.";
    buttons = (
      <button onClick={() => setGameStatus("try again")}>Try Again</button>
    );
  } else if (gameStatus === "fortune-false") {
    message = "The fortune fish has determined you to be false.";
    buttons = (
      <button onClick={() => setGameStatus("try again")}>Try Again</button>
    );
  } else if (gameStatus === "fortune-tired") {
    message = "The fortune fish has determined that you are tired.";
    buttons = (
      <button onClick={() => setGameStatus("try again")}>Try Again</button>
    );
  } else if (gameStatus === "fortune-passionate") {
    message = "The fortune fish has determined you to be a passionate person.";
    buttons = (
      <button onClick={() => setGameStatus("try again")}>Try Again</button>
    );
  } else if (gameStatus === "try again") {
    message = "You can't have another go. The fish has spoken.";
    buttons = null;
  }

  return (
    <div className="App">
      <h1>Fortune Fish</h1>
      <p>{message}</p>
      {buttons}
    </div>
  );
};

export default App;
