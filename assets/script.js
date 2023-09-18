const questions = [
    {
        question: "who is the best Pokemon",
        answer: ["Oshawott", "Snivy", "Mudkip", "Charmander"],
        correct: "Oshawott"
    },
    {
        question: "who is best boy",
        answer: ["Lupin III", "Goemon", "Jigen", "zenigata"],
        correct: "Snivy"
    },
    {
        question: "who is the worstPokemon",
        answer: ["Oshawott", "Snivy", "Mudkip", "Charmander"],
        correct: "Snivy"
    }
]
let images = [
    "./assets/img/Oshawott-PNG-Isolated-Image.png",
    "./assets/img/hiclipart.com.png",
    "./assets/img/pngimg.com - number1_PNG14895.png"
]
let questionIndex = 0
let answerButton = document.querySelectorAll(".btn")
let start = $("#start-btn")
let qa = $("#q-a")
let next = $("#next")
let questionTitle = $("#question")
let scoreBoard = []
let score = 0
let timeLeft = $("#time-left")
let timeInterval
let time = 25
let listScores = $("#scores")
let setImg = $("#q-a img")

function startGame() {
    questionIndex = 0
    score = 0
    loadQuestion()
    timer()
}

function timer() {
    timeInterval = setInterval(function () {
        if (time >= 1) {
            time--
            timeLeft.text(time)
            console.log(time)
        } else {
            clearInterval(timeInterval)
            endGame()
            alert("Out of time!")
        }
    }, 1000)
}

function loadQuestion() {
    start.addClass("hide");
    qa.removeClass("hide");
    questionTitle.text(questions[questionIndex].question);
    answerButton.forEach((button) => {
        button.removeEventListener("click", checkAnswer);
    });
    setImg.attr("src", images[questionIndex])
    answerButton.forEach((button, index) => {
        let answer = questions[questionIndex].answer[index];
        button.textContent = answer;
        button.disabled = false;
        $(button).removeClass("correct wrong");
        button.addEventListener("click", checkAnswer);
    });
}

function checkAnswer() {
    answerButton.forEach((button) => {
        button.disabled = true;
    });
    let answer = this.textContent;
    if (questions[questionIndex].correct === answer) {
        $(this).addClass("correct");
        score++;
        console.log(score);
    } else {
        $(this).addClass("wrong");
        time -= 5
    }
    answerButton.forEach((button, index) => {
        if (questions[questionIndex].correct === questions[questionIndex].answer[index]) {
            $(button).addClass("correct");
        }
    });
}

function nextQuestion() {
    questionIndex++
    if (questionIndex < questions.length) {
        loadQuestion()
    } else {
        endGame()
    }
}
function endGame() {
    time = 25
    clearInterval(timeInterval)
    timeLeft.text(0)
    start.removeClass("hide");
    qa.addClass("hide");
    const highscores = {
        name: prompt(score + "/" + questions.length + ", Good job, what name would you like to save your score as?"),
        score: score
    }
    scoreBoard.push(highscores)
    localStorage.setItem("scoreboard", JSON.stringify(scoreBoard))
    displayLeaderboard()
}

function displayLeaderboard() {
    const storedScores = localStorage.getItem("scoreboard")
    if (storedScores) {
        scoreBoard = JSON.parse(storedScores)
        scoreBoard.sort((a, b) => b.score - a.score)
        console.log(scoreBoard)
        listScores.empty()
        for (index of scoreBoard) {
            newScore = $("<li>").text(index.name + ": " + index.score)
            listScores.append(newScore)
        }
    }
}
start.click(startGame)
next.click(nextQuestion)

