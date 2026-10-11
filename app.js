let maxScore = 0;

let systemInput = [];
let userInput = [];

let colors = ["green", "yellow", "orange", "purple"];

let isGameStarted = false;
let level = 0; 

let h2 = document.querySelector("h2");
let body = document.querySelector("body");

document.addEventListener("keypress", () => {
    if(!isGameStarted) {
        isGameStarted = true;
        levelUp();
    }
})

function levelUp() {
    userInput = [];
    h2.innerText = `Level ${++level}`;
    let randIdx = Math.floor(Math.random()*4);
    console.log(randIdx);
    let btn = document.querySelector(`.${colors[randIdx]}`)
    btnflash(btn);
    systemInput.push(colors[randIdx]);
    console.log(systemInput[systemInput.length-1])
}

function btnflash(val) {
    val.classList.add("flashWhite");
    setTimeout(function () {
        val.classList.remove("flashWhite");
    },250);
}

function userflash(val) {
    val.classList.add("flashGreen");
    setTimeout(function () {
        val.classList.remove("flashGreen");
    },250);
}

function checkAns(idx) {
    if(systemInput[idx] === userInput[idx]) {
        if(systemInput.length == userInput.length) {
            setTimeout(levelUp, 1000);
        }
        
    } else {
        //quit game
        if(level > maxScore) maxScore = level;
        h2.innerHTML = `Game has ended. You score is  <b>${level}</b>. You <b>MAX score</b> is <b>${maxScore}</b>. Press any key to start the game again...`;
        body.style.backgroundColor = "red";
        setTimeout(() => {
            body.style.backgroundColor = "white";
        },150);
        Reset();
    }
}

function btnPress() {
    userflash(this);
    let color = this.getAttribute("id");
    userInput.push(color);
    console.log(color);

    checkAns(userInput.length-1);
}

let btns = document.querySelectorAll(".box");

for(let btn of btns) {
    btn.addEventListener("click", btnPress);
}

function Reset() {
    systemInput = [];
    userInput = [];
    isGameStarted = false;
    level = 0; 
}