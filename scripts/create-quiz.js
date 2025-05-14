const quizTitleInput = document.getElementById("quiz-title");
const questionsContainer = document.getElementById("questions-container");
const addQuestionBtn = document.getElementById("add-question");
const saveQuizBtn = document.getElementById("save-quiz");

let questionCount = 0;

addQuestionBtn.addEventListener("click", () => {
  const questionId = `q-${questionCount++}`;

  const questionBlock = document.createElement("div");
  questionBlock.classList.add("question-block");

  questionBlock.innerHTML = `
    <label>
      Вопрос:
      <input type="text" name="question" required />
    </label>
    <div class="answers">
      ${[0, 1, 2, 3]
        .map(
          (i) => `
        <label>
          <input type="radio" name="correct-${questionId}" value="${i}" required />
          <input type="text" name="answer-${i}" placeholder="Вариант ${i + 1}" required />
        </label>
      `
        )
        .join("")}
    </div>
    <hr />
  `;

  questionsContainer.appendChild(questionBlock);
});

saveQuizBtn.addEventListener("click", () => {
  const title = quizTitleInput.value.trim();
  if (!title) return alert("Введите название квиза");

  const questionBlocks = [...document.querySelectorAll(".question-block")];
  const questions = [];

  for (const block of questionBlocks) {
    const questionText = block.querySelector('input[name="question"]').value.trim();
    if (!questionText) return alert("Не заполнен вопрос");

    const answerInputs = [...block.querySelectorAll('input[type="text"][name^="answer-"]')];
    const answers = answerInputs.map((input) => input.value.trim());
    if (answers.some((a) => !a)) return alert("Заполните все варианты ответа");

    const correctRadio = block.querySelector('input[type="radio"]:checked');
    if (!correctRadio) return alert("Выберите правильный ответ");

    const correctIndex = parseInt(correctRadio.value, 10);

    questions.push({ question: questionText, answers, correctIndex });
  }

  const quiz = {
    id: Date.now(),
    title,
    questions
  };

  const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
  quizzes.push(quiz);
  localStorage.setItem("quizzes", JSON.stringify(quizzes));

  alert("Квиз сохранён!");
  window.location.href = "my-quizzes.html";
});
