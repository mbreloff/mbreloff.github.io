let timer = document.querySelectorAll('#timer')[0];
let goButton = document.querySelectorAll('#go')[0];
let number1 = document.querySelectorAll('#number1')[0];
let number2 = document.querySelectorAll('#number2')[0];
let op = document.querySelectorAll('#op')[0];
let answer = document.querySelectorAll('#answer')[0];
let answers = document.querySelectorAll('#answers')[0];
let answersHeader = document.querySelectorAll('#answersHeader')[0];

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function timestamp(secs) {
  let mins = Math.round(secs / 60);
  let secs2 = secs % 60;
  return pad(mins, 2) + ':' + pad(secs2, 2);
}

let start = -1;

function go() {
  start = new Date().getTime();
  goButton.innerHTML = 'STOP'
  goButton.style.background = 'red'
  answers.innerHTML = ''
  answersHeader.innerHTML = 'Answers: 0'
  numAnswers = 0
  newProblem();
}

function stop() {
  goButton.innerHTML = 'GO'
  goButton.style.background = 'green'
  start = -1;
}

timer.innerHTML = timestamp(0);
function setTimer() {
  if (start > 0)
    timer.innerHTML = timestamp(Math.round((new Date().getTime() - start) /1000));
  answer.innerHTML = curr == '' ? '_' : curr;
}

let target = 'kljfhdlkjhfdsljkh';
let curr = '';
let numAnswers = 0;
let maxNum = 5;

function newProblem() {
  let n1 = Math.round(Math.random() * maxNum);
  let n2 = Math.round(Math.random() * maxNum);
  number1.innerHTML = n1;
  number2.innerHTML = n2;
  curr = '';
  if (op.innerHTML == '+') {
    target = (n1 + n2).toString();
  }
}
newProblem();

function newChar(c) {
//  console.log('newChar', c, curr, target)
  curr = curr + c.toString();
  if (curr == target) {
    // yay got the answer!
    let ansDiv = document.createElement('div');
    ansDiv.innerHTML = `${number1.innerHTML} ${op.innerHTML} ${number2.innerHTML} = ${curr}`
    answers.appendChild(ansDiv);
    numAnswers++;
    answersHeader.innerHTML = 'Answers: ' + numAnswers;
    newProblem();
  }
}
      
function deleteChar() {
  curr = curr.slice(0, curr.length-1);
}
  
window.setInterval(() => setTimer(), 100);
goButton.onclick = () => start == -1 ? go() : stop();
window.onkeydown = e => {
  let key = e.keyCode;
//  console.log(key);
  if (key >= 48 && key <= 57) // number
    newChar(key-48);
  else if (key >= 96 && key <= 105) // number
    newChar(key-96);
  else if (key == 8) // backspace
    deleteChar();
}