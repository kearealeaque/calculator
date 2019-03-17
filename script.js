document.getElementById('screen').innerHTML = '';

var screenContent = document.getElementById('screen');
var buttons = document.getElementsByTagName('button');
const operators = ['+', '-', 'x', '÷', '%', '.'];
const controls = ['CE', '='];

var button = {
  type: this.type,
  char: this.char,
  vaildate: validateButton,
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
  lastChar = this.char;
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
      validateButton(button);
    }
  }
}

function validateButton() {
  var lastChar = screenContent.innerHTML.slice(-1);
  var lastNumber;
  var lastBracket;
  var lastPercent;
  var emptyScreen;
  var screenOnlyMinus;
  var screenOpenBracket;
  button.show();
}
