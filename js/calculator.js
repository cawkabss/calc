'use strict';
var result = '';
var total = '';
var operand = '';
var elements = document.getElementsByClassName('btn');
var inputElement = document.getElementsByClassName('input-text')[0];

function resetCalculator () {
    result = '';
    operand = '';
    total = '';
}
function onBtnClick(event) {
    var btn = event.target,
        operator = btn.dataset.operator,
        value = btn.dataset.value;
    if (value) {
        operand += value;
        inputElement.value = operand;
    }else{
        if(operand){
           check();
        }
        if (operator === 'clean'){
            check();
        }
        return;
    }
    function check(){
        if(operator === 'result'){
            result += operand;
            total = eval(result);
            inputElement.value = total;
            operand = total;
            result = '';
            return;
        }
        if(operator === 'clean'){
            resetCalculator();
            inputElement.value = 0;
            return
        }
        if(operator === 'percent'){
            total = operand/100;
            inputElement.value = total;
            operand = total;
            return
        }
        if(operator === 'minus'){
            if(String(operand).charAt(0) === '-'){
                return;
            }
            operand = '-' + operand;
            inputElement.value = operand;
            return;
        }
        result += operand + operator;
        operand = "";
    }
    console.log(result);
    console.log(operand);
}
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', onBtnClick);
}