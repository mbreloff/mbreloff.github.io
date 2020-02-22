let timer = document.querySelectorAll('#timer')[0];
let goButton = document.querySelectorAll('#go')[0];
let number1 = document.querySelectorAll('#number1')[0];
let number2 = document.querySelectorAll('#number2')[0];
let opdiv = document.querySelectorAll('#op')[0];
let answer = document.querySelectorAll('#answer')[0];
let answers = document.querySelectorAll('#answers')[0];
let answersHeader = document.querySelectorAll('#answersHeader')[0];

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function timestamp(secs) {
  let mins = Math.floor(secs / 60);
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
let op = '+';
let maxNum = 5;

document.querySelectorAll('#num-select')[0].onchange = e => {
  maxNum = parseInt(e.target.options[e.target.selectedIndex].value);
  newProblem();
}
document.querySelectorAll('#op-select')[0].onchange = e => {
  op = e.target.options[e.target.selectedIndex].text;
  opdiv.innerHTML = op;
  newProblem();
}

function newProblem() {
  let n1 = Math.round(Math.random() * maxNum);
  if (n1 == 0 && (op == '-' || op == '/'))
    n1 = 1;
  let n2 = Math.round(Math.random() * (op == '-' ? n1 : maxNum));
  number1.innerHTML = op == '/' ? n1*n2 : n1;
  number2.innerHTML = n2;
  curr = '';
  if (op == '+')
    target = (n1 + n2).toString();
  else if (op == '-')
    target = (n1 - n2).toString();
  else if (op == '*')
    target = (n1 * n2).toString();
  else if (op == '/')
    target = n1.toString();
}
newProblem();

function newChar(c) {
//  console.log('newChar', c, curr, target)
  curr = curr + c.toString();
  if (curr == target) {
    // yay got the answer!
    answer.style.color = 'black';
    addAnswer();
    newProblem();
  }
  else if (curr.length >= target.length) {
    // answer is wrong
    answer.style.color = 'red';
  }
}

function addAnswer() {
  // create a div to hold the full: 4 + 1 = 5
  let ansDiv = document.createElement('div');
  ansDiv.innerHTML = `${number1.innerHTML} ${op} ${number2.innerHTML} = ${curr}`;
  
  // the answer-right class has an animation attached
  // to change the color and position.
  // remove the class when the animation is done.
  ansDiv.className = 'answer-right';
  ansDiv.addEventListener('animationend', () => ansDiv.className = '')
  answers.appendChild(ansDiv);
  
  numAnswers++;
  answersHeader.innerHTML = 'Answers: ' + numAnswers;
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

// keypad
document.querySelectorAll('#key0')[0].onclick = () => newChar(0);
document.querySelectorAll('#key1')[0].onclick = () => newChar(1);
document.querySelectorAll('#key2')[0].onclick = () => newChar(2);
document.querySelectorAll('#key3')[0].onclick = () => newChar(3);
document.querySelectorAll('#key4')[0].onclick = () => newChar(4);
document.querySelectorAll('#key5')[0].onclick = () => newChar(5);
document.querySelectorAll('#key6')[0].onclick = () => newChar(6);
document.querySelectorAll('#key7')[0].onclick = () => newChar(7);
document.querySelectorAll('#key8')[0].onclick = () => newChar(8);
document.querySelectorAll('#key9')[0].onclick = () => newChar(9);
document.querySelectorAll('#keydel')[0].onclick = () => deleteChar();