//
//  JS File
//  YOU CAN REMOVE ALL OF THIS CODE AND START FRESH
//

//
// Variables
//

// Constants
const appID="app"
const projectDueDate = "8 December 2023 11:59";

// Variables
let countdownDate = new Date(projectDueDate);

// DOM Elements
let appContainer = document.getElementById(appID);

//
// Functions
//

function calculateDaysLeft(countdownDate) {
  const now = new Date().getTime();
  const countdown = new Date(countdownDate).getTime();

  console.log(countdown);

  const difference = (countdown - now) / 1000;


  // Countdown passed already
  if (difference < 1) {
    return null;
  }


  const days = Math.floor(difference / (60 * 60 * 24));

  return days;
}

// Add a heading to the app container
function inititialise() {
  // If anything is wrong with the app container then end
  if (!appContainer) {
    console.error("Error: Could not find app contianer");
    return;
  }

  // Create an h1 and add it to our app
  const h1 = document.createElement("h1");
  const daysLeft = calculateDaysLeft(countdownDate);
  let headingTextCalculated = headingText;

  if (daysLeft > 1) {
    headingTextCalculated = headingTextCalculated.concat(
      " In ",
      daysLeft.toString(),
      " days "
    );
  }else if (daysLeft === 1) {
    headingTextCalculated = headingTextCalculated.concat(
      " Tomorrow"
    );
  }

  h1.textContent = headingTextCalculated.concat(headingTextIcon);
  appContainer.appendChild(h1);

  // Init complete
  console.log("App successfully initialised");
}

//
// Inits & Event Listeners
//

inititialise();
const gameData = [
[0, 0, 0],
[0, 0, 0],
[0, 0, 0],
];




let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;




const players = [
{
  name: '',
  symbol: 'X',
},
{
  name: '',
  symbol: 'O',
},
];




const playerConfigOverlayElement = document.getElementById('config-overlay');
const backdropElement = document.getElementById('backdrop');
const formElement = document.querySelector('form');
const errorsOutputElement = document.getElementById('config-errors');
const gameAreaElement = document.getElementById('active-game');
const activePlayerNameElement = document.getElementById('active-player-name');
const gameOverElement = document.getElementById('game-over');




const editPlayer1BtnElement = document.getElementById('edit-p1-btn');
const editPlayer2BtnElement = document.getElementById('edit-p2-btn');
const cancelConfigBtnElement = document.getElementById('cancel-config-btn');
const startNeGameBtnElement = document.getElementById('start-game-btn');
const gameBoardElement = document.getElementById('game-board');




editPlayer1BtnElement.addEventListener('click', openPlayerConfig);
editPlayer2BtnElement.addEventListener('click', openPlayerConfig);




cancelConfigBtnElement.addEventListener('click', closePlayerConfig);
backdropElement.addEventListener('click', closePlayerConfig);




formElement.addEventListener('submit', savePlayerConfig);




startNeGameBtnElement.addEventListener('click', startNewGame);




gameBoardElement.addEventListener('click', selectGameField);
function openPlayerConfig(event) {
editedPlayer = +event.target.dataset.playerid; // +'1' => 1
playerConfigOverlayElement.style.display = 'block';
backdropElement.style.display = 'block';
}




function closePlayerConfig() {
playerConfigOverlayElement.style.display = 'none';
backdropElement.style.display = 'none';
formElement.firstElementChild.classList.remove('error');
errorsOutputElement.textContent = '';
formElement.firstElementChild.lastElementChild.value = '';
}




function savePlayerConfig(event) {
event.preventDefault();
const formData = new FormData(event.target);
const enteredPlayerName = formData.get('playername').trim();




if (!enteredPlayerName) {
  event.target.firstElementChild.classList.add('error');
  errorsOutputElement.textContent = 'Please enter a valid name!';
  return;
}




const updatedPlayerDataElement = document.getElementById(
  'player-' + editedPlayer + '-data'
);
updatedPlayerDataElement.children[1].textContent = enteredPlayerName;




players[editedPlayer - 1].name = enteredPlayerName;




closePlayerConfig();
}
function openPlayerConfig(event) {
editedPlayer = +event.target.dataset.playerid; // +'1' => 1
playerConfigOverlayElement.style.display = 'block';
backdropElement.style.display = 'block';
}




function closePlayerConfig() {
playerConfigOverlayElement.style.display = 'none';
backdropElement.style.display = 'none';
formElement.firstElementChild.classList.remove('error');
errorsOutputElement.textContent = '';
formElement.firstElementChild.lastElementChild.value = '';
}




function savePlayerConfig(event) {
event.preventDefault();
const formData = new FormData(event.target);
const enteredPlayerName = formData.get('playername').trim();




if (!enteredPlayerName) {
  event.target.firstElementChild.classList.add('error');
  errorsOutputElement.textContent = 'Please enter a valid name!';
  return;
}




const updatedPlayerDataElement = document.getElementById(
  'player-' + editedPlayer + '-data'
);
updatedPlayerDataElement.children[1].textContent = enteredPlayerName;




players[editedPlayer - 1].name = enteredPlayerName;




closePlayerConfig();
}
function resetGameStatus() {
gameIsOver = false;
activePlayer = 0;
currentRound = 1;
gameOverElement.firstElementChild.innerHTML =
  'You Won! <span id="winner-name">PLAYER NAME</span>';
gameOverElement.style.display = 'none';




let gameBoardIndex = 0;




for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    gameData[i][j] = 0;
    const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
    gameBoardItemElement.textContent = '';
    gameBoardItemElement.classList.remove('disabled');
    gameBoardIndex++;
  }
}
}




function startNewGame() {
if (players[0].name === '' || players[1].name === '') {
  alert('Please set custom player names for both players!');
  return;
}




resetGameStatus();




activePlayerNameElement.textContent = players[activePlayer].name;
gameAreaElement.style.display = 'block';
}




function switchPlayer() {
if (activePlayer === 0) {
  activePlayer = 1;
} else {
  activePlayer = 0;
}




activePlayerNameElement.textContent = players[activePlayer].name;
}




function selectGameField(event) {
if (event.target.tagName != 'LI' || gameIsOver) {
  return;
}




const selectedField = event.target;
const selectedColumn = selectedField.dataset.col - 1;
const selectedRow = selectedField.dataset.row - 1;




if (gameData[selectedRow][selectedColumn] > 0) {
  alert('Please select an empty field!');
  return;
}




selectedField.textContent = players[activePlayer].symbol; // players [0]
selectedField.classList.add('disabled');




gameData[selectedRow][selectedColumn] = activePlayer + 1;
console.log(gameData);




const winnerId = checkForGameOver();




if (winnerId !== 0) {
  endGame(winnerId);
}




currentRound++;
switchPlayer();
}




function checkForGameOver() {
// Checking the rows for equality
for (let i = 0; i < 3; i++) {
  if (
    gameData[i][0] > 0 &&
    gameData[i][0] === gameData[i][1] &&
    gameData[i][1] === gameData[i][2]
  ) {
    return gameData[i][0];
  }
}




// Checking the columns for equality
for (let i = 0; i < 3; i++) {
  if (
    gameData[0][i] > 0 &&
    gameData[0][i] === gameData[1][i] &&
    gameData[0][i] === gameData[2][i]
  ) {
    return gameData[0][i];
  }
}




// Diagonal: Top left tp bottom right
if (
  gameData[0][0] > 0 &&
  gameData[0][0] === gameData[1][1] &&
  gameData[1][1] === gameData[2][2]
) {
  return gameData[0][0];
}




// Diagonal: Top right tp bottom left
if (
  gameData[2][0] > 0 &&
  gameData[2][0] === gameData[1][1] &&
  gameData[1][1] === gameData[0][2]
) {
  return gameData[2][0];
}




if (currentRound === 9) {
  return -1;
}
return 0;
}




function endGame(winnerId) {
gameIsOver = true;
gameOverElement.style.display = 'block';




if (winnerId > 0) {
  const winnerName = players[winnerId - 1].name;
  gameOverElement.firstElementChild.firstElementChild.textContent =
    winnerName;
} else {
  gameOverElement.firstElementChild.textContent = "It's a draw!";
}
}
let player1Wins = 0;
let player2Wins = 0;
function endGame(winnerId) {
gameIsOver = true;
gameOverElement.style.display = 'block';




if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
  
    // Update win count
    if (winnerId === 1) {
        player1Wins++;
        document.getElementById('player1-wins').textContent = player1Wins;
    } else if (winnerId === 2) {
        player2Wins++;
        document.getElementById('player2-wins').textContent = player2Wins;
    }


    // Trigger Confetti
    triggerConfetti();
   } else {
       gameOverElement.firstElementChild.textContent = "It's a draw!";
   }
}




function triggerConfetti() {
 var duration = 5 * 1000;
 var end = Date.now() + duration;


 (function frame() {
     confetti({
         particleCount: 7,
         angle: 60,
         spread: 55,
         origin: { x: 0 },
         colors: ['#EA738D', '#EA738D']
     });


     confetti({
         particleCount: 7,
         angle: 120,
         spread: 55,
         origin: { x: 1 },
         colors: ['#EA738D', '#EA738D']
     });


     if (Date.now() < end) {
         requestAnimationFrame(frame);
     }
 })();
}




function endGame(winnerId) {
 gameIsOver = true;
 gameOverElement.style.display = 'block';


 if (winnerId > 0) {
     const winnerName = players[winnerId - 1].name;
     gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;


    
     if (winnerId === 1) {
         player1Wins++;
         document.getElementById('player1-wins').textContent = player1Wins;
     } else if (winnerId === 2) {
         player2Wins++;
         document.getElementById('player2-wins').textContent = player2Wins;
     }


     triggerConfetti();
 } else {
     gameOverElement.firstElementChild.textContent = "It's a draw!";
 }
}

