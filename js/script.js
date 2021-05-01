const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitSecondOperand: false,
    operator: null
};

function inputNumber(number) {
    const { displayValue, waitSecondOperand } = calculator;

    if (waitSecondOperand === true) {
        calculator.displayValue = number;
        calculator.waitSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? number : displayValue + number;
    }

    if (calculator.displayValue.length > 7) {
        calculator.displayValue = calculator.displayValue.substring(0, 7);
        return;
    }
}

function inputDecimal(dot) {

    resetNames();

    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }

    if (calculator.waitSecondOperand === true) {
        calculator.displayValue = '0.';
        calculator.waitSecondOperand = false;
        return;
    }
}

function handleOperator(nextOperator) {

    resetNames();

    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = `${parseFloat(result.toFixed(6))}`;
        calculator.firstOperand = result;
    }

    calculator.waitSecondOperand = true;
    calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '×') {
        return firstOperand * secondOperand;
    } else if (operator === '÷') {
        return firstOperand / secondOperand;
    }

    return secondOperand;
}

function deleteNumber() {
    if (calculator.displayValue === 'Infinity') {
        calculator.displayValue = '0';
        calculator.firstOperand = null;
    }

    calculator.displayValue = calculator.displayValue.slice(0, -1);
    calculator.firstOperand = parseFloat(calculator.displayValue);

    if (calculator.displayValue === '') {
        calculator.displayValue = '0';
    }

    if (calculator.displayValue === '0') {
        calculator.firstOperand = null;
    }
}

function allClear() {
    calculator.displayValue = '0';
    calculator.firstOperand = null,
    calculator.waitSecondOperand = false,
    calculator.operator = null
}

const displayNumber = document.getElementById('display-number');

function updateDisplay() {
    displayNumber.innerText = calculator.displayValue;
}

updateDisplay();

function displayBlink() {
    displayNumber.style.opacity = 0;

    setTimeout(function() { displayNumber.style.opacity = 1; }, 100);
}

function inputNames() {
    const nameSound = document.getElementById('name-sound');

    if (calculator.displayValue === '0' && calculator.firstOperand === 81 && calculator.operator === '÷') {
        calculator.displayValue = 'Kodi';
        updateDisplay();
        nameSound.play();
    }

    if (calculator.displayValue === '0' && calculator.firstOperand === 23 && calculator.operator === '÷') {
        calculator.displayValue = 'Ivaylo';
        updateDisplay();
        nameSound.play();
    }

    if (calculator.displayValue === '0' && calculator.firstOperand === 15 && calculator.operator === '÷') {
        calculator.displayValue = 'Dilyana';
        updateDisplay();
        nameSound.play();
    }
}

function resetNames() {
    if (calculator.displayValue === 'Kodi') {
        calculator.displayValue = '0';
    }

    if (calculator.displayValue === 'Ivaylo') {
        calculator.displayValue = '0';
    }

    if (calculator.displayValue === 'Dilyana') {
        calculator.displayValue = '0';
    }
}

const buttons = document.getElementById('buttons');

buttons.addEventListener('click', e => {
    const targetClick = e.target;

    if (!targetClick.matches('button')) {
        return;
    }

    if (targetClick.matches('button')) {
        const buttonSound = document.getElementById('button-sound');
        buttonSound.play();
    }

    if (targetClick.classList.contains('number')) {
        inputNumber(targetClick.innerText);
        updateDisplay();
        inputNames();
        return;
    }

    if (targetClick.classList.contains('operator')) {
        handleOperator(targetClick.innerText);
        updateDisplay();
        displayBlink();
        return;
    }

    if (targetClick.id == 'decimal') {
        inputDecimal(targetClick.innerText);
        updateDisplay();
        return;
    }

    if (targetClick.id == 'all-clear') {
        allClear();
        updateDisplay();
        displayBlink();
        return;
    }

    if (targetClick.id == 'delete') {
        resetNames();
        deleteNumber();
        updateDisplay();
        return;
    }

    if (targetClick.id == 'equals') {
        handleOperator(targetClick.innerText);
        updateDisplay();
        displayBlink();
        return;
    }
})