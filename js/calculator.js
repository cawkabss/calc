'use strict';
var result = '';
var operand = '';
var elements = document.getElementsByClassName('btn');
var inputElement = document.getElementsByClassName('input-text')[0];
var calculator = document.getElementsByClassName('calc')[0];
var icons = document.getElementsByClassName('icon');
var calcIcon = document.getElementsByClassName('calc-icon')[0];

function onBtnClick(event) {
    var btn = event.target,
        operator = btn.dataset.operator,
        value = btn.dataset.value,
        keyCode = event.keyCode,
        shift = event.shiftKey;
    return calc(operator, value, keyCode, event, shift);
}
function calc(operator, value, keyCode, event, shift){
    if (value) {
        operand += value;
        inputElement.value = operand;
    }
    else if(keyCode){
        keyCodeCheck(keyCode, event, shift);
    }
    else{
        if(operand){
            operatorsList(operator, value);
        }
        else if (operator === 'clean'){
            operatorsList(operator, value);
        }
    }
}
function keyCodeCheck(keyCode, event, shift){
    if(48 <= keyCode && keyCode <= 57){
        if(keyCode === 56 && shift === true ){
            result += operand + '*';
            operand = "";
        }
        else if(keyCode === 53 && shift === true ){
            operatorsList('percent');
        }
        else{
            operand += String.fromCharCode(event.which);
            inputElement.value = operand;
        }
    }
    else if(keyCode === 187){
            if(keyCode === 187 && shift === true){
                result += operand + '+';
                operand = "";
            }else{
                operatorsList('result');
            }
    }
    else if(keyCode === 46 || keyCode === 8){
        operatorsList('clean');
    }
    else if(keyCode === 189){
        result += operand + '-';
        operand = "";
    }
    else if(keyCode === 191){
        result += operand + '/';
        operand = "";
    }
    else if(keyCode === 190){
            if(operand.indexOf('.') > 0){
                return;
            }
        operand += '.';
        inputElement.value = operand;
    }
}
function resetCalculator () {
    result = '';
    operand = '';
}
function operatorsList(operator){
    if(operator === 'result'){
        result += operand;
        result = eval(result);
        inputElement.value = result;
        if(String(result).charAt(0) === '0'){
            resetCalculator ()
        }else{
            operand = result;
            result = '';
        }
    }
    else if(operator === 'clean'){
        resetCalculator();
        inputElement.value = "0";
    }
    else if(operator === 'percent'){
        operand = operand/100;
        inputElement.value = operand;
        result = '';
    }
    else if(operator === '.'){
        if(operand.indexOf('.') > 0){
            return;
        }
        operand += '.';
        inputElement.value = operand;
    }
    else if(operator === 'minus'){
        if(String(operand).charAt(0) === '-'){
        }else{
            operand = '-' + operand;
            inputElement.value = operand;
        }
    }else{
        result += operand + operator;
        operand = "";
    }
}
//Added listener on buttons

for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', onBtnClick);
}
//Add listener on keyboard

addEventListener('keydown', onBtnClick);

//Add listener on calculator-header icons

for (i = 0; i < icons.length; i++) {
    icons[i].addEventListener('click', onIconClick);
}
function onIconClick(event){
    var icon = event.target,
        iconClassName = icon.className;
    if(iconClassName === 'icon close'){
        calculator.style.cssText = 'opacity: 0;\
    transform: rotate(90deg) translate(320px);\
    height: 0;';
        calculator.setAttribute('close', 'true');
    }
    else if(iconClassName === 'icon turn'){
        calculator.style.cssText = 'opacity: 0;\
    transform: translate(0, 320px);\
    height: 0;';
        calculator.setAttribute('turn', 'true');
    }
    else if(iconClassName === 'icon expand'){
        if(icon.getAttribute('active') === 'true'){
            calculator.style.cssText = 'transform: scale(1);';
            icon.setAttribute('active', 'false');
            return;
        }
        calculator.style.cssText = 'transform: scale(1.3);';
        icon.setAttribute('active', 'true');
    }
}

// Add listener on calculator icon

calcIcon.onclick = function(){
    if(calculator.getAttribute('close') === 'true'){
        calculator.style.cssText = '';
        calculator.setAttribute('close', 'false');
    }
    if(calculator.getAttribute('turn') === 'true'){
        calculator.style.cssText = '';
        calculator.setAttribute('turn', 'false');
    }
};

