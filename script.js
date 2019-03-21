document.getElementById('screen').innerHTML = '';

var screenContent = document.getElementById('screen');
var buttons = document.getElementsByName('button');
const operators = ['+', '-', 'x', '÷', '.', '*', '/'];
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
    if (screenContent.innerHTML.includes('%')) {
      parsePercent();
    } else {
      screenContent.innerHTML = eval(screenContent.innerHTML);
    }
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
    } else if (buttonContent == '%') {
      button.type = 'percent';
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

//validation
function validateButton() {
  var lastChar = screenContent.innerHTML.slice(-1);
  var lastNumber;
  var lastOperator;
  var lastBracket;
  var lastPercent;
  var emptyScreen;
  var screenOnlyMinus;
  var screenOpenBracket;
//get last char
  if (numbers.includes(lastChar)) {
    lastNumber = true;
  } else if (operators.includes(lastChar)) {
    lastOperator = true;
  } else if (lastChar == '(' || lastChar == ')') {
    lastBracket = true;
  } else if (lastChar == '%') {
    lastPercent = true;
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
    if (lastNumber || lastPercent || lastBracket) {
      button.show();
    } else if (lastOperator) {
      button.replace();
    }
    break;

    case '/':
    if (lastNumber || lastPercent || lastBracket) {
      button.show();
    } else if (lastOperator) {
      button.replace();
    }
    break;

    case '%':
    if (lastNumber) {
      button.show();
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
  var shift = event.getModifierState('Shift');
  var key = event.key;

  if (key == 'Backspace' && !shift) {
    screenContent.innerHTML = screenContent.innerHTML.substr(0, screenContent.innerHTML.length - 1);
  } else if (key == 'Backspace' && shift) {
    screenContent.innerHTML = '';
  } else if (operators.includes(key) || numbers.includes(key) || key == '(' || key == ')' || key == '.' || key == 'Enter' || key == '%') {
    document.getElementById(event.key).click();
  }
})

function parsePercent() {
    var expression = screenContent.innerHTML;
    var percentPosition = expression.indexOf('%');
    var num1;
    var num1start;
    var num1end;
    var num2;
    var num2start;
    var num2end = percentPosition - 1;
    var operator;
    var operatorPosition;
    var operators2 = ['+', '-', 'x', '÷', '*', '/'];
    var numbers2 = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
//find operator position
    for (i = num2end - 1; i >= 0; i--) {
      if (operators.includes(expression[i])) {
       operator = expression[i];
       operatorPosition = i;
       num2start = i + 1;
       num1end = i - 1;
       break;
      }
    }
//find num1 and num2
    for (i = num1end - 1; i >= -1; i--) {
      if (!numbers.includes(expression[i])) {
        num1start = i+1;
        num1 = expression.slice(num1start, num1end + 1);
        num2 = expression.slice(num2start, num2end + 1);
        break;
      }
    }
//calculate result
    var newExpression = operator + '(' + num1 + '*' + num2 + '/100)';
    var s = screenContent.innerHTML;
    s = s.substr(0, operatorPosition) + newExpression + s.substr(percentPosition+1);
    screenContent.innerHTML = eval(s);
}
