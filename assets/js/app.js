'use strict';
/* calculator project */
/* Accessing DOM elements */
const currentNumber = document.querySelector('#currentNumberDisplay');
const calculationDisplay = document.querySelector('#calculationDisplay');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('#equalsButton');
const clearButton = document.querySelector('#clearButton');
const BACKSPACE_BUTTON = document.querySelector('#backspaceBtn');
const DECIMAL_BUTTON =  document.querySelector('#decimalBtn');
const OUTER_CIRCLE = document.querySelector('#outerCircle');
const DISPLAY = document.querySelector('#display');
const DATE = document.querySelector('#date');

/* Buttons event listeners */
//Number Buttons adding the button values to the addNumber function
numberButtons.forEach(button => button.addEventListener('click', () => addNumber(button.textContent)));

// Operator Button values added to setOperator function
operatorButtons.forEach(button => button.addEventListener('click', () => setOperator(button.textContent)));


equalsButton.addEventListener('click', calculate);
clearButton.addEventListener('click', clearAll);
BACKSPACE_BUTTON.addEventListener('click', clearLastNumber);
DECIMAL_BUTTON.addEventListener('click', setDecimal);

/* variables to store all the values to use on the operate function */
let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetScreen = false;
let resetCalculation = false;

/* function for clear button */
function clearAll() {
    firstNumber = '';
    secondNumber = '';
    currentNumber.textContent = '0';
    calculationDisplay.textContent = '';
    currentOperator = null;
    OUTER_CIRCLE.classList.remove('not-compute');
    DISPLAY.setAttribute('style', 'animation: neon 1s  forwards;');
}

/* function for the backspace button */
function clearLastNumber() {
    if(secondNumber !== ''){
        calculationDisplay.textContent = '';
        shouldResetScreen = true;
        return;
    }
    currentNumber.textContent = currentNumber.textContent.slice(0, -1);
    OUTER_CIRCLE.classList.remove('not-compute');
    DISPLAY.setAttribute('style', 'animation: neon 1s  forwards;');
}

/* function to input decimals */
function setDecimal() {
    if(shouldResetScreen) reset();
    if(currentNumber.textContent === '') {
        currentNumber.textContent === '0';
    }else if(currentNumber.textContent.includes('.')) return;// returning if the user already entered "."
    currentNumber.textContent += '.';
    OUTER_CIRCLE.classList.remove('not-compute');
    DISPLAY.setAttribute('style', 'animation: neon 1s  forwards;');
}

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

/* function to populate the display when the numbers buttons are clicked */
function addNumber(number) {
    if(currentNumber.textContent === '0' || shouldResetScreen)
    reset();
    // preventing the numbers to overflow the display
    if(currentNumber.textContent.length >= 15) {
        currentNumber.textContent += '';
    }else {
        let numberString = currentNumber.textContent += number;
        // the only way I could figure to input a comma dynamically while typing
        if(!currentNumber.textContent.includes(',')) {
         currentNumber.textContent = Number(currentNumber.textContent).toLocaleString();
        }else if(isNaN(currentNumber.textContent)) {
         let result = numberString.replaceAll(',', '');
         return currentNumber.textContent = Number(result).toLocaleString();
        }
        if(resetCalculation) {
         resetCalc();
        }
        //resetting the elements affected by the user trying to divide by 0
        OUTER_CIRCLE.classList.remove('not-compute');
        DISPLAY.setAttribute('style', 'animation: neon 1s  forwards;');
    }
}

/* function to determine the current operator */
function setOperator(operator) {
    if(currentOperator !== null) {
        calculate();
    }
    firstNumber = currentNumber.textContent;
    firstNumber = firstNumber.split(',').join('');
    currentOperator = operator;
    calculationDisplay.textContent = `${firstNumber} ${currentOperator}`;
    shouldResetScreen = true;
    //resetting the elements affected by the user trying to divide by 0
    OUTER_CIRCLE.classList.remove('not-compute');
    DISPLAY.setAttribute('style', 'animation: neon 1s  forwards;');
}

function calculate() {
    if(currentOperator === null || shouldResetScreen) return;
    if(currentOperator === '/' && currentNumber.textContent === '0') {
        let audio = new Audio('assets/not-compute.mp3');
        audio.play();
        OUTER_CIRCLE.classList.add('not-compute');
        DISPLAY.setAttribute('style', 'animation: neonRed 2s  forwards;');
        currentNumber.textContent = `o.O`;
        reset()
    }
    secondNumber = currentNumber.textContent;
    secondNumber = secondNumber.split(',').join('');
    //calculation result
    //round the result
    // using if statement to check for big number and change it with exponential
    //using toLocaleString to place comma (",") if number is >= 1000 in calculation result
    if(firstNumber.length >= 12 && secondNumber.length >= 12) {
        currentNumber.textContent = roundResult(
            operate(currentOperator, firstNumber, secondNumber)
            ).toExponential(2).toLocaleString();
    }else {
        currentNumber.textContent = roundResult(
            operate(currentOperator, firstNumber, secondNumber)
            ).toLocaleString();
    }

    calculationDisplay.textContent = `${firstNumber} ${currentOperator} ${secondNumber} =`;
    currentOperator = null;
    shouldResetScreen = true;
    resetCalculation = true;
}

function roundResult(number) {
    return Math.round(number * 100) / 100
  }

function reset() {
    currentNumber.textContent = '';
    shouldResetScreen = false;
}

function resetCalc() {
    calculationDisplay.textContent = '';
    resetCalculation = false;
}


/*  Keyboard support*/

function getKeyboardInput(event) {
    const KEYS = event.key
    switch(true) {
        case KEYS >= 0 && KEYS <= 9:
            addNumber(KEYS);
            break;
        case KEYS === 'Backspace':
            clearLastNumber();
            break;
        case KEYS === 'Delete':
            clearAll();
            break;
        case KEYS === '.':
            setDecimal();
                break;
        case KEYS === '=':
        case KEYS === 'Enter':
            calculate();
            break;
        case KEYS === '/':
        case KEYS === '*':
        case KEYS === '-':
        case KEYS === '+':
            setOperator(KEYS);
            break;
        default:
            OUTER_CIRCLE.classList.remove('not-compute');
            break;
    }
}

/* date section */
const currentYear = new Date().getFullYear();
DATE.textContent = currentYear;

window.addEventListener('keydown', getKeyboardInput);