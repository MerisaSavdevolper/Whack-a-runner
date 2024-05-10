const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#startButton');
const score = document.querySelector('#score'); 
const timerDisplay = document.querySelector('#timer');

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard"
let gameEnded = false;
let currentMoleTile;
let currentPlantTile;
let health = 3;

/**
 * Generates a random integer within a range.
 *
 * The function takes two values as parameters that limits the range 
 * of the number to be generated. For example, calling randomInteger(0,10)
 * will return a random integer between 0 and 10. Calling randomInteger(10,200)
 * will return a random integer between 10 and 200.
 *
 */
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  // return Math.floor(Math.random() * (max - min + 1)) + min;


/**
 * Sets the time delay given a difficulty parameter.
 *
 * The function takes a `difficulty` parameter that can have three values: `easy`
 * `normal` or `hard`. If difficulty is "easy" then the function returns a time delay
 * of 1500 milliseconds (or 1.5 seconds). If the difficulty is set to "normal" it should
 * return 1000. If difficulty is set to "hard" it should return a randomInteger between
 * 600 and 1200.
 *
 * Example: 
 * setDelay("easy") //> returns 1500
 * setDelay("normal") //> returns 1000
 * setDelay("hard") //> returns 856 (returns a random number between 600 and 1200).
 *
 */

function setDelay(difficulty) { 
    switch (difficulty) {
        case 'easy':
            return 1500; 
        case 'normal':
            return 1000; 
        case 'hard':
            return randomInteger(600, 1200);
        default:
            throw new Error("Invalid difficulty level. Please choose 'easy', 'normal', or 'hard'.");
    }
}

      

function getRandomTile() {
    return Math.floor(Math.random() * 9).toString();
}
/**
 * Chooses a random hole from a list of holes.
 *
 * This function should select a random Hole from the list of holes.
 * 1. generate a random integer from 0 to 8 and assign it to an index variable
 * 2. get a random hole with the random index (e.g. const hole = holes[index])
 * 3. if hole === lastHole then call chooseHole(holes) again.
 * 4. if hole is not the same as the lastHole then keep track of 
 * it (lastHole = hole) and return the hole
 *
 * Example: 
 * const holes = document.querySelectorAll('.hole');
 * chooseHole(holes) //> returns one of the 9 holes that you defined
 */
function chooseHole(holes, lastHole = null) {
     // TODO: Write your code here.
     if (holes.length <= 1) {
        throw new Error("The list of holes must contain at least two elements.");
    }
      const index = randomInteger(0, 8);
    const hole = holes[index]; 
    if (hole === lastHole) {
        return chooseHole(holes, lastHole);
    }
    return hole; 
}


 



/**
*
* Calls the showUp function if time > 0 and stops the game if time = 0.
*
* The purpose of this function is simply to determine if the game should
* continue or stop. The game continues if there is still time `if(time > 0)`.
* If there is still time then `showUp()` needs to be called again so that
* it sets a different delay and a different hole. If there is no more time
* then it should call the `stopGame()` function. The function also needs to
* return the timeoutId if the game continues or the string "game stopped"
* if the game is over.
*
 if time > 0:
  timeoutId = showUp()
   return timeoutId
 else
   gameStopped = stopGame()
   return gameStopped
*
*/
function handleGameFlow() {
    if (time > 0) {
        
        const delay = setDelay('normal'); 
        const holes = ["hole1", "hole2", "hole3", "hole4"]; 
        const timeoutId = setTimeout(() => {
            showUp(chooseHole(holes), delay); 
            time -= delay / 1000; 
        }, delay);
        
        return timeoutId;
    } else {
    
        stopGame();
        return "game stopped";
    }
}
function gameOver() {
  gameEnded = true; 
  if (timer) {
    clearInterval(timer); 
    timer = null;
  }
  const gameOverMessage = document.getElementById("gameOverMessage"); 
  if (gameOverMessage) {
    gameOverMessage.textContent = "Game Over"; 
  } else {
    console.error("Game over message element not found.");
  }
  const score = document.getElementById("score"); 
  if (score) {
    score.textContent = `Final Score: ${points}`;console.log("Game has ended."); 
}
  }

  // TODO: Write your code here
  


/**
*
* Calls the showAndHide() function with a specific delay and a hole.
*
* This function simply calls the `showAndHide` function with a specific
* delay and hole. The function needs to call `setDelay()` and `chooseHole()`
* to call `showAndHide(hole, delay)`.
*
*/

function initializeHoleClasses() {
    const hole0 = document.getElementById('hole0');
    const hole1 = document.getElementById('hole1');
    const hole2 = document.getElementById('hole2');

    if (hole0) {
        hole0.classList.add('highlight'); 
    } else {
        console.error("hole0 not found.");
    }

    if (hole1) {
        hole1.classList.add('highlight');
    } else {
        console.error("hole1 not found.");
    }
    if (hole2) {
        hole2.classList.add('highlight'); 
    } else {
        console.error("hole2 not found.");
    }
}


function toggleHoleClass(holeId) {
    const hole = document.getElementById(holeId);
    if (hole) {
        hole.classList.toggle('highlight'); 
    } else {
        console.error(`Hole with ID '${holeId}' not found.`);
    }
}

initializeHoleClasses();
toggleHoleClass('hole1');
//

function showAndHide(hole, delay) {
    if (!hole) {
        throw new Error("Invalid hole specified.");
    }
    toggleVisibility(hole);
    setTimeout(() => {
        toggleVisibility(hole); 
    }, delay);
}

function triggerShowAndHide(difficulty, holes) {
    const delay = setDelay(difficulty);
    const hole = chooseHole(holes, lastHole);
    showAndHide(hole, delay); 
}
function triggershowAndHide(difficulty, holes) {
 
    const delay = setDelay(difficulty);
    const hole = chooseHole(holes, lastHole); 
    showAndHide(hole, delay);
    lastHole = hole;
}
function showUp() {
    const delay = setDelay(difficulty); 
    const hole = chooseHole(holes, lastHole); 

    lastHole = hole;

    return showAndHide(hole, delay);
}

/**
*
* The purpose of this function is to show and hide the mole given
* a delay time and the hole where the mole is hidden. The function calls
* `toggleVisibility` to show or hide the mole. The function should return
* the timeoutID
*
*/
function callshowAndHide(difficulty, holes) {
    const delay = setDelay(difficulty); 
    const hole = chooseHole(holes, lastHole); 
    showAndHide(hole, delay); 
    lastHole = hole;
}

  // TODO: call the toggleVisibility function so that it adds the 'show' class.
  
  function manageVisibility(element, delay) {
    if (!element || !delay) {
        throw new Error("Both element and delay must be provided.");
    }
    toggleVisibility(element, 'show');
    const timeoutID = setTimeout(() => {
        toggleVisibility(element); 
        gameOver();  
       }, delay);
    return timeoutID;
}

    // TODO: call the toggleVisibility function so that it removes the 'show' class when the timer times out.
    
   


/**
*
* Adds or removes the 'show' class that is defined in styles.css to 
* a given hole. It returns the hole.
*
*/
function toggleVisibility(hole) {
  if (!hole) {
    throw new Error("The provided hole is undefined or null.");
  }
  hole.classList.toggle('show');
  return hole; 
}


/**
*
* This function increments the points global variable and updates the scoreboard.
* Use the `points` global variable that is already defined and increment it by 1.
* After the `points` variable is incremented proceed by updating the scoreboard
* that you defined in the `index.html` file. To update the scoreboard you can use 
* `score.textContent = points;`. Use the comments in the function as a guide 
* for your implementation:
*
*/
function updateScore() {
   points += 1; 
   const scoreElement = document.getElementById("score"); 
   if (scoreElement) {
       scoreElement.textContent = points; 
   } else {
       console.error("Score element not found.");
   }
}
function incrementAndUpdateScoreboard() {
    points += 1; 
    const score = document.getElementById("score"); 
    if (score) {
      score.textContent = points; 
    } else {
      console.error("Scoreboard element not found.");
    }
    return points;
}
function whack(event) {
    console.log("whack!")
    updateScore();
    incrementAndUpdateScoreboard();
}

/**
*
* This function clears the score by setting `points = 0`. It also updates
* the board using `score.textContent = points`. The function should return
* the points.
*
*/
function clearScore() {
  points = 0; 
  const scoreElement = document.getElementById("score");
  if (scoreElement) {
    scoreElement.textContent = points;
  } else {
    console.error("Score element not found.");
  }
  return points; 
}



/**
*
* Starts the timer using setInterval. For each 1000ms (1 second)
* the updateTimer function get called. This function is already implemented
*
*/
function startTimer() {
 
  if (timer) {
    clearInterval(timer); 
  }
  timer = setInterval(updateTimer, 1000);
  // TODO: Write your code here
  // timer = setInterval(updateTimer, 1000);
  return timer;
}


function setEventListeners(){
  moles.forEach(
    mole => mole.addEventListener('click', whack)
  );
  return moles;
}

setEventListeners();


/**
*
* This function sets the duration of the game. The time limit, in seconds,
* that a player has to click on the sprites.
*
*/
function setDuration(duration) {
 
  if (typeof duration !== 'number' || duration <= 0) {
    throw new Error("Invalid duration. Please provide a positive number.");
  }
  time = duration;
  return time; 
}


/**
*
* This is the function that starts the game when the `startButton`
* is clicked.
*
*/
function startGame(){
    
    initializeGame(); 
                    } 
  function initializeGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setDuration(10); // Added line
    showUp(); // Added line 
  }
//setDuration(10);
//showUp();

  
function setPlant() {
    if (gameEnded) {
        return;
    }
    if (currentPlantTile) {
        currentPlantTile.innerHTML = "";
    }
    let bomb = document.createElement("img");
    bomb.src = "./images/src/mallet.png";
    let num = getRandomTile();
    if (currentPlantTile && currentPlantTile.id == num) {
        return;
    }
    currentPlantTile = document.getElementById(num);
    currentPlantTile.appendChild(bomb);
}
function selectTile() {
    if (gameEnded) {
        return; 
    }
    if (this.parentElement == currentMoleTile) {
        points += 1;
        score.textContent = points;
    } else {
        health -= 1;
        console.log(`Health decreased: ${health} lives left.`);
        if (health <= 0) {
            gameOver(); 
        }
    }
}
    


// Utility function to update the scoreboard
function incrementAndUpdateScoreboard() {
    const score = document.getElementById("score");
    if (score !== null && score !== undefined) {
        score.textContent = points; 
    }
}

function setMole() {
    if (gameEnded) {
        return;
    }
    if (currentMoleTile) {
        currentMoleTile.innerHTML = ""; 
    }
    let mole = document.createElement("img");
    mole.src = "images/src/mole.png"; 
    let num = getRandomTile(); 
    if (!num) {
        console.error("getRandomTile() returned an invalid value.");
        return; 
    }
    if (currentPlantTile && currentPlantTile.id === num) {
        return; 
    }
    currentMoleTile = document.getElementById(num);
    if (!currentMoleTile) {
        console.error(`Tile with ID ${num} not found.`);
        return; 
    }
    currentMoleTile.appendChild(mole); 
}

// Set the event listener for the start button
function startGame() {
  console.log("Game started");
}
if (startButton) {
  startButton.addEventListener("click", startGame); 
} else {
  console.error("Start button not found."); 
}
   



// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;