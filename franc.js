var calcScreen = document.getElementById('screen');
var buttons = document.getElementsByTagName('button');
var operators = ['x', '-', '+', '.', '%', '÷'];

for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function buttonClick() {
    var screenContent = calcScreen.innerHTML;
    var buttonContent = this.innerHTML;

    if(buttonContent == 'x') {
      calcScreen.innerHTML += '*';
    }

    else if (buttonContent == '÷') {
      calcScreen.innerHTML += '/';
    }

    else if (buttonContent == 'CE') {
      calcScreen.innerHTML = '';
    }

    else if (buttonContent == '=') {
      var expression = screenContent;
      var lastChar = expression[expression.length - 1]
      if (lastChar == '.' || lastChar == '-' || lastChar == '+' || lastChar == '/' || lastChar == '*' || lastChar == '(') {
        expression = expression.replace(/.$/, '');
      }

      calcScreen.innerHTML = eval(expression);
    }

    else if(operators.includes(buttonContent)) {
			var lastChar = screenContent[screenContent.length - 1];

			if (screenContent != '' && operators.indexOf(lastChar) == -1)
				calcScreen.innerHTML += buttonContent;

			else if (screenContent == '' && buttonContent == '-')
				calcScreen.innerHTML += buttonContent;
}
      else {
        calcScreen.innerHTML += buttonContent;
      }




  }
}

window.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    calcScreen.innerHTML = eval(calcScreen.innerHTML);

    document.getElementById('equals').click();
  }
});
