let startButton = document.querySelector(".begin");
let answerButton = document.querySelector(".answer");
let timeLeft = document.querySelector(".timer")
let startScreen = document.querySelector(".start")

let questions = {
    question: ["question 0", "question 1"],
    correctAnswer: ["correct 0", "correct 1"],
    wrongAnswer: [
        ["wrong 0.0", "wrong 0.1", "wrong 0.2"], 
        ["wrong 1.0", "wrong 1.1", "wrong 1.2"]
    ],
    questionTracker: 0 
}

function cycleQuestions () {
    
}

let secondsLeft = 100;

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
    // startScreen.setAttribute("style", "display: none")
    // let printOut = startButton.textContent
    // console.log(printOut)
    // startButton.textContent = "test";
    cycleQuestions()
    setTime()
}


startButton.addEventListener("click", startQuiz)

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

