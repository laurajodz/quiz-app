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
  
//Create global variables  
let currentNumberCorrect = 0;
let currentNumberIncorrect = 0;


function handleBegin() {
  //Listen for user to click the begin button 
  $('.begin').on('click', event => {
    let currentQuestionNumberIndex = 0;
    renderQuestion(currentQuestionNumberIndex);
  });
}


function renderQuestion(currentIndex) {
  //Generate question number, question and its 4 possible answers...
  let displayedQuestionNumber = currentIndex;
  displayedQuestionNumber++;
  let questionObject = QUIZ[currentIndex];
  let question = questionObject.question;
  let answerOne = questionObject.answers[0];
  let answerTwo = questionObject.answers[1];
  let answerThree = questionObject.answers[2];
  let answerFour = questionObject.answers[3];
  
  //...and insert that HTML to the DOM
  $('.container').html(
   `<form class="qa" id="js-qa-form">
      <p class="progressNumber">Question # ${displayedQuestionNumber} of 5</p>
      <fieldset>
        <legend>${question}</legend>
        <div class = "option">
          <input type="radio" class="js-answer" id="${answerOne}" value="${answerOne}" name="answer"><label for="${answerOne}">${answerOne}</label></input>
        </div>
        <div class = "option">
          <input type="radio" class="js-answer" id="${answerTwo}" value="${answerTwo}" name="answer"><label for="${answerTwo}">${answerTwo}</label></input>
        </div>
        <div class = "option">
          <input type="radio" class="js-answer"" id="${answerThree}" value="${answerThree}" name="answer"><label for="${answerThree}">${answerThree}</label></input>
        </div>
        <div class = "option">
          <input type="radio" class="js-answer" id="${answerFour}" value="${answerFour}" name="answer"><label for="${answerFour}">${answerFour}</label></input>
        </div>
        <div>
        <button class="submit" disabled>Submit</button>
        </div>
      </fieldset>
    </form>`
  );
  handleAnswer(currentIndex);
}


function handleAnswer(currentIndex) {
  //Listen for answer
  $('.js-answer').on('click', event => {
    
    //Make submit button active...
    $('.submit').removeAttr('disabled');
  });
  
  //Listen for submit
  $('.submit').on('click', event => {
    event.preventDefault();
    
    //Disable submit button
    $('.submit').attr('disabled','disabled');
    
    //Extract target from event and create variable to compare
    let userChosenAnswer = $('input[name="answer"]:checked').val();
    
    evaluateAnswer(currentIndex, userChosenAnswer);
  });
}
    

function evaluateAnswer(currentIndex, chosenAnswer) {
  //Create variable to evaluate
  let questionObject = QUIZ[currentIndex];
  let correctAnswer = questionObject.correctAnswer;
    
  //Evaluate whether the chosen answer is right or wrong
  if (chosenAnswer === correctAnswer) {
      
    //If the anser is right, increase number of correct answers by one... 
    currentNumberCorrect++;
      
    //...and display the correct message and score
    $('.container').append(
      `<div class="correctMessage">That's correct! Great job.
        <p class="score">${currentNumberCorrect} correct, ${currentNumberIncorrect} incorrect</p>
      </div>`
    );
  }
        
  else {
      
    //If the answer is wrong, increase number of incorrect answers by one... 
    currentNumberIncorrect++;
      
    //...and display the incorrect message with correct answer and score
    $('.container').append(
      `<div class="incorrectMessage">Sorry, that is not correct. The correct answer is ${correctAnswer}.
        <p class="score">${currentNumberCorrect} correct, ${currentNumberIncorrect} incorrect</p>
      </div>`
    );
  }
    prepareForNextQuestion(currentIndex,correctAnswer); 
}   


function prepareForNextQuestion(currentIndex) {    
  //Add Next button if we are on questions 1 through 4
  if (currentIndex < 4) {
    $('.container').append(
      `<button class="next">Next Question --></button>`
    );
      handleNextQuestion(currentIndex);
    }
    
    else {
      
      //If we are on the last question
      handleFinal();
    }
}


function handleNextQuestion(currentIndex) {
  //Listen for user to click next question button
  $('.next').on('click', event => {
    
    //Clear screen...
    $('.container').html("");
    
    //...and increase question number index by one
    currentIndex++;
    
    renderQuestion(currentIndex);
  });
}


function handleFinal() {
  //Display final message & total score...
  if (currentNumberCorrect === 5) {
    $('.container').append(
        `<p class="totalScore">Congratulations - you got all 5 right!</p>`
      );
  }
  
  else if 
    (currentNumberCorrect === 4) {
    $('.container').append(
        `<p class="totalScore">Congratulations - you got 4 right of out 5!</p>`
      );
  }
     
  else if
    (currentNumberCorrect === 3) {
    $('.container').append(
        `<p class="totalScore">Not bad - you got 3 right of out 5!</p>`
      );
  } 
  
  else if
    (currentNumberCorrect === 2) {
    $('.container').append(
        `<p class="totalScore">You got 2 right of out 5!</p>`
      );
  } 
  
  else if
    (currentNumberCorrect === 1) {
    $('.container').append(
        `<p class="totalScore">You got 1 right of out 5!</p>`
      );
  } 
  
  else {
    $('.container').append(
        `<p class="totalScore">You didn't get any right. Try again!</p>`
      );
  } 
  
  //...and add start again button
  $('.container').append(
    `<button class="again">Start Over! --></button>`
  );

  startAgain();
}
  

function startAgain() { 
  //Listen for user to click start again button 
  $('.again').on('click', event => {
    
    //Reset variables 
    var displayedQuestionNumber = 0;
    var questionObject = QUIZ[0];
    var currentQuestionNumberIndex = 0;
    
    //Reset global variables
    currentNumberCorrect = 0;
    currentNumberIncorrect = 0;
    
    renderQuestion(currentQuestionNumberIndex);
  });
}

$(handleBegin);

