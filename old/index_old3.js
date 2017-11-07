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

  //create display variable that is one more than current index
  var displayedQuestionNumber = currentQuestionNumberIndex;
  displayedQuestionNumber++;
  console.log("Line 54 displayed number is " + displayedQuestionNumber);
  
  // insert the HTML into the DOM to show progress 
  $('.container').html(
    `<p class="progressNumber"><label for="progressNumber">Question # ${displayedQuestionNumber} of 5</label></p>
     <p class="correctNumber"><label for="correctNumber">${currentNumberCorrect} correct of 5</label></p>`
    );
}

//display question page PART 2: QUESTION AND ANSWERS
function renderQuestion() {
  
  //generate question, its 4 possible answers, and the correct answer
  var questionObject = QUIZ[currentQuestionNumberIndex];
  var question = questionObject.question;
  var answerOne = questionObject.answers[0];
  var answerTwo = questionObject.answers[1];
  var answerThree = questionObject.answers[2];
  var answerFour = questionObject.answers[3];
  
  console.log("Line 74 object is " + question);
  
  // append that HTML to the DOM
  $('.container').append(
   `<section>
   <p class="question"><label for="question">${question}</label></p>
        <p><input type="radio" class="js-answer" id="${answerOne}"><label>${answerOne}</label></input></p>
        <p><input type="radio" class="js-answer" id="${answerTwo}"><label>${answerTwo}</label></input></p>
        <p><input type="radio" class="js-answer"" id="${answerThree}"><label>${answerThree}</label></input><p/>
        <p><input type="radio" class="js-answer" id="${answerFour}"><label>${answerFour}</label></input></p>
    </section>`
  );
  
  //run handleAnswer function to evaluate the selected answer 
  console.log("Line 88 reached");
  handleAnswer();
}

function handleAnswer() {
  console.log("Line 93 reached");
  
  //listen for user to answer question 
  $('.js-answer').on('click', event => {
    
    //make radio buttons inactive so user can't click on answers again (i am trying to avoid a submit button)
    $('.js-answer').attr('disabled', 'disabled');
    
    
    //extract target from event and create variables to compare
    var questionObject = QUIZ[currentQuestionNumberIndex];
    var chosenAnswer = $(event.currentTarget).attr('id');
    var correctAnswer = questionObject.correctAnswer;
    
    console.log("Line 107 chosen answer is " + chosenAnswer);
    console.log("Line 108 correct answer is " + correctAnswer);
    
    
    //evaluate whether the answer is right or wrong
    if (chosenAnswer === correctAnswer) {

      //if the answer is right, display the correct message ...
      $('.container').append(
           `<p class="success"><label for="success">That's correct! Great job</label></p>`
        );
       
      // ...and increase number of correct answers by one ...
        currentNumberCorrect++;
        console.log("Line 121 current number correct is " + currentNumberCorrect);

    }
        
    else {
      //if the answer is wrong, display the incorrect message including correct answer
      $('.container').append(
           `<p class="nope"><label for="nope">Sorry, that is not correct! The correct answer is ${correctAnswer}</label></p>`
        );
    }

    //do something to temporarily hide progress on screen
    
    //add Next button if we are on questions 1 through 4...
    console.log("Line 135 current question number is still " + currentQuestionNumberIndex);
    if (currentQuestionNumberIndex < 4) {
      $('.container').append(
        `<button class="next">Next Question --></button>`
         );
    
      //... and run handleNextQuestion
      handleNextQuestion();
    }
    else {
      handleFinal();
    }
  
  });   
}

//listen for user to click next question button
function handleNextQuestion() {
  $('.container').on('click', '.next', event => {
    console.log("Hello Line 154");
    
    //Clear screen
    $('.container').html("");
    
    //Increase question number index by one
    currentQuestionNumberIndex++;
  
    console.log("Line 146 current question number is " + currentQuestionNumberIndex);
    console.log("Line 148 current correct number is " + currentNumberCorrect);
    
    //Run function renderProgress and function renderQuestion 
    renderProgress();
    renderQuestion();
  });
}

//Display final message and final score and listen for user to click start quiz over button
function handleFinal() {
  console.log("Line 146 Final Message, Final Score...");
  
  // //Add start over button
  // $('.container').append(
  //       `<button class="again">Start Over! --></button>`
  //        );

  // //listen for user to click start over button and then reset variables and run function renderProgress and function renderQuestion
  // $('.container').on('click', '.again', event => {
  //   var currentQuestionNumberIndex = 0;  
  //   var currentNumberCorrect = 0;
  //   var questionObject = QUIZ[0];
  //   renderProgress();
  //   renderQuestion();
  // });
}

$(handleBegin);



