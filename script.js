// script.js
// Selecting elements
const display = document.querySelector('.display');
const clearButton = document.querySelector('.clear');
const backspaceButton = document.querySelector('.backspace');
const operatorButtons = document.querySelectorAll('.operator');
const digitButtons = document.querySelectorAll('.digit');
const decimalButton = document.querySelector('.decimal');
const equalsButton = document.querySelector('.equals');

// Variables to store calculator data
let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let shouldResetDisplay = false;

// Helper function to update the display
function updateDisplay(value) {
    display.textContent = value.toString().slice(0, 12);
}

// Helper function to reset calculator data
function clear() {
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
}

// Helper function to perform math operations
function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) {
                return 'Error';
            } else {
                return a / b;
            }
        default:
            return b;
    }
    console.log("Operator:", operator);
console.log("Operands:", a, b);
}

// Add event listeners to operator buttons
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentOperator !== null) {
            operateAndDisplay();
        }
        currentOperator = button.getAttribute('data-operator');
        shouldResetDisplay = true;
    });
});

// Add event listeners to digit buttons
// Add event listeners to digit buttons
digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (display.textContent === '0' || shouldResetDisplay) {
            display.textContent = '';
            shouldResetDisplay = false;
        }
        display.textContent += button.textContent;
        if (currentOperator === null) {
            firstOperand = display.textContent;
        } else {
            secondOperand = display.textContent;
        }
    });
});


// Add event listener to decimal button
decimalButton.addEventListener('click', () => {
    if (!display.textContent.includes('.')) {
        updateDisplay(display.textContent + '.');
    }
});

// Add event listener to equals button
equalsButton.addEventListener('click', operateAndDisplay);

// Helper function to perform the operation and update display
function operateAndDisplay() {
    if (currentOperator === null || shouldResetDisplay) return;
    if (currentOperator !== null) {
        secondOperand = display.textContent;
    }
    updateDisplay(operate(currentOperator, firstOperand, secondOperand));
    firstOperand = display.textContent;
    currentOperator = null;
    shouldResetDisplay = true;

    console.log("First Operand:", firstOperand);
console.log("Second Operand:", secondOperand);
console.log("Current Operator:", currentOperator);
}

// Add event listener to clear button
clearButton.addEventListener('click', () => {
    clear();
    updateDisplay(0);
});

// Add event listener to backspace button
backspaceButton.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === '') {
        display.textContent = '0';
    }
});
