const icon = document.querySelector('.icon');
const game = document.querySelector('.game');
const title = document.querySelector('.title');
const content = document.querySelector('.content');
const guide = document.querySelector('.guide');
const result = document.querySelector('.result');
const resultText = document.querySelector('.resultText');
const recordPanel = document.querySelector('.recordPanel')
const restartBtn = document.querySelector('.restartBtn');
const saveBtn = document.querySelector('.saveBtn');

let isGamePlaying = false;
let point = 0;
let startTime = 0;
let endTime = 0;
let recordTime = 0;
let record = [];
let isSaved = false;

saveBtn.addEventListener('click',saveData);
restartBtn.addEventListener('click',reset);

icon.addEventListener('click',()=>{
    if(isGamePlaying){
        point+=1;
        if(point >= 30){
            const now = new Date();
            endTime = now.getTime();
            endGame();
        }else if (point == 1){
            const now = new Date();
            startTime = now.getTime();
            moveTarget();
        }
        else{
            moveTarget();
        }

    }else{
        startGame();
    }
})





function startGame(){
    title.classList.add('hidden');
    content.classList.add('hidden');
    icon.classList.add('target');
    guide.classList.remove('hidden');
    moveTarget();
    isGamePlaying=true;

}

function moveTarget(){
    guide.innerHTML=`${30-point}개 남음`;
    icon.style.transform = `translate(${Math.random()*50-25}vw,${Math.random()*300+70}px)`
}

function endGame(){
    recordTime = Math.ceil((endTime - startTime)/30);
    game.classList.add('hidden');
    result.classList.remove('hidden')
    resultText.innerHTML = `${recordTime}ms`;

}

function reset(){
    title.classList.remove('hidden');
    content.classList.remove('hidden');
    icon.classList.remove('target');
    guide.classList.add('hidden');
    game.classList.remove('hidden');
    result.classList.add('hidden');
    icon.style.transform = 'none';
    point = 0;
    isGamePlaying = false;
    isSaved=false;
}


function saveData() {
    if(!isSaved){
        isSaved=true;
        record.push(recordTime);
        record.sort((a,b)=>{return a-b});
        window.localStorage.setItem("record",JSON.stringify(record));
        renewalRecord();
    }
}

function renewalRecord() {
    const data = window.localStorage.getItem("record");
    if(data){
        record = JSON.parse(data);
    }

    recordPanel.innerHTML = "";
    let h3 = document.createElement('h3');
    h3.innerHTML = "기록";
    recordPanel.appendChild(h3);

    for (let i = 0; i < record.length; i++) {
        let p = document.createElement('p');
        p.innerHTML = `${i+1}. ${record[i]} ms`;
        recordPanel.appendChild(p); 
    }

}

renewalRecord();
