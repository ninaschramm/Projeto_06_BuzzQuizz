let title;
let level;
let questionQtt;
let imgURL;
let number;

let id = 0;

function reload(){
    window.location.reload()
}
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

    for (let i = 0; i < quizzes.data.length; i++) {
        allQuizzes.innerHTML += `<li class="li_quizz" style="background-image: url('${quizzes.data[i].image}')" data-quiz="${quizzes.data[i].id}" onclick="initQuiz(this)">
     <div>${quizzes.data[i].title}</div> 
 </li>`
    }


    if (quizzes.data.length < 3) { adjustSize() }
}

getQuizzes()

function adjustSize() {
    {
        document.querySelector(".li_quizz").classList.add("adjustMargin");
        allQuizzes.classList.add("adjustSpace");
    }
}


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
            `<li class="questioning closed">
             <span>Pergunta ${i + 1}</span>
             <ion-icon onclick="openQuestion(this)" name="create-outline"></ion-icon>

             <div class="hidden">
        <div>
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
        </div>
        </li>`
    }
}

function openQuestion(elem) {
    const open = (elem.parentElement).querySelector("div")
    const opened = (elem.parentElement).parentElement.querySelector(".opened")
    if (opened !== null) {
        opened.classList.remove("opened")
        opened.classList.add("closed")
        opened.querySelector("div").classList.add("hidden")
    }
    elem.parentElement.classList.remove("closed")
    open.classList.remove("hidden")
    elem.parentElement.classList.add("opened")
    console.log(elem)


}

function createLevels() {
    if (questionsValidation()) {
        document.querySelector(".thirdScreenQuestions").classList.add("hidden")
        document.querySelector(".thirdScreenLevels").classList.remove("hidden")
    }
    else {
        alert("Algum dos dados está fora dos requisitos para criação de quiz")
    }

    const ulLevel = document.querySelector(".thirdScreenLevels ul")
    ulLevel.innerHTML = ""
    for (let i = 0; i < level; i++) {
        ulLevel.innerHTML +=
            `<li class="level closed">
        <span>Nível ${i + 1}</span>
        <ion-icon onclick="openLevel(this)" name="create-outline"></ion-icon>

        <div class="hidden">
            <input class="level-title" placeholder="Título do nível" type="text">
            <input class="min-right" placeholder="% de acerto mínima" type="text">
            <input class="imgURL" placeholder="URL da imagem do nível" type="text">
            <input class="level-description" placeholder="Descrição do nível" type="text">
        </div>

    </li>`
    }
}

function openLevel(elem) {
    const open = (elem.parentElement).querySelector("div")
    const opened = (elem.parentElement).parentElement.querySelector(".opened")
    if (opened !== null) {
        opened.classList.remove("opened")
        opened.classList.add("closed")
        opened.querySelector("div").classList.add("hidden")
    }
    elem.parentElement.classList.remove("closed")
    open.classList.remove("hidden")
    elem.parentElement.classList.add("opened")
    console.log(elem)
}


function questionsValidation() {
    const question = document.querySelectorAll(".question")
    const questionColor = document.querySelectorAll(".question-color")
    const answer = document.querySelectorAll(".answer")
    imgURL = document.querySelectorAll(".imgURL")
    const re = /[0-9A-Fa-f]{6}/g;


    for (let i = 0; i < question.length; i++) {
        if (question[i].value.length < 20) {
            console.log("a")
            return false;
        }
    }

    for (let i = 0; i < answer.length; i++) {
        if (answer[i].value === "") {
            console.log("b")
            return false
        }
    }

    for (let i = 0; i < imgURL.length; i++) {
        if (!(imgURL[i].value.startsWith('https'))) {
            console.log("d")
            return false
        }
    }

    for (let i = 0; i < questionColor.length; i++) {
        let reTest = re.test(questionColor[i].value)
        console.log(questionColor[i].value)
        console.log(reTest)
        if (reTest !== true) {
            console.log("c")
            console.log(reTest)
            return false;
        }
        re.lastIndex = 0;
    }
    console.log("e")
    return true;
}
function levelValidation() {
    const levelTitle = document.querySelectorAll(".level-title")
    const minRight = Array.from(document.querySelectorAll(".min-right"))
    const levelDescription = document.querySelectorAll(".level-description")
    imgURL = document.querySelectorAll(".imgURL")


    for (let i = 0; i < levelTitle.length; i++) {
        if (levelTitle[i].value.length < 10) {
            console.log("a")
            return false;
        }
    }
    for (let i = 0; i < minRight.length; i++) {
        let minRightNum=[]
        minRightNum[i] = Number(minRight[i].value)
        console.log(minRightNum)
        if ( minRightNum < 0 || minRightNum  > 100 || !(minRightNum.some(checkZero))) {  
            // 
            console.log(minRightNum.some(checkZero))
            console.log("b")
            return false;
        }
    }
    for (let i = 0; i < levelDescription.length; i++) {
        if (levelDescription[i].value.length < 30) {
            console.log("c")
            return false;
        }
    }
    for (let i = 0; i < imgURL.length; i++) {
        if (!(imgURL[i].value.startsWith('https'))) {
            console.log("d")
            return false
        }
    }
    console.log("e")
    return true;
}
function checkZero(elem){
return elem === 0
}
function endQuiz() {
    if (levelValidation()) {
        document.querySelector(".thirdScreenLevels").classList.add("hidden")
    }
}

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
    for (let i = 0; i < resposta.data.questions.length; i++) {
        const answersArr = []
        for (let j = 0; j < resposta.data.questions[i].answers.length; j++) {
            answersArr.push(resposta.data.questions[i].answers[j])
            answersArr.sort(comparador)
        }
        document.querySelector(".questionsQuizz").innerHTML += `<div class="question">
    <div class="questionTitle" style="background-color:${resposta.data.questions[i].color}">${resposta.data.questions[i].title}</div>
   <div class="answers n_${[i]}"></div>
</div>`
        for (let y = 0; y < answersArr.length; y++) {
            document.querySelector(`.answers.n_${[i]}`).innerHTML += `<div class="answer" onclick="chooseAnswer(this)"><img src="${answersArr[y].image}" /> ${answersArr[y].text}`
        }
    }

}



function comparador() {
    return Math.random() - 0.5;
}