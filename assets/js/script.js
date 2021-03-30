let startButton = document.querySelector(".begin");
let answerButton = document.querySelectorAll(".answer");
let timeLeft = document.querySelector(".timer")
let startScreen = document.querySelector(".start")
let questionText = document.querySelector(".qtext")
let scoreScreen = document.querySelector(".scoreInput")
let questionScreen = document.querySelector(".questions")
let quizScore = document.querySelector(".yourScore")

let questions = {
    question: ["question 0", "question 1"],
    correctAnswer: ["correct 0", "correct 1"],
    wrongAnswer: [
        ["wrong 0.0", "wrong 0.1", "wrong 0.2"], 
        ["wrong 1.0", "wrong 1.1", "wrong 1.2"]
    ],
    questionTracker: 0, 
}

let questionTotal = questions.question.length - 1;

let questionAnswers = []

function logScore () {
    scoreScreen.setAttribute("style", "display: block")
}

function cycleQuestions () {

    if (questions.questionTracker <= questionTotal) {

        questionText.textContent = questions.question[questions.questionTracker];
       
        questionAnswers = questions.wrongAnswer[questions.questionTracker];
        questionAnswers.push(questions.correctAnswer[questions.questionTracker])
        console.log(questionAnswers)
        questionAnswers = questionAnswers.sort(() => Math.random() - 0.5)
        console.log(questionAnswers)
       
        answerButton[0].textContent = questionAnswers[0]
        answerButton[1].textContent = questionAnswers[1]
        answerButton[2].textContent = questionAnswers[2]
        answerButton[3].textContent = questionAnswers[3]
        
        questions.questionTracker++;
        
        console.log(questions.questionTracker)

    } else {
        questionScreen.setAttribute("style", "display: none")
        logScore()
    }

}

let secondsLeft = 15;

function setTime () {
    let timerInterval = setInterval(() => {
        secondsLeft--;
        timeLeft.textContent = secondsLeft

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            timeLeft.textContent = "Time's Up"
        }

    }, 1000);
}


function startQuiz () {
    // change display to none
    startScreen.setAttribute("style", "display: none")
    questionScreen.setAttribute("style", "display: flex")
    // let printOut = startButton.textContent
    // console.log(printOut)
    startButton.textContent = "test";
    setTime()
    cycleQuestions()
}


startButton.addEventListener("click", startQuiz);
answerButton[0].addEventListener("click", cycleQuestions)
answerButton[1].addEventListener("click", cycleQuestions)
answerButton[2].addEventListener("click", cycleQuestions)
answerButton[3].addEventListener("click", cycleQuestions)


// event listener on begin game: when selected
// change display to none
// display first questions
// start timer

// event listener on answer buttons: when an answer is selected
// evaluate if the answer was correct 
    // if correct,
        // tell me that the answer is correct
    // if wrong,
        // tell me that the answer is wrong and reduce time on the timer
// display the next question

// when last answer is selected
    // display time left
    // request initials
    // save info to local storage

