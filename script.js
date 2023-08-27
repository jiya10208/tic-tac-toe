let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");
let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);
let xpoint = 0;
let opoint = 0;
let player1 = document.getElementById("p1");
let player2 = document.getElementById("p2");
let boxes = Array.from(document.getElementsByClassName("box"));
const o_text = "O";

const x_text = "X";
let currentPlayer = x_text;
let spaces = Array(9).fill(null);

const startgame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxclick));
};

function nulcountcheck() {
  var nullcount = 0;
  for (let i = 0; i < spaces.length; i++) {
    if (!spaces[i]) {
      nullcount++;
    }
  }
  if (nullcount == 0) {
    playerText.innerHTML = `tie game`;
    setTimeout(() => {
      restart();
    }, 3000);

    setTimeout(() => {
      playerText.innerHTML = "TIC TAC TOE";
    }, 4000);
  }
}

function boxclick(e) {
  // console.log(e.target)
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    nulcountcheck();

    if (playerhaswon() !== false) {
      playerText.innerHTML = `${currentPlayer} has won`;
      currentPlayer == x_text ? xpoint++ : opoint++;
      player1.innerHTML = "X PLAYER " + xpoint;
      player2.innerHTML = "O PLAYER " + opoint;
      let winning_blocks = playerhaswon();
      setTimeout(() => {
        restart();
      }, 3000);
      setTimeout(() => {
        playerText.innerHTML = "TIC TAC TOE";
      }, 4000);

      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );
      return;
    }

    currentPlayer = currentPlayer == x_text ? o_text : x_text;

    currentPlayer == x_text
      ? (player1.style.backgroundColor = "red")
      : (player1.style.backgroundColor = "black");

    currentPlayer == o_text
      ? (player2.style.backgroundColor = "red")
      : (player2.style.backgroundColor = "black");
  }
}

const winningcombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [0, 3, 6],
  [2, 5, 8],
];

function playerhaswon() {
  for (const condition of winningcombo) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

function restart() {
  spaces.fill(null);
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });

  playerText.innerHTML = `TIC TAC TOE`;
  currentPlayer = x_text;
  oneplay = false;
}

restartBtn.addEventListener("click", restart);

startgame();
