// Initialise variable
const result_div = document.getElementById("result");
const rock_img = document.getElementById("r").querySelector("img");
const paper_img = document.getElementById("p").querySelector("img");
const scissor_img = document.getElementById("s").querySelector("img");
const refresh_img = document.getElementById("refresh");

// MAIN LOGIC
const CHOICE_MAPPING = {
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

// Random Computer choice Function
function getComputerChoice() {
  const randNum = Math.floor(Math.random() * 3);
  return randNum === 0 ? "r" : randNum === 1 ? "p" : "s";
}

//Reset for effect
function resetEffect() {
  const resultColor = ["red", "green", "brown"];
  Array.from(document.querySelectorAll(".main__choice > div")).forEach(
    (node) => (node.className = "")
  );
  result_div.classList.remove(...resultColor);
}

// Result Effect to DOM Function
function resultEffect(result, userChoice, compChoice) {
  switch (result) {
    case "win":
      resetEffect();
      result_div.querySelector("h1").innerHTML = "Player 1 win";
      document.getElementById(userChoice).classList.add("win-div");
      document.getElementById(`comp_${compChoice}`).classList.add("lose-div");
      result_div.classList.add("green");
      break;
    case "lose":
      resetEffect();
      result_div.querySelector("h1").innerHTML = "Comp win";
      document.getElementById(userChoice).classList.add("lose-div");
      document.getElementById(`comp_${compChoice}`).classList.add("win-div");
      result_div.classList.add("red");
      break;
    case "draw":
      resetEffect();
      result_div.querySelector("h1").innerHTML = "draw";
      document.getElementById(userChoice).classList.add("draw-div");
      document.getElementById(`comp_${compChoice}`).classList.add("draw-div");
      result_div.classList.add("brown");
      break;
  }
}
// Reset button function
function reset() {
  resetEffect();
  result_div.classList.remove("main-result__changeto");
  result_div.querySelector("h1").classList.remove("main-result__text");
  result_div.querySelector("h1").innerHTML = "vs";
}
// Declare gameplay function
function rps(userChoice) {
  const compChoice = getComputerChoice();
  const result = CHOICE_MAPPING[userChoice][compChoice];
  resultEffect(result, userChoice, compChoice);
  result_div.classList.add("main-result__changeto");
  result_div.querySelector("h1").classList.add("main-result__text");
}

// Add listener to all button
function play() {
  rock_img.addEventListener("click", () => rps("r"));
  paper_img.addEventListener("click", () => rps("p"));
  scissor_img.addEventListener("click", () => rps("s"));
  refresh_img.addEventListener("click", () => reset());
}
play();
