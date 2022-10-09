'use strict';

// 1- functions for all of the basic math operators
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

// 2 - function to take an operator and 2 numbers and then calls one of the above functions
function operate(operator, a, b) {
    let output = 0;

    try {

        switch(operator) {
            case '+':
                output = add(a, b);
                break;
            case '-':
                output = subtract(a, b);
                break;
            case '*':
                output = multiply(a, b);
                break;
            case '/':
                if( b === 0) {
                    throw `really?..duhh`;
                }else {
                    output = a / b;
                }
                break;
        }

    }
    catch(error) {
        console.log(`There is an error:`,error);
    }

    return output;
}
console.log(operate('/', 4, 0))