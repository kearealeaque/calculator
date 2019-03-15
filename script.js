var display = document.getElementById('display');
var nums = document.getElementsByClassName('num');
var ops = document.getElementsByClassName('ops');
var equals = document.getElementById('equals');
var erase = document.getElementById('erase');

for (var i = 0; i < nums.length; i++) {
    nums[i].addEventListener('click', buttonClick, false);
}

for (var i = 0; i < ops.length; i++) {
    ops[i].addEventListener('click', buttonClick, false);
}

function buttonClick() {
    var input = document.getElementById('screen');
    var inputVal = input.innerHTML;
    var btnVal = this.innerHTML;

    if(btnVal == 'CE') {
			input.innerHTML = '';
		}

    else if(btnVal == '=') {
			var equation = inputVal;
      equation = equation.replace(/x/g, '*').replace(/÷/g, '/').replace(/\^/g, '\*\*');

      if(equation)
  input.innerHTML = eval(equation);
  decimalAdded = false;
}
