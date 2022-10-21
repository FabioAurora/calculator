'use strict';

const currentNumber = document.querySelector('#currentNumberDisplay');
const calculationDisplay = document.querySelector('#calculationDisplay');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('#equalsButton');
const clearButton = document.querySelector('#clearButton');
const BACKSPACE_BUTTON = document.querySelector('#backspaceBtn');

equalsButton.addEventListener('click', () => {
    calculate();
});
clearButton.addEventListener('click', clearAll);

BACKSPACE_BUTTON.addEventListener('click', clearLastNumber);

let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetScreen = false;

function clearAll() {
    firstNumber = '';
    secondNumber = '';
    currentNumber.textContent = '0';
    calculationDisplay.textContent = '';
    currentOperator = null;
}

function clearLastNumber() {
    if(secondNumber !== '') return;
    currentNumber.textContent = currentNumber.textContent.slice(0, -1);
    console.log(currentNumber.textContent);
}

/* calculator project */
/* Basic math operator functions */
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

/* function that takes an operator and 2 numbers and then calls one of the above functions */
function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    let output = 0;

    try {

        switch(operator) {
            case '+':
                output = add(a, b);// calls function add()
                break;
            case '-':
                output = subtract(a, b);
                break;
            case '*':
                output = multiply(a, b);
                break;
            case '/':
                if(b === 0) {
                    throw `really?`// add snarky message here later.
                }else {
                    return a / b;
                }
        }
    }
    catch(error) {
        console.log(`There's an error:`, error);
    }

    return output;
}



/* function that populate the display when clicking the numbers */
numberButtons.forEach(button => button.addEventListener('click', () => addNumber(button.textContent)));

operatorButtons.forEach(button => button.addEventListener('click', () => setOperator(button.textContent)));

function addNumber(number) {
    if(currentNumber.textContent === '0' || shouldResetScreen)
    reset();
   let str = currentNumber.textContent += number
   currentNumber.textContent = addComma(str)
}

function setOperator(operator) {
    if(currentOperator !== null) {
        calculate();
    }
    firstNumber = currentNumber.textContent;
    firstNumber = firstNumber.split(',').join('');
    currentOperator = operator;
    calculationDisplay.textContent = `${firstNumber} ${currentOperator}`;
    shouldResetScreen = true;
}

function calculate() {
    if(currentOperator === null || shouldResetScreen) return;
    if(currentOperator === '/' && currentNumber.textContent === '0') {
        currentNumber.textContent = `LoL`;
        return;
    }
    secondNumber = currentNumber.textContent;
    secondNumber = secondNumber.split(',').join('');
    currentNumber.textContent = roundResult(
        operate(currentOperator, firstNumber, secondNumber)
        ).toLocaleString();
    calculationDisplay.textContent = `${firstNumber} ${currentOperator} ${secondNumber} =`;
    currentOperator = null;
}

function roundResult(number) {
    return Math.round(number * 100) / 100
  }

function reset() {
    currentNumber.textContent = '';
    shouldResetScreen = false;
}

