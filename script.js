"use strict";

var input = document.getElementById('input'),
input.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
        event.preventDefault();
  document.getElementById('equals').click();
  }
});

var erase = document.getElementById('erase');
erase.addEventListener('keyup', function(event) {
  input = "";
});
