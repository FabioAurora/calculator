'use strict';

// functions for all of the basic math operators
function add(a = 0, b) {
    if(!b) {
        return a;
    }
    return a + b;
}

function subtract(a = 0, b) {
    if(!b) {
        return a;
    }
    return a - b;
}

function multiply(a = 0, b) {
    if(!b) {
        return a;
    }
    return a * b;
}

function divide(a = 0, b) {
    if(!b) {
        return a;
    }
    return a / b;
}