'use strict';
var result = '';
var total = '';
var operand = '';
var elements = document.getElementsByClassName('btn');
var inputElement = document.getElementsByClassName('input-text')[0];

function onBtnClick(event) {
    var btn = event.target,
        operator = btn.dataset.operator,
        value = btn.dataset.value;
    return calc(operator, value);
}
function calc(operator, value){
    if (value) {
        operand += value;
        inputElement.value = operand;
    }else{
        if(operand){
            check(operator, value);
        }
        if (operator === 'clean'){
            check(operator, value);
        }
        return;
    }
    console.log(result);
    console.log(operand);
}
function resetCalculator () {
    result = '';
    operand = '';
    total = '';
}
function check(operator, value){
    if(operator === 'result'){
        result += operand;
        total = eval(result);
        inputElement.value = total;
        if(String(total).charAt(0) === '0'){
            operand = "";
            result = "";
            return;
        }
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


for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', onBtnClick);
}