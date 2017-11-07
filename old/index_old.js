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

//listen for user to click the begin button and then render question
function handleBegin() {
  $('.container').on('click', '.begin', event => {
    console.log('`handleBegin` ran');
    event.preventDefault();
    renderQuestion();
  });
}

//display question page PART 1:
  //question: #x of 5
  //correct: #x of 5
function renderProgress() {
  console.log("Question #" + ($.currentQuestionNumberIndex))
}


//display question page PART 2:
  //question/answers
function renderQuestion() {
  var currentQuestionNumberIndex = 0;  
  var questionObject = QUIZ[0];
  console.log(questionObject);
  // insert that HTML into the DOM
  $('.container').html(`Question ${currentQuestionNumberIndex} of 5`).html(questionObject);
}


//listen for user to answer question 
//function handleAnswer() {
  
//}

//evaluate whether the answer is right or wrong

//if the answer is right, display the correct message

//if the answer is wrong, display the incorrect message including correct answer

//listen for user to click next question button and then run function renderQuestion
//function handleNextQuestion() {
  
  //if we are on questions 1 through 4
  //renderQuestion();
  //if we are on question 5 we need to not display next question button and instead go to final page
//}



//if Question 5, skip renderQuestion function and display final message and final score

//listen for user to click start quiz over button
//function handleStartOver() {
  
//}


function handleQuiz() {
  handleBegin();
  // handleAnswer();
  // handleNextQuestion();
  // handleStartOver();
}

$(handleQuiz);



