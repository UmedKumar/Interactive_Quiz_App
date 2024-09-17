// script.js

const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: "Paris"
    },
    {
        question: "Which language is used for web development?",
        options: ["Python", "Java", "JavaScript", "C++"],
        correct: "JavaScript"
    },
    {
        question: "What does HTML stand for?",
        options: ["HyperText Markup Language", "HyperTransfer Markup Language", "HyperTool Multi Language", "None of the above"],
        correct: "HyperText Markup Language"
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const submitBtn = document.getElementById("submit-btn");
const resultContainer = document.getElementById("result-container");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("time");
const restartBtn = document.getElementById("restart-btn");

// Start the timer when the quiz begins
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

// Load a question and its options
function loadQuestion() {
    const currentQuiz = quizData[currentQuestion];
    questionEl.textContent = currentQuiz.question;
    optionsEl.innerHTML = "";

    currentQuiz.options.forEach((option, index) => {
        const optionEl = document.createElement("li");
        optionEl.textContent = option;
        optionEl.addEventListener("click", () => selectOption(optionEl));
        optionsEl.appendChild(optionEl);
    });
}

// Handle option selection
function selectOption(optionEl) {
    document.querySelectorAll("#options li").forEach(li => {
        li.classList.remove("selected");
    });
    optionEl.classList.add("selected");
}

// Check the answer and move to the next question
submitBtn.addEventListener("click", () => {
    const selectedOption = document.querySelector(".selected");

    if (!selectedOption) return;

    const selectedAnswer = selectedOption.textContent;
    if (selectedAnswer === quizData[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
});

// End the quiz and display results
function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById("quiz").style.display = "none";
    resultContainer.style.display = "block";
    scoreEl.textContent = `${score} / ${quizData.length}`;
}

// Restart the quiz
restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
    document.getElementById("quiz").style.display = "block";
    resultContainer.style.display = "none";
    loadQuestion();
    startTimer();
});

// Start the quiz
loadQuestion();
startTimer();
