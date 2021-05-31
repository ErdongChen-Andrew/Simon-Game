var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var bottonColours = ["red", "blue", "green", "yellow"];


function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = bottonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  // Step 3

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();

  $("#level-title").html("Level " + level);

  level = level + 1;

  console.log(gamePattern);
  // console.log(level);
}


// Step 4

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);

  // Step 5
  playSound(userChosenColour);

  function playSound(name) {
    $("#" + name).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  checkAnswer(userClickedPattern.length - 1);

  console.log(userClickedPattern);
  // console.log(gamePattern);
});


// Step 6

function animatePress(currentColour) {
  $("#" + currentColour).click().addClass("pressed").delete(100).removeClass("pressed");
};

// Step 7

var flag = true;

$(document).keydown(function() {
  if (flag == true) {
    nextSequence();
    flag = false;
  }
});

// Step 8

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length == gamePattern.length) {

      setTimeout(function() {
        nextSequence()
      }, 1000);

      userClickedPattern.length = 0;
    }

  } else {

    console.log("wrong");

    // Step 9

    var audio = new Audio("sounds/wrong.mp3");

    audio.play();

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").html("Game Over, Press Any Key to Restart");

    startOver();
  }
}

// Step 10

function startOver(){
  gamePattern = [];

  userClickedPattern = [];

  level = 0;

  flag = true;
}
