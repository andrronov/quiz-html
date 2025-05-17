const quizList = document.getElementById("quiz-list");

window.quizzes.forEach((quiz) => {
  const card = document.createElement("div");
  card.className = "quiz-card";

  const title = document.createElement("div");
  title.className = "quiz-title";
  title.textContent = quiz.title;

  const description = document.createElement("div");
  description.className = "quiz-description";
  description.textContent = quiz.description || "Нет описания";

  const meta = document.createElement("div");
  meta.className = "quiz-meta";
  meta.textContent = `Вопросов: ${quiz.questions.length}`;

  const button = document.createElement("button");
  button.className = "btn";
  button.textContent = "Начать";
  button.onclick = () => {
    window.location.href = `play.html?id=${quiz.id}`;
  };

  [title, description, meta, button].forEach((attr) => {
    card.appendChild(attr)
  });

  quizList.appendChild(card);
});
