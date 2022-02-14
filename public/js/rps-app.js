// Main Logic of RPS rules
class GameLogic {
  // Needs 2 inputs => userChoice & compChoice
  // Choices must be a acronym value of rock/paper/scissor (r/p/s)
  constructor(userChoice, compChoice) {
    this.userChoice = userChoice
    this.compChoice = compChoice
  }

  match() {
    // Declare mapping object
    const CHOICE_MAPPING = {
      r: {
        s: 'win',
        p: 'lose',
        r: 'draw',
      },
      p: {
        r: 'win',
        s: 'lose',
        p: 'draw',
      },
      s: {
        p: 'win',
        r: 'lose',
        s: 'draw',
      },
    }
    return CHOICE_MAPPING[this.userChoice][this.compChoice]
  }
}

// Player class can managed both sides requirements
// Player class is also as an Top Abstraction Level
class Player {
  constructor() {
    this.choice = ''
    this.points = 0
  }

  getPoints() {
    return this.points
  }

  addPoints() {
    this.points++
  }
}

// Make UserPlayer as inheritance of Player
class UserPlayer extends Player {
  constructor(choice) {
    super(choice)
  }
  getUserChoice(choice) {
    this.choice = choice
  }
}

// Make CompPlayer as inheritance of Player
class CompPlayer extends Player {
  constructor(choice) {
    super(choice)
  }
  setRandomChoice() {
    const randNum = Math.floor(Math.random() * 3)
    this.choice = randNum === 0 ? 'r' : randNum === 1 ? 'p' : 's'
  }
}

class GameFlow {
  constructor() {
    this.result_div = document.getElementById('result')
    this.rock_img = document.getElementById('r').querySelector('img')
    this.paper_img = document.getElementById('p').querySelector('img')
    this.scissor_img = document.getElementById('s').querySelector('img')
    this.refresh_img = document.getElementById('refresh')
    this.userPoint_div = document.getElementById('user-point')
    this.compPoint_div = document.getElementById('comp-point')
    this.user = new UserPlayer()
    this.comp = new CompPlayer()
    this.thresholdPoint = 6
  }

  #resetEffect() {
    const resultColor = ['red', 'green', 'brown']
    Array.from(document.querySelectorAll('.main__choice > div')).forEach(
      (node) => (node.className = '')
    )
    this.result_div.classList.remove(...resultColor)
    this.userPoint_div.innerHTML = this.user.getPoints()
    this.compPoint_div.innerHTML = this.comp.getPoints()
  }

  #reset() {
    this.user.points = 0
    this.comp.points = 0
    this.#resetEffect()
    this.result_div.classList.remove('main-result__changeto')
    this.result_div.querySelector('h1').classList.remove('main-result__text')
    this.result_div.querySelector('h1').innerHTML = 'vs'
  }

  async #postScoreHistory(value = 1) {
    try {
      const response = await fetch('/histories', {
        method: 'POST',
        body: JSON.stringify({
          score: value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  #resultEffect(result, userChoice, compChoice) {
    switch (result) {
      case 'win':
        this.#resetEffect()
        this.result_div.querySelector('h1').innerHTML = 'Player 1 win'
        document.getElementById(userChoice).classList.add('win-div')
        document.getElementById(`comp_${compChoice}`).classList.add('lose-div')
        this.result_div.classList.add('green')
        this.user.addPoints()
        // this.#postScoreHistory(1)
        break
      case 'lose':
        this.#resetEffect()
        this.result_div.querySelector('h1').innerHTML = 'Comp win'
        document.getElementById(userChoice).classList.add('lose-div')
        document.getElementById(`comp_${compChoice}`).classList.add('win-div')
        this.result_div.classList.add('red')
        this.comp.addPoints()
        // this.#postScoreHistory(-1)
        break
      case 'draw':
        this.#resetEffect()
        this.result_div.querySelector('h1').innerHTML = 'draw'
        document.getElementById(userChoice).classList.add('draw-div')
        document.getElementById(`comp_${compChoice}`).classList.add('draw-div')
        this.result_div.classList.add('brown')
        // this.#postScoreHistory(0)
        break
    }
    this.userPoint_div.innerHTML = this.user.getPoints()
    this.compPoint_div.innerHTML = this.comp.getPoints()
  }

  #rps(clickedChoice) {
    // Get both side choices
    this.user.getUserChoice(clickedChoice)
    this.comp.setRandomChoice()
    console.log('GAME IS STARTED')

    // Initialize Choices to variables
    const userChoice = this.user.choice
    console.log(`User Choice: ${userChoice}`)
    const compChoice = this.comp.choice
    console.log(`Computer Choice: ${compChoice}`)

    // Run the game with GameLogic instance and Get result
    const game = new GameLogic(userChoice, compChoice)
    const result = game.match()

    console.log(`Result: ${result}`)

    // Apply result effect to UI and score
    this.#resultEffect(result, userChoice, compChoice)
    console.log(`[User, Comp]: [${this.user.points}, ${this.comp.points}]`)
    console.log('--------------------')

    // Threshold Logic
    const userPoints = this.user.points
    const compPoints = this.comp.points
    if (userPoints + compPoints === this.thresholdPoint) {
      this.userPoint_div.innerHTML = this.user.getPoints()
      this.compPoint_div.innerHTML = this.comp.getPoints()
      this.#postScoreHistory(
        userPoints > compPoints ? 1 : userPoints < compPoints ? -1 : 0
      )
      alert(
        `Game Result: ${
          userPoints > compPoints
            ? `You win! with score ${userPoints} : ${compPoints}`
            : userPoints < compPoints
            ? `You lose! with score ${userPoints} : ${compPoints}`
            : 'Draw!'
        }`
      )
      this.#reset()
    }
    this.result_div.classList.add('main-result__changeto')
    this.result_div.querySelector('h1').classList.add('main-result__text')
  }

  play() {
    this.rock_img.addEventListener('click', () => this.#rps('r'))
    this.paper_img.addEventListener('click', () => this.#rps('p'))
    this.scissor_img.addEventListener('click', () => this.#rps('s'))
    this.refresh_img.addEventListener('click', () => this.#reset())
  }
}

const playRPS = new GameFlow()
playRPS.play()
