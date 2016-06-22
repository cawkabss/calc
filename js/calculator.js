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
    this.elements = document.getElementsByClassName('btn');
    this.display = document.getElementsByClassName('input-text')[0];
    this.calculator = document.getElementsByClassName('calc')[0];
    this.icons = document.getElementsByClassName('icon');
    this.prevOperator = '';
    this.result = 0;
    this.showResult = false;
    this.clean = function(){
        this.prevOperator = '';
        this.result = 0;
        this.display.value = '0';
        this.showResult = false;
    };
    this.number = function(value){
        var newValue;
        if(this.showResult){
            this.clearDisplay();
            this.showResult = false;
        }
        if(value === '.'){
            if(this.display.value.indexOf('.') > -1) return;
            newValue = (this.display.value === "0" ) ? 0 + value : this.display.value + value;
            this.display.value = newValue;
        }
        else{
            newValue = (this.display.value === "0" ) ? value : this.display.value + value;
            this.display.value = newValue;
        }
    };
    this.operator = function(op){
        if(!this.showResult){
            switch(this.prevOperator){
                case '+':
                    this.result = this.result + parseFloat(this.display.value);
                    break;
                case '-':
                    this.result = this.result - parseFloat(this.display.value);
                    break;
                case '*':
                    this.result = this.result * parseFloat(this.display.value);
                    break;
                case '/':
                    this.result = this.result / parseFloat(this.display.value);
                    break;
                default: this.result = parseFloat(this.display.value);
            }
        }
        if(op === 'clean'){
            this.clean();
        }
        if (op === 'minus-plus'){
            var str = parseFloat(this.display.value);
            this.result = (str[0] === '-') ? Number(str.slice(1)) : - + Number(str);
            this.display.value = this.result;
        }
        if(op === 'percent'){
            this.result = parseFloat(this.display.value) / 100;
            this.display.value = this.result;
        }
        if(this.prevOperator){
            this.display.value = this.result;
        }
        this.prevOperator = (op === 'result') ? null : op;
        this.showResult = true;
    };
    this.clearDisplay = function () {
        this.display.value = '0';
    };

    this.keyChecker = function (keyCode, event, shift){
        var calcKeys = {
            48: ['[data-value="0"]', 0], 49: ['[data-value="1"]', 1],
            50: ['[data-value="2"]', 2], 51: ['[data-value="3"]', 3],
            52: ['[data-value="4"]', 4], 53: ['[data-value="5"]', 5],
            54: ['[data-value="6"]', 6], 55: ['[data-value="7"]', 7],
            56: ['[data-value="8"]', 8], 57: ['[data-value="9"]', 9],
            106: ['[data-operator="*"]', '*'], 107: ['[data-operator="+"]', '+'],
            109: ['[data-operator="-"]', '-'], 189: ['[data-operator="-"]', '-'],
            110: ['[data-value="."]', '.'], 111: ['[data-operator="/"]', '/'],
            8: ['[data-operator="clean"]', 'clean'], 13: ['[data-operator="result"]', 'result'],
            46: ['[data-operator="clean"]', 'clean'], percent: ['[data-operator="percent"]', 'percent'],
            187: ['[data-operator="result"]', 'result'], 191: ['[data-operator="/"]', '/'],
            190: ['[data-value="."]', '.']
            };
        var elem;
        var key = keyCode;
        if(shift){
            switch(keyCode){
                case 53:
                    key = 'percent';
                    break;
                case 187:
                    key = 107;
                    break;
                case 56:
                    key = 106;
                    break;
            }
        }
        var attribute = calcKeys[key][0];
        if(48 <= key && key <= 57 || key === 190){
            this.number(calcKeys[key][1]);
            elem = document.querySelector(attribute);
            elem.classList.add('btn-active');
            setTimeout(function(){
                elem.classList.remove('btn-active');
            }, 100)
        }
        else if(key === 8 || key === 46 || key === 'percent'){
            this.operator(calcKeys[key][1]);
            elem = document.querySelector(attribute);
            elem.classList.add('btn-active');
            setTimeout(function(){
                elem.classList.remove('btn-active');
            }, 100)
        }
        else{
            this.operator(calcKeys[key][1]);
            elem = document.querySelector(attribute);
            elem.classList.add('main-operator-active');
            setTimeout(function(){
                elem.classList.remove('main-operator-active');
            }, 100)
        }
    };
    this.iconsChecker = function(btn){
        if(btn.classList.contains('icon-close')){
            this.calculator.classList.add('calc-close');
        }
        else if(btn.classList.contains('icon-turn')){
            this.calculator.classList.add('calc-turn');
        }
        else if(btn.classList.contains('icon-expand')){
            if(this.calculator.classList.contains('calc-expand')){
                this.calculator.classList.remove('calc-expand');
            }
            else{
                this.calculator.classList.add('calc-expand');
            }
        }
        else{
            if(this.calculator.classList.contains('calc-close')){
                this.calculator.classList.remove('calc-close');
            }
            else{
                this.calculator.classList.remove('calc-turn');
            }
        }
    }
}
var calculator = new NewCalc();

for (var i = 0; i < calculator.elements.length; i++) {
    calculator.elements[i].addEventListener('click', eventCheck);
}
window.addEventListener('keydown', eventCheck);
for (i = 0; i < calculator.icons.length; i++) {
    calculator.icons[i].addEventListener('click', eventCheck);
}
