var scoreCount = 0;
var defaultTime = 10;
var timeLeft = 0;
var answer = null;
var highetScore = null;

$(document).ready(function () {
  // initiating the game`
  startGameOnKeydown();

  $('label.limit').text(10);

  $('.slider').on('input ', function() {
    sliderLimit();
  });

  $("#timer input").keyup(function () {
    checkAnswer();
  });
});


// game timer
function startGameOnKeydown () {
  $('input').one('keydown', function () { //keydown input field start counter
    genQuestion()
    timeLeft = Math.floor(defaultTime) ;

    var countDownTimer = setInterval(function () {
      updateTimer(-1);

      if (timeLeft === 0) {
        clearInterval(countDownTimer);
        $('.highestScore').html("<p>Highest Score: " + highestScore + "</p>")
        updateTimer(10)
        scoreCount = 0;
        $('.currentScore').html("<p>Current Score: " + scoreCount + "</p>");
        startGameOnKeydown();
      }
    }, 1000);
  });
}

// slider limit
function sliderLimit() {
  var max = $(".slider").val();

  $('label.limit').text(max);
}

// add time
function updateTimer (amount) {
  timeLeft += amount;
  $('.countdown').html("<h2>" + timeLeft + " secs left</h2>");
}

// generate question
function genQuestion () {
  var x = 1;
  var y = $(".slider").val();
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

    if (scoreCount > highetScore) {
      highestScore = scoreCount;
    }
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
// inject high score, show highest score in html (if all time high, POST to server)
