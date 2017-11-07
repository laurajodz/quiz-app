"use strict";

//First let's define our quiz questions and answers in an array
const QUIZ = [
    {
    question: "City: New York",
    answers: ["Mets", "Empires", "Lights", "Pizza Slices"],
    correctAnswer: "Mets"
    },
    
    {
    question: "City: Los Angeles",
    answers: ["Suns", "Dodgers", "Surfers", "Isotopes"],
    correctAnswer: "Dodgers"
    },
    
    {
    question: "City: Chicago",
    answers: ["Winds", "Bears", "White Sox", "Sausage Kings"],
    correctAnswer: "White Sox"
    },
    
    {
    question: "City: Philadelphia",
    answers: ["Liberties", "Phillies", "Eagles", "Cheese Steaks"],
    correctAnswer: "Phillies"
    },
    
    {
    question: "City: Seattle",
    answers: ["Mariners", "Roasters", "Seahawks", "Amazons"],
    correctAnswer: "Mariners"
    }
  ];  
  
var currentNumberCorrect = 0;
var currentNumberIncorrect = 0;

//Listen for user to click the begin button 
function handleBegin() {
  $('.begin').on('click', event => {
    var currentQuestionNumberIndex = 0;
    renderQuestion(currentQuestionNumberIndex);
  });
}


function renderQuestion(currentIndex) {
  
  console.log(currentIndex); 
  //Generate question number, question and its 4 possible answers...
  var displayedQuestionNumber = currentIndex;
  displayedQuestionNumber++;
  var questionObject = QUIZ[currentIndex];
  console.log(questionObject);
  console.log(currentNumberCorrect);
  console.log(currentNumberIncorrect);
  var question = questionObject.question;
  var answerOne = questionObject.answers[0];
  var answerTwo = questionObject.answers[1];
  var answerThree = questionObject.answers[2];
  var answerFour = questionObject.answers[3];
  var correctAnswer = questionObject.correctAnswer;
  
  console.log("Line 74 object is " + question);
        
  //...and insert that HTML to the DOM
  $('.container').html(
   `<form class="qa" id="js-qa-form">
      <p class="progressNumber"><label for="progressNumber">Question # ${displayedQuestionNumber} of 5</label></p>
      <p class="question"><label for="question">${question}</label></p>
        <fieldset>
          <section>
            <p><input type="radio" class="js-answer" id="${answerOne}" name="answer"><label for="${answerOne}">${answerOne}</label></input></p>
            <p><input type="radio" class="js-answer" id="${answerTwo}" name="answer"><label for="${answerTwo}">${answerTwo}</label></input></p>
            <p><input type="radio" class="js-answer"" id="${answerThree}" name="answer"><label for="${answerThree}">${answerThree}</label></input><p/>
            <p><input type="radio" class="js-answer" id="${answerFour}" name="answer"><label for="${answerFour}">${answerFour}</label></input></p>
          </section>
        </fieldset>
    </form>`
  );

  handleAnswer(currentIndex);
}


//Listen for answer 
function handleAnswer(currentIndex) {
  console.log("Line 85 " + currentNumberCorrect);
  //Listen for user to answer question 
  $('.js-answer').on('click', event => {
    
    //Make radio buttons inactive so user can't click on answers again 
    $('.js-answer').attr('disabled', 'disabled');
    
    //Extract target from event and create variable to compare
    var userChosenAnswer = $(event.currentTarget).attr('id');
    
    console.log("Line 107 chosen answer is " + userChosenAnswer);
    
    evaluateAnswer(currentIndex, userChosenAnswer);
  });
}
    
//Evaluate whether the chosen answer is right or wrong
function evaluateAnswer(currentIndex, chosenAnswer) {
    console.log(currentNumberCorrect);
    console.log("Line 105 " + currentIndex); 
    //Create variable to compare
    var questionObject = QUIZ[currentIndex];
    console.log(questionObject);
    var correctAnswer = questionObject.correctAnswer;
    console.log("Line 117 correct answer is " + correctAnswer);
    
    if (chosenAnswer === correctAnswer) {
      
      //If the anser is right, increase number of correct answers by one... 
      currentNumberCorrect++;
      
      //...and display the correct message and score ...
      $('.container').append(
        `<div class="correctMessage">
          <p class="success"><label for="success">That's correct! Great job.</label></p>
          <p class="score"><label for="score">${currentNumberCorrect} correct, ${currentNumberIncorrect} incorrect </label></p>
        </div>`
      );
       
      
      console.log("Line 121 current number correct is " + currentNumberCorrect);

    }
        
    else {
      
      //If the answer is wrong, increase number of incorrect answers by one... 
      currentNumberIncorrect++;
      
      //...and display the incorrect message with correct answer and score
      $('.container').append(
        `<div class="incorrectMessage">
          <p class="nope"><label for="nope">Sorry, that is not correct. The correct answer is ${correctAnswer}.</label></p>
          <p class="score"><label for="score">${currentNumberCorrect} correct, ${currentNumberIncorrect} incorrect </label></p>
        </div>`
      );
    }
    
    console.log("Line 135 current question number is still " + currentIndex); 
 
    prepareForNextQuestion(currentIndex,correctAnswer); 
}   


function prepareForNextQuestion(currentIndex, correctAnswer) {    
  
  //Add Next button if we are on questions 1 through 4
  if (currentIndex < 4) {
    $('.container').append(
      `<button class="next" id="${correctAnswer}">Next Question --></button>`
    );
    
      handleNextQuestion(currentIndex);
    }
    
    else {
      
      //If we are on the last question, run handleFinal
      handleFinal();
    }
}


//Listen for user to click next question button
function handleNextQuestion(currentIndex) {
    console.log("Adding handler for next event");
  $('.next').on('click', event => {
    console.log($(event.currentTarget).attr('id'));
    
    //Clear screen...
    $('.container').html("");
    
    //...and increase question number index by one
    currentIndex++;
  
    console.log("Line 146 current question number is " + currentIndex);
    console.log("Line 148 current correct number is " + currentNumberCorrect);
    
    renderQuestion(currentIndex);
  });
}


//Display final message with final score and add start again button
function handleFinal() {
  
  //Display final message & total score...
  if (currentNumberCorrect === 5) {
    $('.container').append(
        `<p class="totalScore"><label>Congratulations - you got all 5 right!</label></p>`
      );
  }
  
  else if 
    (currentNumberCorrect === 4) {
    $('.container').append(
        `<p class="totalScore"><label>Congratulations - you got 4 right of out 5!</label></p>`
      );
  }
     
  else if
    (currentNumberCorrect === 3) {
    $('.container').append(
        `<p class="totalScore"><label>Not bad - you got 3 right of out 5!</label></p>`
      );
  } 
  
  else if
    (currentNumberCorrect === 2) {
    $('.container').append(
        `<p class="totalScore"><label>You got 2 right of out 5!</label></p>`
      );
  } 
  
  else if
    (currentNumberCorrect === 1) {
    $('.container').append(
        `<p class="totalScore"><label>You got 1 right of out 5!</label></p>`
      );
  } 
  
  else {
    $('.container').append(
        `<p class="totalScore"><label>You didn't get any right. Try again!</label></p>`
      );
  } 
  
  //...and add start again button
  $('.container').append(
    `<button class="again">Start Over! --></button>`
  );

  startAgain();
}
  
//Listen for user to click start again button 
function startAgain() { 
  $('.again').on('click', event => {
    
    //Reset variables 
    var displayedQuestionNumber = 0;
    console.log(displayedQuestionNumber);
    var currentNumberCorrect = 0;
    console.log(currentNumberCorrect);
    var currentNumberIncorrect = 0;
    console.log(currentNumberIncorrect);
    var questionObject = QUIZ[0];
    console.log(questionObject);
    var currentQuestionNumberIndex = 0;
    console.log(currentQuestionNumberIndex);
    
    renderQuestion(currentQuestionNumberIndex);
  });
}

$(handleBegin);

