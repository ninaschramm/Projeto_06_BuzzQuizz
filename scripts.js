let title;
let level;
let questionQtt;
let imgURL;
let number;
let quizToPost = {
    title: "",
    image: "",
    questions: [],
    levels: [],
}
let id = 0;
let lastId;

//reload the page on certain clicks
function reload() {
    window.location.reload()
}

function getQuizzes() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes")

    promise.then(listQuizzes)
    promise.catch(treatError)
}

function treatError() {
    alert("Ops! Algo deu errado")
}
function funciona() {
    console.log("Voltou resposta")
}

const allQuizzes = document.getElementById("listAllQuizzes");
const yourQuizzes = document.getElementById("yourQuizzList");
const listSerial = localStorage.getItem("myQuizzesList");
let myQuizzesList = JSON.parse(listSerial);

function listQuizzes(quizzes) {
    funciona()
    
    console.log(myQuizzesList)
    if (myQuizzesList.length != 0)
    {document.querySelector(".noQuiz").classList.add("hidden");
    document.querySelector(".yourQuizzes").classList.remove("hidden")}

    for (let i = 0; i < quizzes.data.length; i++) {
        if (myQuizzesList.includes(quizzes.data[i].id)) {
            yourQuizzes.innerHTML += `<li class="li_quizz" style="background-image: url('${quizzes.data[i].image}')" data-quiz="${quizzes.data[i].id}" onclick="initQuiz(this)">
            <div>${quizzes.data[i].title}</div> </li>`
        }
        else {
            allQuizzes.innerHTML += `<li class="li_quizz" style="background-image: url('${quizzes.data[i].image}')" data-quiz="${quizzes.data[i].id}" onclick="initQuiz(this)">
            <div>${quizzes.data[i].title}</div> </li>`
        }
    }
}


getQuizzes()

function takeMyQuiz() {
    id = lastId;
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`)
    promise.then(takeQuiz)
    document.querySelector(".content.firstScreen").classList.remove("hidden")
    document.querySelector(".content.thirdScreen").classList.add("hidden")
}


//after we click on the part to create Quiz, the first screen will be hidden 
function createQuiz() {
    document.querySelector(".content.firstScreen").classList.add("hidden")
    document.querySelector(".content.thirdScreen").classList.remove("hidden")
}

// see if the creation of the questions is going to be valid with the briefing 
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

// creating each question with its answers inputs
function createQuestions() {
    if (validationQuestions()) {
        document.querySelector(".thirdScreenStart").classList.add("hidden")
        document.querySelector(".thirdScreenQuestions").classList.remove("hidden")
        const quizTitle = document.getElementById("quizTitle");
        const quizURL = document.getElementById("quizURL");
        quizToPost.title = quizTitle.value;
        quizToPost.image = quizURL.value;
        console.log(quizToPost);

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
       <input class="answer answer${i} mandatory" data-correct="true" placeholder="Resposta correta" type="text">
       <input class="imgURL imgURL${i} mandatory" placeholder="URL da imagem" type="text">
   </div>
   <div>
   <span>Respostas incorretas</span>   
       <input class="answer answer${i} mandatory" data-correct="false" placeholder="Resposta incorreta 1" type="text">
       <input class="imgURL imgURL${i} mandatory" placeholder="URL da imagem 1" type="text">
   </div>
   <div>
       <input class="answer answer${i}" data-correct="false" placeholder="Resposta incorreta 2" type="text">
       <input class="imgURL imgURL${i}" placeholder="URL da imagem 2" type="text">
   </div>
   <div>
       <input class="answer answer${i}" data-correct="false" placeholder="Resposta incorreta 3" type="text">
       <input class="imgURL imgURL${i}" placeholder="URL da imagem 3" type="text">
   </div>
   </div>
   </li>`
    }
}

//click on the "edit" ion-icon, to get the card to be bigger 
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
}

// see if the question is valid, if the briefing is followed
function questionsValidation() {
    const question = document.querySelectorAll(".questioning .question")
    const questionColor = document.querySelectorAll(".question-color")
    const answer = document.querySelectorAll(".answer.mandatory")
    const imgURL_list = document.querySelectorAll(".imgURL.mandatory")
    const re = /^#[0-9A-Fa-f]{6}$/g;


    for (let i = 0; i < question.length; i++) {
        if (question[i].value.length < 20) {
            console.log("a")
            return false;
        }
    }


    //FILTRAR AQUI POR ANSWER DENTRO DE QUESTION DEPOIS
    for (let i = 0; i < answer.length; i++) {
        if (answer[i].value === "") {
            console.log("b")
            return false
        }
    }

    for (let i = 0; i < questionQtt * 2; i++) {
        if (!(imgURL_list[i].value.startsWith('https'))) {
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


// to get if some element is equal to 0, used at "some" on the validation code
function checkZero(elem) {
    return elem === 0
}

// creating each level with its specifications
function createLevels() {
    if (questionsValidation()) {
        document.querySelector(".thirdScreenQuestions").classList.add("hidden");
        document.querySelector(".thirdScreenLevels").classList.remove("hidden");
        const question = document.querySelectorAll(".questioning .question");
        const questionColor = document.querySelectorAll(".question-color");
        for (let i = 0; i < question.length; i++) {
            let answer = document.querySelectorAll(`.answer${i}`);
            console.log(answer)
            let imgURL_list = document.querySelectorAll(`.imgURL${i}`);
            quizToPost.questions.push({
                title: question[i].value,
                color: questionColor[i].value,
                answers: [],
            })
            for (let j = 0; j < answer.length; j++) {
                if (answer[j].value != "") {
                    quizToPost.questions[i].answers.push({
                        text: answer[j].value,
                        image: imgURL_list[j].value,
                        isCorrectAnswer: answer[j].dataset.correct
                    })
                }
            }
        }
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
            <input class="min-right" placeholder="% de acerto mínima" type="number">
                <input class="imgURL level" placeholder="URL da imagem do nível" type="text">
                <input class="level-description" placeholder="Descrição do nível" type="text">
            </div>
            </li>`
    }
    console.log(quizToPost);
}

//click on the "edit" ion-icon, to get the card to be bigger 
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
}

// see if the level is valid, if the briefing is followed
function levelValidation() {
    const levelTitle = document.querySelectorAll(".level-title")
    const minRight = Array.from(document.querySelectorAll(".min-right"))
    const levelDescription = document.querySelectorAll(".level-description")
    let minRightNum = []
    const imgURL_list = document.querySelectorAll(".imgURL.mandatory")


    for (let i = 0; i < levelTitle.length; i++) {
        if (levelTitle[i].value.length < 10) {
            console.log("a")
            return false;
        }
    }
    for (let i = 0; i < minRight.length; i++) {

        minRightNum[i] = Number(minRight[i].value)
        if (minRightNum[i] < 0 || minRightNum[i] > 100 || minRightNum[i] === "") {
            // 
            console.log("b")
            return false;
        }
    }
    if (!(minRightNum.some(checkZero))) {
        console.log("hex")
        return false;
    }
    for (let i = 0; i < levelDescription.length; i++) {
        if (levelDescription[i].value.length < 30) {
            console.log("c")
            return false;
        }
    }
    for (let i = 0; i < imgURL_list.length; i++) {
        if (!(imgURL_list[i].value.startsWith('https'))) {
            console.log("d")
            return false
        }
    }
    console.log("e")
    return true;
}

function endQuiz() {
    if (levelValidation()) {

        const levelTitle = document.querySelectorAll(".level-title")
        const minRight = Array.from(document.querySelectorAll(".min-right"))
        const levelDescription = document.querySelectorAll(".level-description")
        const imgURL_list = document.querySelectorAll(".imgURL.level")
        for (let i = 0; i < levelTitle.length; i++) {
            quizToPost.levels.push({
                title: levelTitle[i].value,
                image: imgURL_list[i].value,
                text: levelDescription[i].value,
                minValue: minRight[i].value
            })
        }
        console.log(quizToPost)
        let promise = axios.post("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes", quizToPost)
        promise.then(final)
        promise.catch(function () { alert("Erro ao criar seu quiz.") })
    }
    else {
        alert("Algum dos dados está fora dos requisitos para criação de quiz")
    }

}

function final(response) {
    document.querySelector(".thirdScreenLevels").classList.add("hidden")
    document.querySelector(".thirdScreenSuccess").classList.remove("hidden")
    let selectedItem = {}
    selectedItem.id = response.data.id
    const insert = document.querySelector(".thirdScreenSuccess")
    insert.innerHTML = `<h2>Seu quizz está pronto!</h2>
    <ul><li class="li_quizz" style="background-image: url('${response.data.image}')" data-quiz="${response.data.id}" onclick="initQuiz(this)">
    <div>${response.data.title}</div> 
    </li></ul>
    <button data-quiz="${response.data.id}" onclick="initQuiz(this)">Acessar Quizz</button>
    <span onclick="reload()">Voltar pra home</span>`
    lastId = response.data.id;
    SaveDataToLocalStorage(lastId)
}

function SaveDataToLocalStorage(data)
{
    let a = [];
    // Parse the serialized data back into an aray of objects
    a = JSON.parse(localStorage.getItem("myQuizzesList")) || [];
    // Push the new data (whether it be an object or anything else) onto the array
    a.push(data);
    // Alert the array value
    console.log(a);  // Should be something like [Object array]
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('myQuizzesList', JSON.stringify(a));
}


//exec 1
function initQuiz(idQuiz) {
    id = idQuiz.dataset.quiz;
    document.querySelector(".firstScreen").classList.add("hidden")
    document.querySelector(".thirdScreen").classList.add("hidden")
    document.querySelector(".secondScreen").classList.remove("hidden")
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`)
    promise.then(takeQuiz)
}

let numberOfQuestions;

function takeQuiz(resposta) {
    console.log(id);
    numberOfQuestions = resposta.data.questions.length;
    document.querySelector(".headQuizz").innerHTML = `<img src="${resposta.data.image}" /> <div class="titleQuiz">${resposta.data.title}</div> <div class="hideHead"></div>`
    for (let i = 0; i < resposta.data.questions.length; i++) {
        const answersArr = []
        for (let j = 0; j < resposta.data.questions[i].answers.length; j++) {
            answersArr.push(resposta.data.questions[i].answers[j])
            answersArr.sort(comparador)
        }
        document.querySelector(".questionsQuizz").innerHTML += `<div class="question next">
    <div class="questionTitle" style="background-color:${resposta.data.questions[i].color}">${resposta.data.questions[i].title}</div>
   <div class="answers n_${[i]}"></div>
</div>`
        for (let y = 0; y < answersArr.length; y++) {
            document.querySelector(`.answers.n_${[i]}`).innerHTML += `<div class="answer" onclick="chooseAnswer(this)" data-correct="${answersArr[y].isCorrectAnswer}"><div class="notselected hidden"></div>  <img src="${answersArr[y].image}" /> <span>${answersArr[y].text}</span></div>`
        }
    }
}

function comparador() {
    return Math.random() - 0.5;
}


let pontos = 0;
let answersSelected = 0;

function chooseAnswer(selectedAnswer) {
    answersSelected++;
    if (selectedAnswer.dataset.correct == "true") {
        pontos++;
    }
    let parent = selectedAnswer.parentNode;
    let parentAnswer = parent.classList[1];
    let answerDiv = document.querySelector(`.${parentAnswer}`)
    let parentQuestion = answerDiv.parentNode;
    parentQuestion.classList.remove("next")

    let answerList = answerDiv.querySelectorAll(`div.answer`)
    for (let i = 0; i < answerList.length; i++) {
        answerList[i].querySelector(".notselected").classList.remove("hidden");
        answerList[i].onclick = "null";
        if (answerList[i].dataset.correct == "true") {
            answerList[i].classList.add("correctAnswer")
        }
        else { answerList[i].classList.add("wrongAnswer") }
    }
    selectedAnswer.querySelector(".notselected").classList.add("hidden")

    nextAnswerDiv = document.querySelector(".next")
    setTimeout(scrollNext, 2000);

    isTestOver()
}

function scrollNext() {
    nextAnswerDiv.scrollIntoView({ behavior: "smooth" })
}

let testOver = false;
const resultDiv = document.querySelector(".resultQuizz");

function isTestOver() {
    if (answersSelected === numberOfQuestions) {
        testOver = true;
    }
    if (testOver === true) {
        resultDiv.classList.remove("hidden");
        document.querySelector(".restartQuiz").classList.remove("hidden");
        document.querySelector(".backHome").classList.remove("hidden");
        setTimeout(scrollResult, 2000)
        const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`)
        promise.then(showResult)
    }

}

function scrollResult() {
    resultDiv.scrollIntoView({ behavior: "smooth" })
}

let score = 0;
let x = 0;
let sortable = [];

function showResult(resposta) {
    const resultDiv = document.querySelector(".resultQuizz");
    score = pontos / resposta.data.questions.length * 100;
    score = Math.round(score)

    for (let i = 0; i < resposta.data.levels.length; i++) {
        numb = Number(resposta.data.levels[i].minValue)
        sortable.push([i, numb])
    }

    for (let i = 0; i < sortable.length - 1; i++) {
        if (sortable[i][1] > sortable[i + 1][1]) {
            temp = sortable[i];
            sortable[i] = sortable[i + 1];
            sortable[i + 1] = temp;
        }
    }
    console.log(sortable)

    for (let k = 0; k < sortable.length; k++) {
        if (score >= sortable[k][1]) {
            x = sortable[k][0];
        }
    }

    console.log(score, x)
    resultDiv.innerHTML = `<div class="resultTitle">${score}% de acerto: ${resposta.data.levels[x].title}</div>
    <div class="result">
        <img src="${resposta.data.levels[x].image}">
        <span>${resposta.data.levels[x].text}</span>
        </div>`

}

function restartQuiz() {
    pontos = 0;
    answersSelected = 0;
    testOver = false;
    sortable = [];
    document.querySelector(".questionsQuizz").innerHTML = "";
    resultDiv.classList.add("hidden");
    document.querySelector(".restartQuiz").classList.add("hidden");
    document.querySelector(".backHome").classList.add("hidden");
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`)
    promise.then(takeQuiz)
}
