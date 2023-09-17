const questions = [
    {
        question: "who is the best Pokemon",
        answer: ["Oshawott", "Snivy", "Mudkip", "Charmander"],
        correct: "Oshawott"
    },
    {
        question: "who is the worst Pokemon",
        answer: ["Oshawott", "Snivy", "Mudkip", "Charmander"],
        correct: "Snivy"
    },
    {
        question: "who is the worstPokemon",
        answer: ["Oshawott", "Snivy", "Mudkip", "Charmander"],
        correct: "Snivy"
    }

]
let questionIndex = 0
let answerButton = document.querySelectorAll(".btn")
let start = $("#start-btn")
let qa = $("#q-a")
let next = $("#next")
let questionTitle = $("#question")
let score = 0
let timeLeft = $("#time-left")
let timeInterval

function startGame(){
    questionIndex = 0
    score = 0
    loadQuestion()
    timer()
}

function timer(){
    let time = 10
    timeInterval = setInterval(function(){
        if(time >= 1){
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
    
    answerButton.forEach((button, index) => {
        let answer = questions[questionIndex].answer[index];
        button.textContent = answer;
        button.disabled = false; 
        $(button).removeClass("correct wrong"); 
        button.addEventListener("click", checkAnswer);
    });
}

function checkAnswer(){
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
function endGame(){
    clearInterval(timeInterval)
    timeLeft.text(0)
    start.removeClass("hide");
    qa.addClass("hide");
}
start.click(startGame)
next.click(nextQuestion)

