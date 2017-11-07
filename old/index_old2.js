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
  
//create variables
var currentQuestionNumberIndex = 0;  
var currentNumberCorrect = 0;
var questionObject = QUIZ[0];

//listen for user to click the begin button and then run progress and question/answers functions
function handleBegin() {
  $('.container').on('click', '.begin', event => {
    event.preventDefault();
    renderProgress();
    renderQuestion();
  });
}

//display question page PART 1: PROGRESS
function renderProgress() {
  
  //increase question number index by one
  currentQuestionNumberIndex++;
  
  // insert the HTML into the DOM to show progress 
  $('.container').html(
    `<p class="progressNumber"><label for="progressNumber">Question # ${currentQuestionNumberIndex} of 5</label></p>
     <p class="correctNumber"><label for="correctNumber">${currentNumberCorrect} correct of 5</label></p>`
    );
}
  
//display question page PART 2: QUESTION AND ANSWERS
function renderQuestion() {
  
  //generate question, its 4 possible answers, and the correct answer
  var question = questionObject.question;
  var answerOne = questionObject.answers[0];
  var answerTwo = questionObject.answers[1];
  var answerThree = questionObject.answers[2];
  var answerFour = questionObject.answers[3];
  var correctAnswer = questionObject.correctAnswer;
  console.log(correctAnswer);
  // append that HTML to the DOM
    
  $('.container').append(
   `<p class="question"><label for="question">${question}</label></p>
        <p><input type="radio" class="js-answer"><label>${answerOne}</label></input></p>
        <p><input type="radio" class="js-answer"><label>${answerTwo}</label></input></p>
        <p><input type="radio" class="js-answer"><label>${answerThree}</label></input><p/>
        <p><input type="radio" class="js-answer"><label>${answerFour}</label></input></p>`
  );
  
  //run handleAnswer function using the correctAnswer variable to evaluate the selected answer 
  handleAnswer(correctAnswer);
}

function handleAnswer() {
  
  //listen for user to answer question 
  $('.js-answer').on('click', event => {
    event.preventDefault();
    
    //evaluate whether the answer is right or wrong
    //need to bring in correctAnswer somehow
    //temporary, just to pass if statement
    if (1 === 1) {

      //if the answer is right, display the correct message ...
      $('.container').append(
           `<p class="success"><label for="success">That's correct! Great job</label></p>`
        );
       
      // ...and increase number of correct answers by one 
        currentNumberCorrect++;
    }
        
    else {
      //if the answer is wrong, display the incorrect message including correct answer
      $('.container').append(
           `<p class="nope"><label for="nope">Sorry, that is not correct! The correct answer is ${correctAnswer}</label></p>`
        );
    }
  });
    
    //add Next button if we are on questions 1 through 4...
    if (currentQuestionNumberIndex < 5) {
      $('.container').append(
        `<button class="next">Next Question --></button>`
         );
    //... and run handleNextQuestion
      handleNextQuestion();
    }
    else {
      handleFinal();
    }
   
  //});   
}

//listen for user to click next question button, clear screen, and then run function renderQuestion 
function handleNextQuestion() {
  $('.container').on('click', '.next', event => {
    console.log(currentQuestionNumberIndex);
    $('container').html("");
    renderQuestion();
  });
}

//Display final message and final score and listen for user to click start quiz over button
function handleFinal() {
  console.log("Final Message, Final Score...");
  
  //Add start over button
  $('.container').append(
        `<button class="again">Start Over! --></button>`
         );

  //listen for user to click start over button and then reset variables and run function renderProgress and function renderQuestion
  $('.container').on('click', '.again', event => {
    var currentQuestionNumberIndex = 0;  
    var currentNumberCorrect = 0;
    var questionObject = QUIZ[0];
    renderProgress();
    renderQuestion();
  });
}

$(handleBegin);



