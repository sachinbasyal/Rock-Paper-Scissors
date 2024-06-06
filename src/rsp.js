
/*Our Algorithm: val = Math.random(); -> results any random value beween 0 to 1.
if value comes between 0 to 1/3, it's Rock.
if value comes between 1/3 to 2/3, it's Scissor
if value comes between 2/3 to 1, it's Paper */


// To retrieve the stored score from JSON data
// const jsonString = localStorage.getItem('totalScore')
// TO convert the retrieved JSON data back to JavaScript Object
// JSON.parse(jsonString)

// let score = JSON.parse(localStorage.getItem("totalScore"));

// //need to reassign the variables, so better to initialize 'let' instead of 'const' score.
// if (score === null){  //!score --> score ==null --> true
//   score ={  //initializing an object with keys-values pair.
//     Win:0,
//     Loss: 0,
//     Tie: 0
//   }
// }

//using shortcuts (boolean operator) to above codes:
let score = JSON.parse(localStorage.getItem("totalScore")) || {Win:0, Loss:0, Tie:0};

// .addEventListener() method is usually preffered to use rather than onclick=" function()"
document.querySelector('.js-rock-button').addEventListener('click', ()=>{
playGame("Rock");
});

document.querySelector('.js-paper-button').addEventListener('click',()=>{
  playGame("Paper");
});

document.querySelector('.js-scissors-button').addEventListener('click',()=>{
  playGame("Scissors");
});


const playGame = (playerMove) => {
const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Its a Tie!";
      score.Tie += 1;
    } else if (computerMove === "Scissors") {
      result = "You Win!";
      score.Win += 1;
    } else if (computerMove === "Paper") {
      result = "Compter Wins!";
      score.Loss += 1;
    }
  } else if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "Compur Wins!";
      score.Loss += 1;
    } else if (computerMove === "Scissors") {
      result = "Its a Tie!";
      score.Tie += 1;
    } else if (computerMove === "Paper") {
      result = "You Win!";
      score.Win += 1;
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You Win!";
      score.Win += 1;
    } else if (computerMove === "Scissors") {
      result = "Computer Wins!";
      score.Loss += 1;
    } else if (computerMove === "Paper") {
      result = "Its a Tie!";
      score.Tie += 1;
    }
  }

  // Converting the JS object into JSON (string data)
  // const jsonString = JSON.stringify(score);

  // Storing data into localStorage for permanent record (after refreshing the page...)
  // localStorage only support strings.
  localStorage.setItem("totalScore", JSON.stringify(score));

  //   return alert(`You picked ${playerMove}, Computer picked ${computerMove}, ${result}
  // Score: [Wins: ${score.Win}, Ties: ${score.Tie}, Losses: ${score.Loss}] `);

  //return alert(`You picked ${playerMove}, Computer picked ${computerMove}, ${result}`);
  updateScoreElement(); // No need to pass 'score' as an argument inside function as it's declared global (ouside the function)
  return myResult(playerMove,computerMove,result);

};

function pickComputerMove() {
  // defining a arrow function for: function pickComputerMove () {}
  const val = Math.random(); //Math. random function results random value between 0 to 1

  let computerMove = "";

  if (val >= 0 && val < 1 / 3) {
    computerMove = "Rock";
  } else if (val >= 1 / 3 && val < 2 / 3) {
    computerMove = "Scissors";
  } else if (val >= 2 / 3 && val < 1) {
    computerMove = "Paper";
  }
  return computerMove;
  
};

document.querySelector('.js-reset-btn').addEventListener('click', ()=>{
  score.Win=0;
  score.Loss =0;
  score.Tie =0;
  localStorage.removeItem('totalScore');
  updateScoreElement();
  document.querySelector('.js-moves').innerHTML ='';
  document.querySelector('.js-result').innerHTML='';        
});

const updateScoreElement =()=>{
  const txtScore = document.querySelector('.js-score');
  txtScore.innerHTML =`Score: Wins: ${score.Win}, Ties: ${score.Tie}, Losses: ${score.Loss}`;
}

const myResult =(playerMove,computerMove,result) =>{
  document.querySelector('.js-moves').innerHTML =`You <img class="h-20 ml-2 mr-8" src="../image/${playerMove}-emoji.png" alt=""> 
  <img class="h-20 mr-2" src="../image/${computerMove}-emoji.png" alt=""> Computer`;
  document.querySelector('.js-result').innerHTML =result;
}

document.querySelector('.js-autoplay').addEventListener('click', ()=>{autoPlay();})
let isAutoPlaying =false;
let intervalId;
const autoPlay =() =>{
  // isAutoPlaying===false --> !isAutoPlaying
  if (!isAutoPlaying){
    //intervalId = setInterval(function(){  setInterval() always returns the number (ID). Everytime we run the function, we get different ID
    intervalId = setInterval(()=>{
    const playerMove=pickComputerMove();
    playGame(playerMove);
    },2000) //note: it's syncronous function..so next line 'isAutoplaying =true' gets executed immediately after setInterval();
     
    isAutoPlaying=true;
    document.querySelector('.js-autoplay').innerText ='Stop Auto Play'
  }
  else {
    clearInterval(intervalId);
    isAutoPlaying =false;
    document.querySelector('.js-autoplay').innerText ='Auto Play'
  }
}

// keydown: Playing a game with keyboard key(s)
document.body.addEventListener('keydown', (event)=>{
  //console.log(event.key) to log each key pressed in the keyboard
if (event.key ==='r'|| event.key ==='R'){
  playGame('Rock');
}
else if (event.key ==='p'||event.key ==='P'){
  playGame('Paper');
}
else if (event.key ==='s'|| event.key ==='S'){
  playGame('Scissors');
}
})
