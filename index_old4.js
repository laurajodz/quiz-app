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
  
//Create global variable
var currentQuestionNumberIndex = 0; 
var currentNumberCorrect = 0;


//Listen for user to click the begin button 
function handleBegin() {
  $('.begin').on('click', event => {
    renderQuestion();
  });
}


function renderQuestion() {
  console.log("Line 48 current question number is still " + currentQuestionNumberIndex); 
  //Generate question number, question and its 4 possible answers...
  var displayedQuestionNumber = currentQuestionNumberIndex;
  displayedQuestionNumber++;
  var questionObject = QUIZ[currentQuestionNumberIndex];
  console.log(questionObject);
  var question = questionObject.question;
  var answerOne = questionObject.answers[0];
  var answerTwo = questionObject.answers[1];
  var answerThree = questionObject.answers[2];
  var answerFour = questionObject.answers[3];
  
  console.log("Line 74 object is " + question);
  
  //...and insert that HTML to the DOM
  $('.container').html(
   `<div class="qa">
      <p class="progressNumber"><label for="progressNumber">Question # ${displayedQuestionNumber} of 5</label></p>
      <p class="question"><label for="question">${question}</label></p>
        <fieldset>
          <p><input type="radio" class="js-answer" id="${answerOne}" name="answer"><label for="${answerOne}">${answerOne}</label></input></p>
          <p><input type="radio" class="js-answer" id="${answerTwo}" name="answer"><label for="${answerTwo}">${answerTwo}</label></input></p>
          <p><input type="radio" class="js-answer"" id="${answerThree}" name="answer"><label for="${answerThree}">${answerThree}</label></input><p/>
          <p><input type="radio" class="js-answer" id="${answerFour}" name="answer"><label for="${answerFour}">${answerFour}</label></input></p>
        </fieldset>
    </div>`
  );

  handleAnswer();
}


//Listen for answer 
function handleAnswer() {
  
  //Listen for user to answer question 
  $('.js-answer').on('click', event => {
    
    //Make radio buttons inactive so user can't click on answers again 
    $('.js-answer').attr('disabled', 'disabled');
    
    //Extract target from event and create variable to compare
    var userChosenAnswer = $(event.currentTarget).attr('id');
    
    console.log("Line 107 chosen answer is " + userChosenAnswer);
    
    evaluateAnswer(userChosenAnswer);
  });
}
    
//Evaluate whether the chosen answer is right or wrong
function evaluateAnswer(chosenAnswer) {
    
    //Create variable to compare
    var questionObject = QUIZ[currentQuestionNumberIndex];
    var correctAnswer = questionObject.correctAnswer;
    console.log("Line 117 correct answer is " + correctAnswer);
    
    if (chosenAnswer === correctAnswer) {
      
      //If the anser is right, increase number of correct answers by one... 
      currentNumberCorrect++;
      
      //...and display the correct message and score ...
      $('.container').append(
        `<div class="correctMessage">
          <p class="success"><label for="success">That's correct! Great job</label></p>
          <p class="correctNumber"><label for="correctNumber">${currentNumberCorrect} correct </label></p>
        </div>`
      );
       
      
      console.log("Line 121 current number correct is " + currentNumberCorrect);

    }
        
    else {
      
      //If the answer is wrong, display the incorrect message with correct answer and score
      $('.container').append(
        `<div class="incorrectMessage">
          <p class="nope"><label for="nope">Sorry, that is not correct! The correct answer is ${correctAnswer}</label></p>
          <p class="correctNumber"><label for="correctNumber">${currentNumberCorrect} correct</label></p>
        </div>`
      );
    }
    
    console.log("Line 135 current question number is still " + currentQuestionNumberIndex); 
 
    prepareForNextQuestion(correctAnswer); 
}   


function prepareForNextQuestion(correctAnswer) {    
  
  //Add Next button if we are on questions 1 through 4
  if (currentQuestionNumberIndex < 4) {
    $('.container').append(
      `<button class="next" id="${correctAnswer}">Next Question --></button>`
    );
    
      handleNextQuestion();
    }
    
    else {
      
      //If we are on the last question, run handleFinal
      handleFinal();
    }
}


//Listen for user to click next question button
function handleNextQuestion() {
    console.log("Adding handler for next event");
  $('.next').on('click', event => {
    console.log($(event.currentTarget).attr('id'));
    
    //Clear screen...
    $('.container').html("");
    
    //...and increase question number index by one
    currentQuestionNumberIndex++;
  
    console.log("Line 146 current question number is " + currentQuestionNumberIndex);
    console.log("Line 148 current correct number is " + currentNumberCorrect);
    
    renderQuestion();
  });
}


//Display final message with final score and add start again button
function handleFinal() {
  
  //Display final message & score...
  if (currentNumberCorrect === 5) {
    $('.container').append(
        `<p class="score"><label>Congratulations - you got all 5 right!</label></p>`
      );
  }
  
  else if 
    (currentNumberCorrect === 4) {
    $('.container').append(
        `<p class="score"><label>Congratulations - you got 4 right of out 5!</label></p>`
      );
  }
     
  else if
    (currentNumberCorrect === 3) {
    $('.container').append(
        `<p class="score"><label>Not bad - you got 3 right of out 5!</label></p>`
      );
  } 
  
  else if
    (currentNumberCorrect === 2) {
    $('.container').append(
        `<p class="score"><label>You got 2 right of out 5!</label></p>`
      );
  } 
  
  else if
    (currentNumberCorrect === 1) {
    $('.container').append(
        `<p class="score"><label>You got 1 right of out 5!</label></p>`
      );
  } 
  
  else {
    $('.container').append(
        `<p class="score"><label>You didn't get any right. Try again!</label></p>`
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
    var currentQuestionNumberIndex = 0;  
    console.log(currentQuestionNumberIndex);
    var displayedQuestionNumber = 0;
    console.log(displayedQuestionNumber);
    var currentNumberCorrect = 0;
    console.log(currentNumberCorrect);
    var questionObject = QUIZ[0];
    console.log(questionObject);
    console.log(currentQuestionNumberIndex);
    renderQuestion();
  });
}

$(handleBegin);

