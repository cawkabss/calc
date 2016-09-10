'use strict';
function eventCheck(event){
    var btn = event.target,
        op = btn.dataset.operator,
        value = btn.dataset.value,
        keyCode = event.keyCode,
        shift = event.shiftKey;

    if(keyCode){
        calculator.keyChecker(keyCode, event, shift);
    }
    else if (value) {
        calculator.number(value);
    }
    else if(btn.classList.contains('icon')){
        calculator.iconsChecker(btn);
    }
    else{
        calculator.operator(op);
    }
}


function NewCalc(){
    var elements = document.getElementsByClassName('btn'),
        display = document.getElementsByClassName('input-text')[0],
        calculator = document.getElementsByClassName('calculator-wrapper')[0],
        icons = document.getElementsByClassName('icon'),
        prevOperator = '',
        result = 0,
        showResult = false;

    this.number = function(value){
        var newValue;
        if(showResult){
            this.clearDisplay();
            showResult = false;
        }
        if(value === '.'){
            if(display.value.indexOf('.') > -1) return;
            newValue = (display.value === "0" ) ? 0 + value : display.value + value;
            display.value = newValue;
        }
        else{
            newValue = (display.value === "0" ) ? value : display.value + value;
            display.value = newValue;
        }
    };

    this.operator = function(op){

        if(!showResult){
            switch(prevOperator){
                case '+':
                    result = result + parseFloat(display.value);
                    break;
                case '-':
                    result = result - parseFloat(display.value);
                    break;
                case '*':
                    result = result * parseFloat(display.value);
                    break;
                case '/':
                    result = result / parseFloat(display.value);
                    break;
                default: result = parseFloat(display.value);
            }
        }
        if(op === 'clean'){
            this.clean();
        }
        if (op === 'minus-plus'){
            var str = parseFloat(display.value);
            result = (str[0] === '-') ? Number(str.slice(1)) : - + Number(str);
            display.value = result;
        }
        if(op === 'percent'){
            result = parseFloat(display.value) / 100;
            display.value = result;
        }
        if(prevOperator){
            display.value = result;
        }
            prevOperator = (op === 'result') ? null : op;
            showResult = true;
    };
    this.clearDisplay = function () {
        display.value = '0';
    };
    this.clean = function(){
        prevOperator = '';
        result = 0;
        display.value = '0';
        showResult = false;
    };
    this.keyChecker = function (keyCode, event, shift){
        var numberKeys = {
            48: ['[data-value="0"]', 0],
            49: ['[data-value="1"]', 1],
            50: ['[data-value="2"]', 2],
            51: ['[data-value="3"]', 3],
            52: ['[data-value="4"]', 4],
            53: ['[data-value="5"]', 5],
            54: ['[data-value="6"]', 6],
            55: ['[data-value="7"]', 7],
            56: ['[data-value="8"]', 8],
            57: ['[data-value="9"]', 9],
            45: ['[data-value="0"]', 0],
            35: ['[data-value="1"]', 1],
            40: ['[data-value="2"]', 2],
            34: ['[data-value="3"]', 3],
            37: ['[data-value="4"]', 4],
            12: ['[data-value="5"]', 5],
            39: ['[data-value="6"]', 6],
            36: ['[data-value="7"]', 7],
            38: ['[data-value="8"]', 8],
            33: ['[data-value="9"]', 9]
            };
        var operatorKeys = {
            106: ['[data-operator="*"]', '*'],
            107: ['[data-operator="+"]', '+'],
            109: ['[data-operator="-"]', '-'],
            189: ['[data-operator="-"]', '-'],
            110: ['[data-value="."]', '.'],
            190: ['[data-value="."]', '.'],
            111: ['[data-operator="/"]', '/'],
            191: ['[data-operator="/"]', '/'],
            8: ['[data-operator="clean"]', 'clean'],
            46: ['[data-operator="clean"]', 'clean'],
            187: ['[data-operator="result"]', 'result'],
            13: ['[data-operator="result"]', 'result']
        };
        var elem;

        if(keyCode in numberKeys){
            var attribute = numberKeys[keyCode][0];
            this.number(numberKeys[keyCode][1]);
            elem = document.querySelector(attribute);
            elem.classList.add('btn-active');
            setTimeout(function(){
                elem.classList.remove('btn-active');
            }, 100)
        }
        else if(keyCode in operatorKeys){
            attribute = operatorKeys[keyCode][0];
            this.operator(operatorKeys[keyCode][1]);
            elem = document.querySelector(attribute);
            elem.classList.add('btn-active');
            setTimeout(function(){
                elem.classList.remove('btn-active');
            }, 100)
        }
    };
    this.iconsChecker = function(btn){
        if(btn.classList.contains('icon-close')){
            calculator.classList.toggle('close');
        }
        else if(btn.classList.contains('icon-turn')){
            calculator.classList.toggle('turn');
        }
        else if(btn.classList.contains('icon-expand')){
            calculator.classList.toggle('expand');
        }
        else{
            calculator.classList = 'calculator-wrapper';
        }
    };

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', eventCheck);
    }
    window.addEventListener('keydown', eventCheck);

    for (i = 0; i < icons.length; i++) {
        icons[i].addEventListener('click', eventCheck);
    }
}
var calculator = new NewCalc();


