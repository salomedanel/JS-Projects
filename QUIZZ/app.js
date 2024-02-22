const responses = ["b", "c", "a", "a", "b"];
const emojis = ["😭", "👎", "🙃", "👀", "👍🏻", "✨"];
const comments = [
  "Ouille ouille ouille... Sais tu au moins qui est Harry Potter ?",
  "Tu es un moldu, tu ne sembles pas connaitre l'existence de la magie", 
  "Aie... Tu es problament un(e) cracmol",  
  "Pas mal, tu vas peut etre recevoir ta lettre pour Poudlard", 
  "Effort Exceptionnel ! Essaye d'obtenir un Optimal", 
  "Bravo ! Tu viens d'obtenir la note maximale a tes BUSE"
];

const form = document.querySelector("form");
const formQuestions = form.querySelectorAll("input", "value", "name");

const classScore = document.querySelector('.score');
const classComment = document.querySelector('.comment');
const classRetry = document.querySelector('.retry');

form.addEventListener("submit", checkAnswer);

function checkAnswer(e) {
  e.preventDefault();
  let score = 0;
  for (let i = 0; i < formQuestions.length; i++) {
    if (formQuestions[i].checked && responses[formQuestions[i].name] === formQuestions[i].value) {
      correctAnswer(formQuestions[i].name);
      score++;
    }
    if (formQuestions[i].checked && responses[formQuestions[i].name] != formQuestions[i].value)
         wrongAnswer(formQuestions[i].name);
  }
  displayScore(score);
}

const questionBlock = document.querySelectorAll(".question");

function correctAnswer(question) {
  questionBlock[question].style.background = "#76b852";
  questionBlock[question].style.background =
    "-webkit-linear-gradient(to right, #8DC26F, #76b852)";
  questionBlock[question].style.background =
    "linear-gradient(to right, #8DC26F, #76b852)";
}

function wrongAnswer(question) {
    questionBlock[question].style.background = "#ff9966";
    questionBlock[question].style.background = "-webkit-linear-gradient(to right, #ff5e62, #ff9966)";
    questionBlock[question].style.background = "linear-gradient(to right, #ff5e62, #ff9966)";
}


console.log(classScore, classComment, classRetry);

function displayScore(score) {
  classComment.textContent = emojis[score] + " " + comments[score] + " " + emojis[score];
  classComment.style.padding = "10px";
  classScore.innerHTML = "Score: <strong>" + score + " / 5<strong>";
  classScore.style.padding = "10px";
  if (score != 5) {
    classRetry.textContent = "Retentez de repondre aux questions fausses et re-validez !";
    classRetry.style.padding = "10px";
  }
  if (score === 5) {
    classRetry.textContent = "";
  }
}