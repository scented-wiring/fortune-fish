import { useEffect, useState } from "react";
import $ from "jquery";

import "../styles/App.css";

const App = () => {
  const [gameStatus, setGameStatus] = useState("initial");
  const [notReadyClick, setNotReadyClick] = useState(0);

  useEffect(() => {
    $("#spotlight-hide").attr("id", "spotlight");
  });

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
      <div>
        <button onClick={() => setGameStatus("palm presented")}>OK</button>
      </div>
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
    message = "He comes.";
    buttons = (
      <div>
        <button onClick={handleFortune}>...</button>
      </div>
    );
  } else if (gameStatus === "fortune-jealousy") {
    message = "The fortune fish has determined you to be a jealous person.";
    buttons = (
      <div>
        <button onClick={() => setGameStatus("try again")}>Try Again</button>
      </div>
    );
  } else if (gameStatus === "fortune-indifferent") {
    message = "The fortune fish has determined that you are indifferent.";
    buttons = (
      <div>
        <button onClick={() => setGameStatus("try again")}>Try Again</button>
      </div>
    );
  } else if (gameStatus === "fortune-love") {
    message = "The fortune fish has determined that you are in love.";
    buttons = (
      <div>
        <button onClick={() => setGameStatus("try again")}>Try Again</button>
      </div>
    );
  } else if (gameStatus === "fortune-fickle") {
    message = "The fortune fish has determined you to be a fickle person.";
    buttons = (
      <div>
        <button onClick={() => setGameStatus("try again")}>Try Again</button>
      </div>
    );
  } else if (gameStatus === "fortune-false") {
    message = "The fortune fish has determined you to be false.";
    buttons = (
      <div>
        <button onClick={() => setGameStatus("try again")}>Try Again</button>
      </div>
    );
  } else if (gameStatus === "fortune-tired") {
    message = "The fortune fish has determined that you are tired.";
    buttons = (
      <div>
        <button onClick={() => setGameStatus("try again")}>Try Again</button>
      </div>
    );
  } else if (gameStatus === "fortune-passionate") {
    message = "The fortune fish has determined you to be a passionate person.";
    buttons = (
      <div>
        <button onClick={() => setGameStatus("try again")}>Try Again</button>
      </div>
    );
  } else if (gameStatus === "try again") {
    message = "You can't have another go. The fish has spoken.";
    buttons = null;
  }

  return (
    <div id="App">
      <h1>Fortune Fish</h1>
      <div id="spotlight-hide" />
      <p id="message">{message}</p>
      <div id="buttons">{buttons}</div>
    </div>
  );
};

export default App;
