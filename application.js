$(document).ready(function () {
  $('.countdown').html("<h2>Ready?</h2>");
  // starting of the game
  var scoreCount = 0;
  var defaultTimer = 10;
  var answer = genQuestion();

  // the game structure
  theGame(defaultTimer);

  $("#timer input").keydown(function () {
    checkAnswer(answer, scoreCount);
  });

  genQuestion();
});

// initiating the game`
function theGame (time) {
  $('input').one('keydown', function () { //keydown input field start counter
    gameTimer(time);
  });
}

// game timer
var gameTimer = function (timer) {
  var countDownTimer = setInterval(function () {
    var seconds = Math.floor(timer)

    $('.countdown').html("<h2>" + seconds + " secs left</h2>");
    console.log(seconds)
    timer--;

    if (seconds === 0) {
      clearInterval(countDownTimer);
      $('.countdown').html("<h2>Game Over</h2>");
    }
  }, 1000);
}

// generate question
var genQuestion = function () {
  var x = 1;
  var y = 10;
  var userInput = 0;
  var tempX = getRndInteger(x, y);
  var tempY = getRndInteger(x, y);
  var total = tempX + tempY;

  $('h1').html(tempX + "+" + tempY);

  return total;
}

// check input Answer
var checkAnswer = function (answer, scoreCount) {
  userInput = $('#timer input').val(); // working

  if (userInput == answer) { // working
    console.log(userinput, answer)
    currentScore(scoreCount);
    $('#timer input').val('');
    genQuestion();
  };
};

// append current Score
function currentScore(count) {
  count += 1;
  $('.currentScore').html("<p>Current Score: " + count + "</p>");
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
