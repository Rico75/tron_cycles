import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import playGame from "./phaser/scene";

export const config = {
  type: Phaser.AUTO,
  parent: "phaser",
  width: 800,
  height: 500,
  state: this,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: playGame
};

const game = new Phaser.Game(config);

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
