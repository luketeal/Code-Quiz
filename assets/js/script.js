// Declare query selectors
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

// Define Array of Questions
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

// initialize the amount of time left for the quiz
let secondsLeft = 50;

// initialize score variabl globally
let score;

// initialize the number of correct answers counter globally
let correctCounter = 0;

// initialize the high score array globally as an array of objects
let highScoreArray = [{}];


function logScore () {

    // toggle screens
    questionScreen.setAttribute("style", "display: none")
    scoreScreen.setAttribute("style", "display: block")

    // calculate score
    score = correctCounter/questions.question.length*100

    // display score
    quizScore.textContent = "Your Score: " + score + '%';

}

function cycleQuestions (event) {

    // evaluate if the button pressed is undefined --> this will be undefined if the "begin" button is pressed 
    // if it is undefined, there is no answer to be validated so this part of the function will be skipped
    if(event !== undefined) {
        
        // evaluate if the button pressed is the correct answer, if so increment the correct answer counter, if not reduce timer.
        if(event.target.textContent === questions.correctAnswer[questions.answerTracker]) {
            correctCounter++;
        } else {
            secondsLeft = secondsLeft-10;

            // if timer is less than zero go to log score screen
            if(secondsLeft < 0) {
                timeLeft.textContent = 'Done';
                logScore();
            } else {
                timeLeft.textContent = secondsLeft;
            }
        }
        questions.answerTracker++;
    }

    // cycles to the next question if there are still questions to answer and there is time left
    if (questions.questionTracker < questions.question.length) {

        // set the content of the question
        questionText.textContent = questions.question[questions.questionTracker];
       
        // set the possible answers and randomize their order
        let questionAnswers = questions.wrongAnswer[questions.questionTracker];
        questionAnswers.push(questions.correctAnswer[questions.questionTracker]);
        questionAnswers = questionAnswers.sort(() => Math.random() - 0.5);
        
        // display the answers
        answerButton[0].textContent = questionAnswers[0];
        answerButton[1].textContent = questionAnswers[1];
        answerButton[2].textContent = questionAnswers[2];
        answerButton[3].textContent = questionAnswers[3];
        
        // increment the question tracker for the next question
        questions.questionTracker++;

    } else {
        secondsLeft = -1;
        logScore();
    }

}

function startQuiz () {

    // toggle screens
    startScreen.setAttribute("style", "display: none");
    timeLeft.setAttribute("style", "display: block")
    questionScreen.setAttribute("style", "display: flex");
    
    // begin timer
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

    // start first question
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

    // append the user object (initials and score) to array of scores (highScoreArray)
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
        li.textContent= highScoreArray[i].initials + ' - ' + highScoreArray[i].gameScore + '%'
    }
}

// event listeners
startButton.addEventListener("click", startQuiz);
answerButton[0].addEventListener("click", cycleQuestions);
answerButton[1].addEventListener("click", cycleQuestions);
answerButton[2].addEventListener("click", cycleQuestions);
answerButton[3].addEventListener("click", cycleQuestions);
submitButton.addEventListener("click", saveScore);


