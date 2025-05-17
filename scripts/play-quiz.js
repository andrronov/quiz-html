const container = document.getElementById("quiz-container");
const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get("id");

const quiz = window.quizzes.find((q) => q.id == quizId);
if (!quiz) {
  console.log(quizId, window.quizzes);
  container.innerHTML = "<p>Квиз не найден.</p>";
  throw new Error("Quiz not found");
}

let currentQuestion = 0;
let score = 0;

function renderTitle() {
  const title = document.getElementById("quiz-title");
  title.innerHTML = `${quiz.title} (${currentQuestion + 1} / ${
    quiz.questions.length
  })`;
}

function renderQuestion() {
  renderTitle();
  const q = quiz.questions[currentQuestion];
  container.innerHTML = "";

  const questionEl = document.createElement("div");
  questionEl.className = "question";
  questionEl.textContent = q.question;

  const answersEl = document.createElement("div");
  answersEl.className = "answers";

  q.answers.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = option;
    btn.onclick = () => {
      if (index === q.correctIndex) {
        score++;
      }
      currentQuestion++;
      if (currentQuestion < quiz.questions.length) {
        renderQuestion();
      } else {
        showResult();
      }
    };
    answersEl.appendChild(btn);
  });

  [questionEl, answersEl].forEach((attr) => {
    container.appendChild(attr);
  });
}

function showResult() {
  container.innerHTML = `<div class="result">Квиз завершён!<br>Ваш результат: ${score} из ${quiz.questions.length}</div>`;
}

renderQuestion();
