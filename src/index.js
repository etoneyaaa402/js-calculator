import './styles/main.css';

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector('.current-operand');
const themeToggle = document.getElementById('theme-toggle');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;

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
  if (b === 0) return 'Error';
  return a / b;
}

function percent(a,b){
  return a*(b/100);
}

function signChange(a){
  return -a;
}

function calculate() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+':
      result = add(prev, current);
      break;
    case '-':
      result = subtract(prev, current);
      break;
    case '×':
      result = multiply(prev, current);
      break;
    case '÷':
      result = divide(prev, current);
      break;
    case '%':
      result = percent(prev, current);
      break;
    case '+/-':
      result = signChange(current);
      break;
    default:
      return;
  }
  currentOperand = result.toString();
  operation = undefined;
  previousOperand = '';
}

function chooseOperation(selectedOperation) {
  if (selectedOperation === '+/-') {
    if (currentOperand === '' || currentOperand === '0') return;
    const current = parseFloat(currentOperand);
    currentOperand = signChange(current).toString();
    updateDisplay();
    return;
  }
  
  if (selectedOperation === '%') {
    if (currentOperand === '') return;
    const current = parseFloat(currentOperand);
    if (previousOperand === '' || operation === undefined) {
      currentOperand = (current / 100).toString();
    } else {
      const prev = parseFloat(previousOperand);
      
      switch (operation) {
        case '+':
          currentOperand = percent(prev, current).toString();
          currentOperand = (prev + parseFloat(currentOperand)).toString();
          break;
        case '-':
          currentOperand = percent(prev, current).toString();
          currentOperand = (prev - parseFloat(currentOperand)).toString();
          break;
        case '×':
          currentOperand = percent(prev, current).toString();
          break;
        case '÷':
          currentOperand = (prev / (current / 100)).toString();
          break;
      }
      operation = undefined;
      previousOperand = '';
    }
    updateDisplay();
    return;
  }

  if (currentOperand === '') return;
  if (previousOperand !== '') {
    calculate();
  }
  operation = selectedOperation;
  previousOperand = currentOperand;
  currentOperand = '';
}

function appendNumber(number) {
  if (currentOperand === '0' && number !== '.') {
    currentOperand = number.toString();
    return;
  }
  
  if (currentOperand === '' && number === '.') {
    currentOperand = '0.';
    return;
  }
  
  if (number === '.' && currentOperand.includes('.')) return;
  
  currentOperand = currentOperand.toString() + number.toString();
}

function deleteNumber() {
  currentOperand = currentOperand.toString().slice(0, -1);
  if (currentOperand === '') {
    currentOperand = '0';
  }
}

function clear() {
  currentOperand = '0'; 
  previousOperand = '';
  operation = undefined;
}

function updateDisplay() {
  currentOperandTextElement.innerText = currentOperand;
  if (operation != null) {
    previousOperandTextElement.innerText = `${previousOperand} ${operation}`;
  } else {
    previousOperandTextElement.innerText = '';
  }
}

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.innerText);
    updateDisplay();
  });
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    chooseOperation(button.innerText);
    updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
  calculate();
  updateDisplay();
});

allClearButton.addEventListener('click', () => {
  clear();
  updateDisplay();
});

deleteButton.addEventListener('click', () => {
  deleteNumber();
  updateDisplay();
});

themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-theme');
});

clear();
updateDisplay();