let highScoreArray = JSON.parse(localStorage.getItem('highScores'))
let scoreList = document.querySelector(".scoreList");
let clearScoreEl = document.querySelector(".clearScore");

if (highScoreArray != null) {
    for (let i=0; i<highScoreArray.length; i++) {
        let li = document.createElement("li");
        scoreList.appendChild(li);
        li.textContent= highScoreArray[i].initials + ' - ' + highScoreArray[i].gameScore + '%'
    }
}

if (highScoreArray === null) {
        let p = document.createElement("lp");
        scoreList.appendChild(p);
        p.textContent= 'No Scores'
}

function clearScore () {
    localStorage.clear();
    location.reload();
}

clearScoreEl.addEventListener("click", clearScore);