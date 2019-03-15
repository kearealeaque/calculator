var display = document.getElementById('display');
var buttons = document.getElementsByClassName('buttons');
var equals = document.getElementById('equals');
var erase = document.getElementById('erase');

for(var i = 0; i < buttons.length; i++) {
buttons[i].onclick = function buttonClick() {
    var input = document.getElementById('display');
    var inputVal = input.innerHTML;
    var btnVal = this.innerHTML;

    if(btnVal == 'CE') {
			input.innerHTML = '';
		}

    else if(btnVal == '=') {
			var equation = inputVal;
      equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

      if(equation)
  input.innerHTML = eval(equation);
};
}
}
