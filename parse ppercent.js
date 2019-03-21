//percent parser
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

  findOperator();

  function findOperator() {
    for (i = num2end - 1; i >= 0; i--) {
      if (operators.includes(expression[i])) {
       operator = expression[i];
       operatorPosition = i;
       num2start = i + 1;
       num1end = i - 1;
       break;
      }
    }
    findNum1();
  }





  function findNum1() {
    for (i = num1end - 1; i >= 0; i--) {
      if (!numbers.includes(expression[i])) {
        num1start = i+1;
        num1 = expression.slice(num1start, num1end + 1);
        num2 = expression.slice(num2start, num2end + 1);
        break;
      }
    }
    replacePercent();
  }

  function replacePercent() {
    newExpression = operator + '(' + num1 + '*' + num2 + '/100)';
    var s = screenContent.innerHTML;
    s = s.substr(0, operatorPosition) + newExpression + s.substr(percentPosition+1);
    screenContent.innerHTML = eval(s);
  }
}
}
