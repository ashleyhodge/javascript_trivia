const startBtn = document.getElementById('start');
const questionDiv = document.getElementById('question-div');
const scoreDiv = document.getElementById('score-div');
const question = document.getElementById('question');
const answers = document.getElementById('answers');
const currentQuestion = document.getElementById('current-question');
const totalQuestion = document.getElementById('total-question');
const correctScore = document.getElementById('correct-score')



let correctAnswer = '', correct = asked = 0, total = 10

startBtn.addEventListener('click', startGame)

function startGame() {
  startBtn.classList.add('hidden');
  questionDiv.classList.remove('hidden');
  scoreDiv.classList.remove('hidden');
  totalQuestion.textContent = total;
  currentQuestion.textContent = asked;
  correctScore.textContent = correct;

  loadQuestion()
}


async function loadQuestion(){
  const APIUrl = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";
  const result = await fetch(`${APIUrl}`);
  const data = await result.json();
  setQuestion(data.results[0])
}

function setQuestion(data) {
  let correct = data.correct_answer;
  let incorrect = data.incorrect_answers;
  let answerList = incorrect;
  answerList.splice(Math.floor(Math.random() * (incorrect.length + 1)), 0, correct);

  question.innerHTML = `${data.question}`;
  answers.innerHTML = `${answerList.map((answer, index) => `
  <button ${index + 1} class="border-2 rounded-md border-[#4a8fe7] text-gray-600 hover:bg-[#4a8fe7]/25 hover:border-opacity-25"><span>${answer}</span></button>
  `).join("")}`
}
