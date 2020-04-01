var scoreCount = 0;
var defaultTime = 10;
var timeLeft = 0;
var answer = null;

$(document).ready(function () {
  // initiating the game`
  startGameOnKeydown();

  $("#timer input").keyup(function () {
    checkAnswer();
  });
});

// game timer
function startGameOnKeydown () {
  genQuestion()

  $('input').one('keydown', function () { //keydown input field start counter
    timeLeft = Math.floor(defaultTime) ;

    var countDownTimer = setInterval(function () {
      updateTimer(-1);

      if (timeLeft === 0) {
        clearInterval(countDownTimer);
        $('.countdown').html("<h2>Game Over</h2>");
        updateTimer(10)
        startGameOnKeydown();
      }
    }, 1000);
  });
}

// add time
function updateTimer (amount) {
  timeLeft += amount;
  $('.countdown').html("<h2>" + timeLeft + " secs left</h2>");
}

// generate question
function genQuestion () {
  var x = 1;
  var y = 10;
  var tempX = getRndInteger(x, y);
  var tempY = getRndInteger(x, y);
  var total = tempX + tempY;

  $('h1').html(tempX + "+" + tempY);

  answer = total;
}

// check input Answer
function checkAnswer () {
  var userInput = $('#timer input').val(); // working

  if (userInput == answer) { // working, answer isnt working after one loop
    currentScore();
    $('#timer input').val('');
    genQuestion();
    updateTimer(+1);
  };
};

// append current Score
function currentScore() {
  scoreCount += 1;
  $('.currentScore').html("<p>Current Score: " + scoreCount + "</p>");
}

// create random integer
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// my steps:
// insert timer 10 secs, add one sec if user input correct answer , need a keyDOWN event at the input area to start the timer
// current score need to refresh after getting a correct question
// randomly generate numbers between 0-10
// user will only use + operator only
// if user input === answer, generate next question

// inject high score, show highest score in html (if all time high, POST to server)
