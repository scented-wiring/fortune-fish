import { useEffect, useState } from "react";
import $ from "jquery";
import hand from "../images/hand.png";
import head from "../images/head.png";
import body from "../images/body.png";
import tail from "../images/tail.png";

import "../styles/App.css";

const App = () => {
  const [gameStatus, setGameStatus] = useState("prefish:initial");
  const [notReadyClick, setNotReadyClick] = useState(0);

  let fortune, message, buttons;

  useEffect(() => {
    //spotlight fades in on load
    $("#spotlight-hide").attr("id", "spotlight");
  });

  if (gameStatus !== "prefish:initial") {
    //hand slides in after initial screen
    $("#hand-hide").attr("id", "hand");
  }

  if (!gameStatus.includes("prefish:")) {
    //fish floats down on cue
    $("#fish-hide").attr("id", "fish");
  }

  if (gameStatus.includes("fortune:")) {
    //set fortune at appropriate time
    fortune = gameStatus.replace("fortune:", "");
  }

  if (gameStatus === "prefish:not ready" && notReadyClick === 3) {
    //hand slides out after three "not ready" presses
    $("#hand").attr("id", "hand-hide");
  }

  const handleFortune = () => {
    setGameStatus("wait");
    const num = Math.floor(Math.random() * 7) + 1;
    if (num === 7) {
      $("#head").attr("id", "head-move");
      setTimeout(() => {
        setGameStatus("Jealous");
      }, 1500);
    }
    if (num === 6) {
      $("#tail").attr("id", "tail-move");
      setTimeout(() => {
        setGameStatus("fortune:Indifferent");
      }, 1500);
    }
    if (num === 5) {
      $("#tail").attr("id", "tail-move");
      $("#head").attr("id", "head-move");
      setTimeout(() => {
        setGameStatus("fortune:In Love");
      }, 1500);
    }
    if (num === 4) {
      $("#tail").attr("id", "tail-curl");
      $("#head").attr("id", "head-curl");
      setTimeout(() => {
        setGameStatus("fortune:Fickle");
      }, 1500);
    }
    if (num === 3) {
      $("#fish").attr("id", "jump");
      setTimeout(() => {
        setGameStatus("fortune:False");
      }, 1500);
    }
    if (num === 2)
      setTimeout(() => {
        setGameStatus("fortune:Tired");
      }, 1500);
    if (num === 1) {
      $("#fish").attr("id", "jump-nose");
      setTimeout(() => {
        setGameStatus("fortune:Passionate");
      }, 1500);
    }
  };

  const handleNotReadyClick = () => {
    setGameStatus("prefish:not ready");
    setNotReadyClick(notReadyClick + 1);
  };

  const readyButtons = ( //avoids repetition
    <div>
      <button onClick={() => setGameStatus("ready")}>Yes</button>
      <button onClick={handleNotReadyClick}>No</button>
    </div>
  );

  if (gameStatus === "prefish:initial") {
    message = "Present your palm, my child.";
    buttons = (
      <div>
        <button onClick={() => setGameStatus("prefish:palm presented")}>
          OK
        </button>
      </div>
    );
  } else if (gameStatus === "prefish:palm presented") {
    message = "Are you ready to hear your fortune?";
    buttons = readyButtons;
  } else if (gameStatus === "prefish:not ready" && notReadyClick === 1) {
    message = "How about now?";
    buttons = readyButtons;
  } else if (gameStatus === "prefish:not ready" && notReadyClick === 2) {
    message = "...Now?";
    buttons = readyButtons;
  } else if (gameStatus === "prefish:not ready" && notReadyClick === 3) {
    message = "Right, just forget it then";
    buttons = null;
  } else if (gameStatus === "ready") {
    message = "He comes...";
    buttons = (
      <div>
        <button onClick={handleFortune}>OK</button>
      </div>
    );
  } else if (gameStatus === "wait") {
    message = null;
    buttons = null;
  } else if (gameStatus === "fortune:Jealous") {
    message =
      "See how the head moves? The fortune fish has determined you to be a jealous person. A most ugly trait.";
    buttons = (
      <div>
        <button onClick={() => setGameStatus("try again")}>Try Again</button>
      </div>
    );
  } else if (gameStatus === "fortune:Indifferent") {
    message =
      "A wagging tail... The fortune fish has determined that you are indifferent. Show a little enthusiasm once in a while.";
    buttons = (
      <div>
        <button onClick={() => setGameStatus("try again")}>Try Again</button>
      </div>
    );
  } else if (gameStatus === "fortune:In Love") {
    message =
      "Ah, he is moving both head and tail. The fortune fish has determined that you are in love. Good for you.";
    buttons = (
      <div>
        <button onClick={() => setGameStatus("try again")}>Try Again</button>
      </div>
    );
  } else if (gameStatus === "fortune:Fickle") {
    message =
      "See how he curls? He has determined that you are a fickle person. You should have courage in your convictions.";
    buttons = (
      <div>
        <button onClick={() => setGameStatus("try again")}>Try Again</button>
      </div>
    );
  } else if (gameStatus === "fortune:False") {
    message =
      "A sick 180 flip! What a sight! But this means the fortune fish has determined you to be false. Try sincerity some time.";
    buttons = (
      <div>
        <button onClick={() => setGameStatus("try again")}>Try Again</button>
      </div>
    );
  } else if (gameStatus === "fortune:Tired") {
    message =
      "The fish is motionless! This means that you are tired, or possibly dead. Have you checked your pulse recently?";
    buttons = (
      <div>
        <button onClick={() => setGameStatus("try again")}>Try Again</button>
      </div>
    );
  } else if (gameStatus === "fortune:Passionate") {
    message =
      "Astounding! This balancing act means that you are a passionate person. What are you doing later?";
    buttons = (
      <div>
        <button onClick={() => setGameStatus("try again")}>Try Again</button>
      </div>
    );
  } else if (gameStatus === "try again") {
    message = "You can't have another go. The fish has spoken. Accept it.";
    buttons = null;
  }
  return (
    <div id="App">
      <h1>FORTUNE FISH</h1>
      <div id="spotlight-hide" />
      <div id="fish-hide">
        <img src={head} alt="fish head" id="head" />
        <img src={body} alt="fish body" id="body" />
        <img src={tail} alt="fish tail" id="tail" />
      </div>
      <img id="hand-hide" src={hand} alt="hand" width="200px" />
      <div id="ui">
        <p id={!fortune ? "fortune-hide" : "fortune"}>
          {!fortune ? null : fortune.toUpperCase()}
        </p>
        <p id="message">{message}</p>
        <div id="buttons">{buttons}</div>
      </div>
    </div>
  );
};

export default App;
