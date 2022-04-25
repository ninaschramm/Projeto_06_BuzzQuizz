let title;
let level;
let questionQtt;
let imgURL;
let number;
let question;
let questionColor;
let answer;
let id = 0;

let questions = [];
let answers = [];

//reload the page in certain clicks
function reload() {
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
            <span>Resposta correta</span>
            <input class="answer" placeholder="Resposta correta" type="text">
            <input class="imgURL correct-answer${i}" placeholder="URL da imagem" type="text">
        </div>
        <div>
        <span>Respostas incorretas</span>   
            <input class="incorrect-answer${i} answer" placeholder="Resposta incorreta 1" type="text">
            <input class="imgURL imgURLIncorrect" placeholder="URL da imagem 1" type="text">
        </div>
        <div>
            <input class="incorrect-answer${i}" placeholder="Resposta incorreta 2" type="text">
            <input class="imgURLIncorrect" placeholder="URL da imagem 2" type="text">
        </div>
        <div>
            <input class="incorrect-answer${i}" placeholder="Resposta incorreta 3" type="text">
            <input class="imgURLIncorrect" placeholder="URL da imagem 3" type="text">
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
    question = document.querySelectorAll(".question")
    questionColor = document.querySelectorAll(".question-color")
    answer = document.querySelectorAll(".answer")
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

    for (let i = 0; i < questionQtt * 2; i++) {
        if (!(imgURL[i].value.startsWith('https'))) {
            console.log("d")
            console.log(imgURL[i].value)
            console.log(i)
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

// creating each level with its specifications
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
            <input class="min-right" placeholder="% de acerto mínima" type="number">
            <input class="imgURL" placeholder="URL da imagem do nível" type="text">
            <input class="level-description" placeholder="Descrição do nível" type="text">
        </div>

    </li>`
    }
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
    imgURL = document.querySelectorAll(".imgURL")
    let minRightNum = []


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
    for (let i = 0; i < (imgURL.length - 1); i++) {
        if (!(imgURL[i].value.startsWith('https'))) {
            console.log("d")
            return false
        }
    }
    console.log("e")
    return true;
}
// to get if some element is equal to 0, used at "some" on the validation code
function checkZero(elem) {
    return elem === 0
}

function endQuiz() {
    if (levelValidation()) {
        document.querySelector(".thirdScreenLevels").classList.add("hidden")
    }
    else {
        alert("Algum dos dados está fora dos requisitos para criação de quiz")
    }
    // const empty = (elem) => (elem !== "");
    // let arrNotEmpty = [];
    // let newNotEmpty = [];
    // let finalArray = [];


   

    // for (let i = 0; i < questionQtt; i++) {
    //     questions.push([
    //         {
    //             title: question[i].value,
    //             color: questionColor[i].value,
    //             answers: [
    //                 answers[i]
    //             ]
    //         }
    //     ])
    // }



    // let obj = {
    //     title: `${title}`,
    //     image: imgURL[0].value,
    //     questions: questions
    // }

    // console.log(obj)
    // console.log(imgURL[0].value)
    // console.log(title)


    // for (let i = 0; i < questionQtt; i++) {

    //     const notEmpty = document.querySelectorAll(`.incorrect-answer${i}`);
    //     const correctURL = document.querySelectorAll(`.correct-answer${i}`);
    //     // console.log(notEmpty.length)

    //     for (let j = 0; j < notEmpty.length; j++) {
    //         newNotEmpty.push(notEmpty[j].value);
    //         arrNotEmpty = newNotEmpty.filter(empty)

    //         console.log(j)
    //     }

    //     console.log(arrNotEmpty)
    //     console.log(i)
    //     console.log(arrNotEmpty)
    //     finalArray.push(arrNotEmpty)
    //     console.log(finalArray)
    //     for (let c = 0; c < correctURL.length; c++){
    //         answers[0].image = correctURL[c].value
    //     }
        
    //     for (let k = 1; k < finalArray.length; i++){
    //         answers[k].image = finalArray
    //     }
    //     newNotEmpty = [];
    // }


}


//exec 1
function initQuiz(idQuiz) {
    id = idQuiz.dataset.quiz;
    document.querySelector(".firstScreen").classList.add("hidden")
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
            document.querySelector(`.answers.n_${[i]}`).innerHTML += `<div class="answer" onclick="chooseAnswer(this)" data-correct="${answersArr[y].isCorrectAnswer}"><div class="notselected hidden"></div>  <img src="${answersArr[y].image}" /> ${answersArr[y].text}</div>`
        }
    }
}

function comparador() {
    return Math.random() - 0.5;
}


let pontos = 0;
let answersSelected = 0;

function chooseAnswer(selectedAnswer) {
    answersSelected ++;
    if (selectedAnswer.dataset.correct == "true") {
        pontos++;
    }
    let parent = selectedAnswer.parentNode;
    let parentAnswer = parent.classList[1];
    let answerDiv = document.querySelector(`.${parentAnswer}`)
    let parentQuestion = answerDiv.parentNode;
    parentQuestion.classList.remove("next")

    let answerList = answerDiv.querySelectorAll(`div.answer`)
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

    isTestOver()
}

function scrollNext() {
    nextAnswerDiv.scrollIntoView({ behavior: "smooth" })
}

testOver = false;
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
    resultDiv.scrollIntoView({behavior: "smooth"})
}

let score = 0;
let x = 0;
let sortable = [];

function showResult(resposta) {
    const resultDiv = document.querySelector(".resultQuizz");
    score = pontos / resposta.data.questions.length * 100;
    score = Math.round(score)
    
    for (let i=0; i<resposta.data.levels.length; i++) {
        numb = Number(resposta.data.levels[i].minValue)
        sortable.push([i, numb])
    }

    for (let i=0; i<sortable.length-1; i++) {
        if (sortable[i][1] > sortable[i+1][1]) {
            temp = sortable[i];
            sortable[i] = sortable[i+1];
            sortable[i+1] = temp;
        }
    }
    console.log(sortable)

    for (let k=0; k<sortable.length; k++) {
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
