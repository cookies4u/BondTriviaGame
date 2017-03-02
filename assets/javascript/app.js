$(document).ready(function() {
        
  // vars
  var intervalId;
  var time = 24;
  var arrIndex;
  var countQ;
  var getID;
  var selectedValue;
  var selectedOption;
  var correctOption;
  var guessResult;
  var resultArr;
  var countCorrectGuess = 0;
  var countIncorrectGuess = 0;
  var countMissedGuess = 0;
  var restart = false;
  var clickOptionOn;

  // arrays index 0, 1, 2, 3
  var questionsArr = [
                      "Which villain loved gold?", 
                      "Which villain bit a shark?", 
                      "Who was the shortest villain?", 
                      "Which villain had a lethal hat?",
                      "Which villain was the #1 henchman?",
                      "Which villain crushed men with her thighs?"
                      ];
  var optionsArr = [ 
                      [ ["Goldmember", 0], ["Goldfinger", 1], ["Leprechaun", 0], ["Pussy Galore", 0] ], // [0]
                      [ ["Triton", 0], ["Namor", 0], ["Posedon Aegaeus", 0], ["Jaws", 1] ], // [1]
                      [ ["Nick Nack", 1], ["Mini-Me", 0], ["Chucky", 0], ["Mega Man", 0] ], // [2]
                      [ ["John Wayne", 0], ["Penguin", 0], ["Oddjob", 1], ["Captain Hook", 0] ], // [3]
                      [ ["The Monarch", 0], ["Bane", 0], ["Sergeant hatred", 0], ["Rosa Klebb", 1] ], // [4]
                      [ ["Xena Warrior Princess", 0], ["Xenia Onatopp", 1], ["Cat Woman", 0], ["Mystique", 0] ], // [5]
                    ];
  var imagesArr = ["assets/images/goldfinger.gif", "assets/images/jaws.gif", "assets/images/nickNack.gif", "assets/images/oddjob.gif", "assets/images/rosa.gif", "assets/images/xenia.gif"];

  ///////////////// helper functions /////////////////
  //// timer ////
  function startTimer () {
    intervalId = setInterval(decrement, 1000); //will update time every second
  };
  function stopTimer () {
    clearInterval(intervalId);
  };
  //// check for correct answer ////
  function correctAnsFunc (selction) {
    for (var i = 0; i < optionsArr.length; i++) {
      if (optionsArr[arrIndex][i][1] === 1) {
        correctOption = i;
        return;
      }
    }
  };
  //////////////////////////////////////////////

  ///////////////// Phases /////////////////
  //// Phase1  start screen ////
  $("#startEl").on("click", function() {
    clickOptionOn = true;
    arrIndex = 0;
    countQ = 0;
    countCorrectGuess = 0;
    countIncorrectGuess = 0;
    countMissedGuess = 0;

    nextQuestion();
    $("#startEl").html("");
  });

  //// Phase2  next question ////
  function nextQuestion () {
    time = 24;
    startTimer();

    $("#timeRemainingEl").html("<P>Time remaining: " + time + "</p>");

    $("#questionEl").html("<P>" + questionsArr[arrIndex] + "</p>");

    // will only increment the first one
    $("#option1El").html("<P>" + optionsArr[arrIndex][0][0] + "</p>");
    $("#option1El").attr("value", optionsArr[arrIndex][0][1]);
    $("#option1El").attr("option", 0);

    $("#option2El").html("<P>" + optionsArr[arrIndex][1][0] + "</p>");
    $("#option2El").attr("value", optionsArr[arrIndex][1][1]);
    $("#option2El").attr("option", 1);

    $("#option3El").html("<P>" + optionsArr[arrIndex][2][0] + "</p>");
    $("#option3El").attr("value", optionsArr[arrIndex][2][1]);
    $("#option3El").attr("option", 2);

    $("#option4El").html("<P>" + optionsArr[arrIndex][3][0] + "</p>");
    $("#option4El").attr("value", optionsArr[arrIndex][3][1]);
    $("#option4El").attr("option", 3);

    $("#imgEl").html("");

    countQ++; // number of questions viewed
  };

  //// Phase3, 4, 5 incorrect, correct, times up ////
  resultArr = ["You are correct", "You are incorrect", "Times up!"];
  function selectionResultFunc () {

   $("#questionEl").html("<P>" + resultArr[guessResult] + "</p>");
   // will only increment the first one
   $("#option1El").html("<P>The answer is: " + optionsArr[arrIndex][correctOption][0] + "!</p>"); //second one need to match
   $("#option2El").html("<P> </p>");
   $("#option3El").html("<P> </p>");
   $("#option4El").html("<P> </p>");

   $("#imgEl").html('<img src=' + imagesArr[arrIndex] + '>');

   arrIndex++;
  };

  //// Phase6 game ends ////
  function gameEnds () {
   $("#questionEl").html("<P>All done, heres how you did!</p>");
   // will only increment the first one
   $("#option1El").html("<P>Correct answers: " + countCorrectGuess + "</p>");
   $("#option2El").html("<P>Incorrect answers: " + countIncorrectGuess + "</p>");
   $("#option3El").html("<P>Missed guesses: " + countMissedGuess + "</p>");
   $("#option4El").html("<P> </p>");

   $("#imgEl").html('<img src="' + "assets/images/craig.gif" + '">');

   $("#startEl").html("<button>Restart</button>");

   restart = true;
  };
  //////////////////////////////////////////////

  ///////////////// transitions /////////////////
  function transitionFunc () {
    if (countQ === questionsArr.length) {
      stopTimer(); //timer stoped when click event happens
      selectionResultFunc(); //user option appears
      setTimeout(gameEnds, 10000); //after 10 seconsd next question resets time
    } else {
      stopTimer(); //timer stoped when click event happens
      selectionResultFunc(); //user option appears
      setTimeout(nextQuestion, 10000); //after 10 seconsd next question resets time
      setTimeout(function() {
        clickOptionOn = true;
        }, 10000); //after 10 seconsd next question resets time
    }
  };
  //// next portion - by clicking ////
  $(".optionsEl").on("click", function() {
    if (clickOptionOn === true) {
      clickOptionOn = false;

      getID = ("#" + this.id).toString();
      selectedValue = $(getID).attr("value");
      selectedOption = $(getID).attr("option");

      if (selectedValue == 1) {
        guessResult = 0;
        correctOption = selectedOption;
        countCorrectGuess++;
      } else {
        guessResult = 1;
        correctAnsFunc();
        countIncorrectGuess++;
      }
      transitionFunc();
    }
  });

  //// next portion - by time up ////
  function decrement () {
    time--;
    $("#timeRemainingEl").html("Time remaining: " + time);

    if (time === 0) {
      clickOptionOn = false;
      guessResult = 2;
      correctAnsFunc();
      countMissedGuess++;
      transitionFunc();
    }
  };
  //////////////////////////////////////////////

});

