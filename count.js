var calcScreen = document.getElementById('screen');
var buttons = document.getElementsByClassName('buttons');
var a = 1;

for(var i = 0; i < buttons.length; i++) {
buttons[i].onclick = function buttonClick() {
    var screenContent = calcScreen.innerHTML;
    var btnVal = this.innerHTML;

    if(btnVal == 'CE') {
			calcScreen.innerHTML = '';
		}

    else if(btnVal == '=') {
			var equation = screenContent;

      if(equation)
  calcScreen.innerHTML = eval(equation);
};
}
}
