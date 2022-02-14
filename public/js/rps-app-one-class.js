"use strict";

class RPS {
  constructor() {
    this.result_div = document.getElementById("result");
    this.rock_img = document.getElementById("r").querySelector("img");
    this.paper_img = document.getElementById("p").querySelector("img");
    this.scissor_img = document.getElementById("s").querySelector("img");
    this.refresh_img = document.getElementById("refresh");
    this.CHOICE_MAPPING = {
      r: {
        s: "win",
        p: "lose",
        r: "draw",
      },
      p: {
        r: "win",
        s: "lose",
        p: "draw",
      },
      s: {
        p: "win",
        r: "lose",
        s: "draw",
      },
    };
  }

  resetEffect() {
    const resultColor = ["red", "green", "brown"];
    Array.from(document.querySelectorAll(".main__choice > div")).forEach(
      (node) => (node.className = "")
    );
    this.result_div.classList.remove(...resultColor);
  }

  reset() {
    this.resetEffect();
    this.result_div.classList.remove("main-result__changeto");
    this.result_div.querySelector("h1").classList.remove("main-result__text");
    this.result_div.querySelector("h1").innerHTML = "vs";
  }

  getComputerChoice() {
    const randNum = Math.floor(Math.random() * 3);
    return randNum === 0 ? "r" : randNum === 1 ? "p" : "s";
  }

  resultEffect(result, userChoice, compChoice) {
    switch (result) {
      case "win":
        this.resetEffect();
        this.result_div.querySelector("h1").innerHTML = "Player 1 win";
        document.getElementById(userChoice).classList.add("win-div");
        document.getElementById(`comp_${compChoice}`).classList.add("lose-div");
        this.result_div.classList.add("green");
        break;
      case "lose":
        this.resetEffect();
        this.result_div.querySelector("h1").innerHTML = "Comp win";
        document.getElementById(userChoice).classList.add("lose-div");
        document.getElementById(`comp_${compChoice}`).classList.add("win-div");
        this.result_div.classList.add("red");
        break;
      case "draw":
        this.resetEffect();
        this.result_div.querySelector("h1").innerHTML = "draw";
        document.getElementById(userChoice).classList.add("draw-div");
        document.getElementById(`comp_${compChoice}`).classList.add("draw-div");
        this.result_div.classList.add("brown");
        break;
    }
  }

  rps(userChoice) {
    const compChoice = this.getComputerChoice();
    const result = this.CHOICE_MAPPING[userChoice][compChoice];
    this.resultEffect(result, userChoice, compChoice);
    this.result_div.classList.add("main-result__changeto");
    this.result_div.querySelector("h1").classList.add("main-result__text");
  }
  play() {
    this.rock_img.addEventListener("click", () => this.rps("r"));
    this.paper_img.addEventListener("click", () => this.rps("p"));
    this.scissor_img.addEventListener("click", () => this.rps("s"));
    this.refresh_img.addEventListener("click", () => this.reset());
  }
}

const playRPS = new RPS();
playRPS.play();
