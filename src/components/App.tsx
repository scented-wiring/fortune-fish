import { useEffect, useState } from "react";
import $ from "jquery";
import hand from "../images/hand.png";
import head from "../images/head.png";
import body from "../images/body.png";
import tail from "../images/tail.png";

import "../styles/App.css";

const App = () => {
  const [gameStatus, setGameStatus] = useState("initial");
  const [notReadyClick, setNotReadyClick] = useState(0);

  useEffect(() => {
    $("#spotlight-hide").attr("id", "spotlight");
    if (gameStatus !== "initial") {
      $("#hand-hide").attr("id", "hand");
    }
    if (
      gameStatus !== "initial" &&
      gameStatus !== "palm presented" &&
      gameStatus !== "not ready"
    ) {
      $("#fish-hide").attr("id", "fish");
    }
  });

  let message, buttons;

  const handleNotReadyClick = () => {
    setGameStatus("not ready");
    setNotReadyClick(notReadyClick + 1);
  };

  const handleFortune = () => {
    const num = Math.floor(Math.random() * 7) + 1;
    if (num === 7) {
      setGameStatus("fortune-jealousy");
      $("#head").attr("id", "head-move");
    }
    if (num === 6) {
      setGameStatus("fortune-indifferent");
      $("#tail").attr("id", "tail-move");
    }
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
      <div id="fish-hide">
        <img src={head} alt="fish head" id="head" />
        <img src={body} alt="fish body" id="body" />
        <img src={tail} alt="fish tail" id="tail" />
      </div>
      <img id="hand-hide" src={hand} alt="hand" width="200px" />
      <div id="ui">
        <p id="message">{message}</p>
        <div id="buttons">{buttons}</div>
      </div>
    </div>
  );
};

export default App;
