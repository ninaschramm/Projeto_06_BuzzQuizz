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
