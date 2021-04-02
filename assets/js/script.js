let startButton = document.querySelector(".begin");
let answerButton = document.querySelectorAll(".answer");
let timeLeft = document.querySelector(".timer");
let startScreen = document.querySelector(".start");
let questionText = document.querySelector(".qtext");
let scoreScreen = document.querySelector(".scoreInput");
let questionScreen = document.querySelector(".questions");
let quizScore = document.querySelector(".yourScore");
let submitButton = document.querySelector(".submitButton");
let highScore = document.querySelector(".highScore");
let initialsEl = document.querySelector("#initials");
let scoreList = document.querySelector(".scoreList");

let questions = {
    question: ["question 0", "question 1", "question 2", "question 3"],
    correctAnswer: ["correct 0", "correct 1", "correct 2", "correct 3"],
    wrongAnswer: [
        ["wrong 0.0", "wrong 0.1", "wrong 0.2"], 
        ["wrong 1.0", "wrong 1.1", "wrong 1.2"],
        ["wrong 2.0", "wrong 2.1", "wrong 2.2"],
        ["wrong 3.0", "wrong 3.1", "wrong 3.2"]
    ],
    questionTracker: 0, 
    answerTracker: 0,
}

let questionTotal = questions.question.length - 1;

let questionAnswers = [];

let secondsLeft = 20;

let score;

let correctCounter = 0;

let highScoreArray = [{}];
let highScoreArraySorted = [{}];

function logScore () {
    questionScreen.setAttribute("style", "display: none")
    scoreScreen.setAttribute("style", "display: block")
    score = correctCounter/questions.question.length*100
    quizScore.textContent = "your score was " + score;
}

function cycleQuestions (event) {

    if(event !== undefined) {
        if(event.target.textContent === questions.correctAnswer[questions.answerTracker]) {
            questions.answerTracker++;
            correctCounter++;
        } else {
            questions.answerTracker++;
            secondsLeft = secondsLeft-10;
            timeLeft.textContent = secondsLeft;
        }
    }

    // cycles to the next question if there are still questions to answer and there is time left
    if (questions.questionTracker <= questionTotal) {

        questionText.textContent = questions.question[questions.questionTracker];
       
        questionAnswers = questions.wrongAnswer[questions.questionTracker];
        questionAnswers.push(questions.correctAnswer[questions.questionTracker]);
        questionAnswers = questionAnswers.sort(() => Math.random() - 0.5);
        
        answerButton[0].textContent = questionAnswers[0];
        answerButton[1].textContent = questionAnswers[1];
        answerButton[2].textContent = questionAnswers[2];
        answerButton[3].textContent = questionAnswers[3];
        
        questions.questionTracker++;

    } else {
        secondsLeft = -1;
        logScore();
    }

}

function startQuiz () {
    // change display to none
    startScreen.setAttribute("style", "display: none");
    questionScreen.setAttribute("style", "display: flex");
    // let printOut = startButton.textContent
    // console.log(printOut)
    startButton.textContent = "test";
    // setTime()

    timeLeft.textContent = secondsLeft;
    let timerInterval = setInterval(
        
        function() {
            secondsLeft--;
            timeLeft.textContent = secondsLeft;

            if (secondsLeft === 0) {
                logScore();
                clearInterval(timerInterval);
                timeLeft.textContent = "Done";
            } else if(secondsLeft < 0) {
                clearInterval(timerInterval);
                timeLeft.textContent = "Done";
            }

        }, 1000

    );

    cycleQuestions();

}

function saveScore(event) {
    
    // on submit, don't reload screen
    event.preventDefault();
    
    // switch to the highscore screen
    scoreScreen.setAttribute("style", "display: none");
    highScore.setAttribute("style", "display: block");

    // log the users score and initials to the user object
    let user = {
        initials: initialsEl.value,
        gameScore: score,
    }

    // appends the user object (initials and score) to array of scores (highScoreArray)
    if (JSON.parse(localStorage.getItem('highScores')) === null) {
        highScoreArray [0] = user

    } else {
        highScoreArray = JSON.parse(localStorage.getItem('highScores'))
        highScoreArray.push(user)
    }

    // sort the array in reverse order
    highScoreArray.sort(function(a, b){return a.gameScore - b.gameScore});
    highScoreArray.reverse();

    // store the array in local storage
    localStorage.setItem('highScores', JSON.stringify(highScoreArray));

    // add list of high scores
    for (let i=0; i<highScoreArray.length; i++) {
        let li = document.createElement("li");
        scoreList.appendChild(li);
        li.textContent= highScoreArray[i].initials + ' - ' + highScoreArray[i].gameScore
    }
}


startButton.addEventListener("click", startQuiz);
answerButton[0].addEventListener("click", cycleQuestions);
answerButton[1].addEventListener("click", cycleQuestions);
answerButton[2].addEventListener("click", cycleQuestions);
answerButton[3].addEventListener("click", cycleQuestions);
submitButton.addEventListener("click", saveScore);


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

