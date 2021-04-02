let highScoreArray = JSON.parse(localStorage.getItem('highScores'))
let scoreList = document.querySelector(".scoreList");

for (let i=0; i<highScoreArray.length; i++) {
    let li = document.createElement("li");
    scoreList.appendChild(li);
    li.textContent= highScoreArray[i].initials + ' - ' + highScoreArray[i].gameScore + '%'
}