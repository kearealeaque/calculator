
class="input"
          id="input"
          type="text"
          onkeypress='return event.charCode >= 40 && event.charCode <= 57'
          onblur="this.focus()"
          autofocus />


          equation = equation.replace(/x/g, '*').replace(/÷/g, '/');



"use strict";

var screen = document.getElementById('screen');
var nums = document.getElementsByClassName('num_button')
var ops = document.getElementsByClassName('ops_button')
var equals = document.getElementById('equals')
var erase = document.getElementById('erase');

for (var i = 0; i < nums.length; i++) {
    nums[i].addEventListener('click', buttonClick, false);
}

for (var i = 0; i < ops.length; i++) {
    ops[i].addEventListener('click', buttonClick, false);
}

erase.addEventListener('click', function(event) {
  document.getElementById('input').value = "";
});

function buttonClick() {
  input =
}

window.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    document.getElementById('equals').click();
  }
});

var result = parseFloat(document.getElementById('input').value);
