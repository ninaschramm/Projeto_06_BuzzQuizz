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
     allQuizzes.innerHTML +=  `<li class="li_quizz" style="background-image: url('${quizzes.data[i].image}')" onclick="initQuitz()">
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

function initQuitz() {
    document.querySelector(".firstScreen").classList.add("hidden")
    document.querySelector(".secondScreen").classList.remove("hidden")
}