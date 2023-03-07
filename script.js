const startBtn = document.getElementById('start');
const nextBtn = document.getElementById('next');
const endBtn = document.getElementById('end');
const playAgainBtn = document.getElementById('play-again')
const title = document.getElementById('title')
const questionDiv = document.getElementById('question-div');
const scoreDiv = document.getElementById('score-div');
const question = document.getElementById('question');
const answersBtn = document.getElementById('answers');
let currentTime = document.getElementById('time')
let currentQuestion = document.getElementById('current-question');
const totalQuestion = document.getElementById('total-question');
let correctScore = document.getElementById('correct-score')
const finalDiv = document.getElementById('final-con')

let timeLeft;
let timeValue = 10;
let final = 0

// start game
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', () => {
  currentQuestion.textContent++
  resetState()
  loadQuestion()
  clearInterval(timeLeft)
  startTimer(timeValue)
})
endBtn.addEventListener('click', endGame);
playAgainBtn.addEventListener('click', startGame)

function startGame() {
  title.classList.add('hidden');
  startBtn.classList.add('hidden');
  playAgainBtn.classList.add('hidden');
  questionDiv.classList.remove('hidden');
  scoreDiv.classList.remove('hidden');
  currentTime.classList.remove('hidden')
  finalDiv.classList.add('hidden')
  currentQuestion.textContent = 1
  correctScore.innerHTML = 0
  loadQuestion()
  startTimer(10)
}


async function loadQuestion(){
  const APIUrl = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";
  const result = await fetch(`${APIUrl}`);
  let data = await result.json();
  totalQuestion.textContent = data.results.length
  setQuestion(data.results[0])
  
}


function setQuestion(data) {
  
  // set question 
  question.innerHTML = data.question;
  // combine correct_answer and incorrect_answers
  let answers = data.incorrect_answers
  answers.splice(Math.floor(Math.random() * (answers.length +1)), 0, data.correct_answer);

  answers.forEach((answer, i) => {
    console.log(data.correct_answer)
    const button = document.createElement('button');
    button.innerHTML = answer
    button.classList.add('btn')
    button.setAttribute('id', `btn-${i++}`)
    if(answer == data.correct_answer) {
      button.classList.add('correct')
    }
    button.addEventListener('click', selectAnswer)
    answersBtn.appendChild(button)
  });

}

function selectAnswer(e){
  let selectedAnswer = e.target

  if(selectedAnswer.matches('.correct')){
    selectedAnswer.classList.remove('btn');
    selectedAnswer.classList.add('correct-btn')
    if(currentQuestion.textContent == totalQuestion.textContent) {
      endBtn.classList.remove('hidden')
    } else {
      nextBtn.classList.remove('hidden');
    }
    
    correctScore.textContent++
  } else {
    selectedAnswer.classList.remove('btn');
    selectedAnswer.classList.add('wrong-btn')
    if(currentQuestion.textContent == totalQuestion.textContent) {
      endBtn.classList.remove('hidden')
    } else {
      nextBtn.classList.remove('hidden');
    }
  }
  disableBtns()
  clearInterval(timeLeft)
}


function resetState() {
  nextBtn.classList.add('hidden');
  while(answersBtn.firstChild) {
    answersBtn.removeChild(answersBtn.firstChild)
  }
}

function endGame() {
  resetState()
  clearInterval(timeLeft)
  questionDiv.classList.add('hidden')
  endBtn.classList.add('hidden')
  playAgainBtn.classList.remove('hidden')
  currentTime.classList.add('hidden')
  finalScore()
}

function disableBtns(){
const btn4 = document.getElementById('btn-3')
const btn3 = document.getElementById('btn-2')
const btn2 = document.getElementById('btn-1')
const btn1 = document.getElementById('btn-0')
  btn1.disabled = true;
  btn2.disabled = true;
  btn3.disabled = true;
  btn4.disabled = true;
}

function startTimer(time) {
  
  timeLeft = setInterval(timer,800)
  function timer() {
    currentTime.textContent = time;
    time-- 

    if(time < 0) {
    disableBtns()
    clearInterval(timeLeft)
    queryCorrect()
    if(currentQuestion.textContent == totalQuestion.textContent) {
      endBtn.classList.remove('hidden')
    } else {
      nextBtn.classList.remove('hidden');
    }
    } 
  }
}

function queryCorrect() {
const btn4 = document.getElementById('btn-3')
const btn3 = document.getElementById('btn-2')
const btn2 = document.getElementById('btn-1')
const btn1 = document.getElementById('btn-0')

  if(btn1.matches('.correct')) {
    btn1.classList.remove('btn');
    btn1.classList.add('correct-btn')
  } else {
    btn1.classList.remove('btn');
    btn1.classList.add('wrong-btn')
  }
  if(btn2.matches('.correct')) {
    btn2.classList.remove('btn');
    btn2.classList.add('correct-btn')
  } else {
    btn2.classList.remove('btn');
    btn2.classList.add('wrong-btn')
  }
  if(btn3.matches('.correct')) {
    btn3.classList.remove('btn');
    btn3.classList.add('correct-btn')
  } else {
    btn3.classList.remove('btn');
    btn3.classList.add('wrong-btn')
  }
  if(btn4.matches('.correct')) {
    btn4.classList.remove('btn');
    btn4.classList.add('correct-btn')
  } else {
    btn4.classList.remove('btn');
    btn4.classList.add('wrong-btn')
  }
}

function finalScore() {
  let final_score = document.getElementById('final-score')
  let assessment = document.getElementById('assessment')
  final = (correctScore.innerHTML/totalQuestion.innerHTML) * 100
  
  final_score.innerHTML = final
  finalDiv.classList.remove('hidden')

  if(final >= 80 && final < 100) {
    assessment.innerHTML = 'Great Job!'
  } else if(final == 100) {
    assessment.innerHTML = "You're perfect!"
  } else if(final <= 70 && final >= 50 ) {
    assessment.innerHTML = "Good job, but you can do better. Try again!"
  } else {
    assessment.innerHTML = "Try again! You've got this!"
  }


}