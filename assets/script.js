const questions = [
    {
        question: "who is the best Pokemon",
        answer: ["Oshawott", "Snivy", "Mudkip", "Charmander"],
        correct: "Oshawott"
    },
    {
        question: "Who is best boy",
        answer: ["Lupin III", "Goemon", "Jigen", "Zenigata"],
        correct: "Goemon"
    },
    {
        question: "What is 5 x 6 + 20",
        answer: ["13", "20", "50", "56"],
        correct: "50"
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

function startGame() { //starts quiz
    questionIndex = 0
    score = 0
    loadQuestion()
    timer()
}

function timer() { // starts timer
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

function loadQuestion() { // loads quetions
    start.addClass("hide"); // hides start button
    qa.removeClass("hide"); // shows quiz
    questionTitle.text(questions[questionIndex].question); // gets question title
    answerButton.forEach((button) => {
        button.removeEventListener("click", checkAnswer); // remove eventlisteners stop each button to have more than one
    });
    setImg.attr("src", images[questionIndex]) // sets img based on question[index]
    answerButton.forEach((button, index) => {
        let answer = questions[questionIndex].answer[index]; // pulls all possible answers
        button.textContent = answer;
        button.disabled = false; // turn buttons on for user
        $(button).removeClass("correct wrong");
        button.addEventListener("click", checkAnswer);
    });
}

function checkAnswer() {
    answerButton.forEach((button) => {
        button.disabled = true; // stops user from selecting more than one answer
    });
    let answer = this.textContent;
    if (questions[questionIndex].correct === answer) { // checks to see if answer is right
        $(this).addClass("correct");
        score++;
        console.log(score);
    } else {
        $(this).addClass("wrong");
        time -= 5
    }
    answerButton.forEach((button, index) => {
        if (questions[questionIndex].correct === questions[questionIndex].answer[index]) { // this will show correct answer after use selects an answer
            $(button).addClass("correct");
        }
    });
}

function nextQuestion() { // starts next question
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
    const highscores = { // logs score in a object
        name: prompt(score + "/" + questions.length + ", Good job, what name would you like to save your score as?"),
        score: score
    }
    scoreBoard.push(highscores)
    localStorage.setItem("scoreboard", JSON.stringify(scoreBoard)) // saves scores to local storage
    displayLeaderboard()
}

function displayLeaderboard() {
    const storedScores = localStorage.getItem("scoreboard") // gets scores from local storage
    if (storedScores) {
        scoreBoard = JSON.parse(storedScores)
        scoreBoard.sort((a, b) => b.score - a.score)// sorts objects by scores highest to lowest
        console.log(scoreBoard)
        listScores.empty() // clears previous board to stop duplicates when showing new score
        for (index of scoreBoard) { // displays highscores
            newScore = $("<li>").text(index.name + ": " + index.score)
            listScores.append(newScore)
        }
    }
}
start.click(startGame)
next.click(nextQuestion)

