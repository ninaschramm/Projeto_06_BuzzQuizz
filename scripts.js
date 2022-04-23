function getQuizzes() {
 const promise = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes")

 promise.then(listQuizzes)
 promise.catch(treatError)
}

function treatError() {
    alert("Ops! Algo de errado")
}
function funciona() {
    console.log("Voltou resposta")
}

const allQuizzes = document.getElementById("listAllQuizzes")

function listQuizzes(quizzes) {
    funciona()

 for (let i=0; i<quizzes.data.length; i++) {
     allQuizzes.innerHTML +=  `<li class="li_quizz" style="background-image: url('${quizzes.data[i].image}')" data-quiz="${quizzes.data[i].id}" onclick="initQuiz(this)">
     <div>${quizzes.data[i].title}</div> 
 </li>`
 } 

    
 if (quizzes.data.length < 3) {adjustSize()}
}

getQuizzes()

function adjustSize() {
    {   document.querySelector(".li_quizz").classList.add("adjustMargin");
        allQuizzes.classList.add("adjustSpace");}
}

let title;
let level;
let questionQtt;
let imgURL;
let number;
function createQuiz() {
    document.querySelector(".content.firstScreen").classList.add("hidden")
    document.querySelector(".content.thirdScreen").classList.remove("hidden")
}

function validationQuestions() {
    title = document.querySelector("input.title").value
    questionQtt = Number(document.querySelector("input.questionQtt").value)
    level = Number(document.querySelector("input.level").value)
    imgURL = document.querySelector("input.imgURL")

    if (title.length < 20 || title.length > 65 || questionQtt < 3 || level < 2 || !(imgURL.value.startsWith('https'))) {
        return false
    }
    return true
}

function createQuestions() {
    if (validationQuestions()) {
        document.querySelector(".thirdScreenStart").classList.add("hidden")
        document.querySelector(".thirdScreenQuestions").classList.remove("hidden")

    }
    else {
        alert("Algum dos dados está fora dos requisitos para criação de quiz")
    }

    const ulQuestions = document.querySelector(".thirdScreenQuestions ul")
    ulQuestions.innerHTML = ""
    for (let i = 0; i < questionQtt; i++) {
        ulQuestions.innerHTML +=
            `<li >
             <span>Pergunta ${i + 1}</span>
             <ion-icon onclick="openQuestion(this)" name="create-outline"></ion-icon>
        </li>`
    }
}

function openQuestion(elem) {
    const opened = document.querySelector(".questioning")
    if (opened !== null) {
        opened.classList.remove("questioning")
        opened.innerHTML = `<span>Pergunta ${number + 1}</span>
        <ion-icon onclick="openQuestion(this)" name="create-outline"></ion-icon>` //keeps the number of the last question, because it's before the next definition 
    }

    number = Array.from(elem.closest("li").parentNode.children).indexOf(elem.closest("li")) //searching from the number of the question I'm clicking on ** creating an array so I can take the index

    elem.closest("li").classList.add("questioning");
    elem.closest("li").innerHTML =

        `<div>
            <span>Pergunta ${number + 1}</span>
            <input class="question" placeholder="Texto da pergunta" type="text">
            <input class="question-color" placeholder="Cor de fundo da pergunta" type="text">
        </div>
        <div>
            <p>Resposta correta</p>
            <input class="answer" placeholder="Resposta correta" type="text">
            <input class="imgURL" placeholder="URL da imagem" type="text">
        </div>
        <div>
        <span>Respostas incorretas</span>   
            <input class="answer" placeholder="Resposta incorreta 1" type="text">
            <input class="imgURL" placeholder="URL da imagem 1" type="text">
        </div>
        <div>
            <input placeholder="Resposta incorreta 2" type="text">
            <input placeholder="URL da imagem 2" type="text">
        </div>
        <div>
            <input placeholder="Resposta incorreta 3" type="text">
            <input placeholder="URL da imagem 3" type="text">
        </div>
        `
}

//BIG PROBLEM, WHEN NONE IS OPEN, NONE HAS "QUESTIONING", THINK OF ANOTHER WAY OF MAKING IT WORK! I HAVE TO HAVE THE INPUTS VALUES EVEN IF ITS CLOSED! 
function questionsValidation() {
    const question = document.querySelectorAll(".question")
    const questionColor = document.querySelectorAll(".question-color")
    const answer = document.querySelectorAll(".answer")
    imgURL = document.querySelectorAll(".imgURL")
    const re = /[0-9A-Fa-f]{6}/g;

    console.log(question.length)
    for (let i = 0; i < question.length; i++) {
        if (question[i].value.length < 20) {
            return false;
        }
    }
    
    for (let i = 0; i < answer.length; i++){
        if (answer[i].value === ""){
            return false
        }
    }

    for (let i = 0; i < questionColor.length; i++) {

        if (!(re.test(questionColor[i].value))) {
            return false;
        }
    }
    for (let i = 0; i < imgURL.length; i++){
        if (!(imgURL[i].value.startsWith('https'))){
            return false
        }
    }
    return true;
}



function createLevels() {
    if (questionsValidation()){
        document.querySelector(".thirdScreenQuestions").classList.add("hidden")
    }
    else{
        alert("Algum dos dados está fora dos requisitos para criação de quiz")
    }

}

let id = 0;

function initQuiz(idQuiz) {
    id = idQuiz.dataset.quiz;
    document.querySelector(".firstScreen").classList.add("hidden")
    document.querySelector(".secondScreen").classList.remove("hidden")
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`)
    promise.then(takeQuiz)
}

function takeQuiz(resposta) {
    console.log(id)
    document.querySelector(".headQuizz").innerHTML = `<img src="${resposta.data.image}" /> <div class="titleQuiz">${resposta.data.title}</div> <div class="hideHead"></div>`
    for (let i=0; i<resposta.data.questions.length; i++) { 
        const answersArr = []
     for (let j=0; j<resposta.data.questions[i].answers.length; j++) {
         answersArr.push(resposta.data.questions[i].answers[j])
         answersArr.sort(comparador)
     }  
    document.querySelector(".questionsQuizz").innerHTML += `<div class="question next">
    <div class="questionTitle" style="background-color:${resposta.data.questions[i].color}">${resposta.data.questions[i].title}</div>
   <div class="answers n_${[i]}"></div>
</div>`
for (let y=0; y< answersArr.length; y++) {
    document.querySelector(`.answers.n_${[i]}`).innerHTML += `<div class="answer" onclick="chooseAnswer(this)" data-correct="${answersArr[y].isCorrectAnswer}"><div class="notselected hidden"></div>  <img src="${answersArr[y].image}" /> ${answersArr[y].text}</div>`
}
    }
}

function comparador() { 
	return Math.random() - 0.5; 
}

let pontos = 0;

function chooseAnswer(selectedAnswer) {
    if (selectedAnswer.dataset.correct == "true") {
        pontos ++;
    }
    let parent = selectedAnswer.parentNode;
    let parentAnswer = parent.classList[1];
    let answerDiv = document.querySelector(`.${parentAnswer}`)
    let parentQuestion = answerDiv.parentNode;
    parentQuestion.classList.remove("next")

    let answerList = answerDiv.querySelectorAll(`div.answer`)
    console.log(answerList)
    for (let i=0; i<answerList.length; i++) {        
      answerList[i].querySelector(".notselected").classList.remove("hidden");
      answerList[i].onclick="null";
      if (answerList[i].dataset.correct == "true") {
          answerList[i].classList.add("correctAnswer")
      }
      else {answerList[i].classList.add("wrongAnswer")}
    }
    selectedAnswer.querySelector(".notselected").classList.add("hidden")

    nextAnswerDiv = document.querySelector(".next")
    setTimeout(scrollNext, 2000); 
}

function scrollNext() {
    nextAnswerDiv.scrollIntoView({behavior: "smooth"})
}

