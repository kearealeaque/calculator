document.getElementById('screen').innerHTML = '';

var screenContent = document.getElementById('screen');
var buttons = document.getElementsByTagName('button');
const operators = ['+', '-', 'x', '÷', '%', '.', '*', '/'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const controls = ['CE', '='];

var button = {
  type: this.type,
  char: this.char,
  show: showOnScreen,
  erase: eraseScreen,
  replace: replaceLastChar,
  calculate: calculateResult,
  }

function showOnScreen() {
  screenContent.innerHTML += this.char;
}

function eraseScreen() {
  screenContent.innerHTML = '';
}

function replaceLastChar() {
  screenContent.innerHTML = screenContent.innerHTML.replace(/.$/, button.char);
}

function calculateResult() {
    screenContent.innerHTML = eval(screenContent.innerHTML);
}

//event screen button click
for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function() {
    var buttonContent = this.innerHTML;

    if (buttonContent == 'x') {
      button.char = '*';
    } else if (buttonContent == '÷') {
      button.char = '/';
    } else {
      button.char = buttonContent;
    }

    if (operators.includes(buttonContent)) {
      button.type = 'operator';
    } else if (controls.includes(buttonContent)) {
      button.type = 'control';
    } else if (buttonContent == '(' || buttonContent == ')') {
      button.type = 'bracket';
    } else {
      button.type = 'number';
    }

    if (button.char == 'CE') {
      button.erase();
    } else if (button.char == '=') {
      button.calculate();
    } else if (button.type == 'number') {
      button.show();
    } else {
      validateButton();
    }
  }
}
//end of event
function validateButton() {
  var lastChar = screenContent.innerHTML.slice(-1);
  var lastNumber;
  var lastOperator;
  var lastBracket;
  var lastPercent;
  var emptyScreen;
  var screenOnlyMinus;
  var screenOpenBracket;
  var percentCheck;
//get last char -- getProperties?
  if (numbers.includes(lastChar)) {
    lastNumber = true;
  } else if (operators.includes(lastChar)) {
    lastOperator = true;
  } else if (lastChar == '(' || lastChar == ')') {
    lastBracket = true;
  }
//get screen state
  if (screenContent.innerHTML == '') {
    emptyScreen = true;
  } else if (screenContent.innerHTML == '-') {
    screenOnlyMinus = true;
  } else if (screenContent.innerHTML.indexOf('(') !== -1) {
    screenOpenBracket = true;
  }
//set restrictions for buttons
  switch (button.char) {
    case '-':
    if (lastNumber || lastBracket || emptyScreen || lastPercent) {
      button.show();
    } else if (lastOperator) {
      button.replace();
    }
    break;

    case '+':
    if (lastNumber || lastBracket || lastPercent) {
      button.show();
    } else if (screenOnlyMinus) {
      button.erase();
    } else if (lastOperator) {
      button.replace();
    }
    break;

    case '*':
    if (lastNumber || lastPercent) {
      button.show();
    } else if (lastOperator) {
      button.replace();
    }
    break;

    case '/':
    if (lastNumber || lastPercent) {
      button.show();
    } else if (lastOperator) {
      button.replace();
    }
    break;

    case '%':
    if (percentCheck) {
      showOnScreen();
    } else if (lastOperator) {
      button.replace();
    }
    break;

    case '(':
    if (emptyScreen || lastOperator) {
      button.show();
    }
    break;

    case ')':
    if (screenOpenBracket && (lastNumber || lastPercent)) {
      button.show();
    }
    break;

    case '.':
    if (lastNumber) {
      button.show();
    }
  }
}
//event keyboard klick
window.addEventListener('keydown', function(event) {
    document.getElementById(keyCode).click();
  }
)
