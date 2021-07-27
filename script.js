'use strict';

const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('.display');
const buttonsContainer = calculator.querySelector('.buttons-container');

// Add Deligation event on buttons wrap.
buttonsContainer.addEventListener('click', event => {
  let key = event.target;
  const { type } = key.dataset;
  // Get all data-type = ".."
  const { previousKeyType } = calculator.dataset;

  if (!key.closest('button')) return;
  // Exclude grid-gap of target-list

  let keyValue = key.textContent;
  const displayValue = display.textContent;

  // If this a Number key?
  if (type == 'number') {
    if (displayValue == '0') {
      display.textContent = keyValue;
    } else if (previousKeyType == 'operator') {
      display.textContent = keyValue;
    } else {
      display.textContent = displayValue + keyValue;
    }
  }

  // If this an Operator key?
  if (type == 'operator') {
    const operatorKeys = document.querySelectorAll('[data-type="operator"]');
    operatorKeys.forEach(item => {
      item.dataset.state = '';
    });
    key.dataset.state = 'selected';
    calculator.dataset.firstNumber = displayValue;
    calculator.dataset.operator = key.dataset.key;
  }

  // If this an Equal key?
  // We need to numbers First and second to get some math operations FirstNumber * SecondNumber and etc.
  if (type == 'equal') {
    const firstNumber = calculator.dataset.firstNumber;
    const secondNumber = displayValue;
    const operator = calculator.dataset.operator;

    display.textContent = calculate(firstNumber, operator, secondNumber);
  }

  if (type == 'percent') {
    const secondNumber = parseInt(displayValue);
    display.textContent = secondNumber / 100;
  }

  if (type === 'decimal') {
    console.log(type);
    if (!displayValue.includes('.')) {
      display.textContent = displayValue + '.';
    } else if (previousKeyType === 'operator' || previousKeyType === 'equal') {
      display.textContent = '0.';
    }
    calculator.dataset.previousKeyType = 'decimal';
  }

  calculator.dataset.previousKeyType = type;
  // Refresh dataset.previousKeyType after every operation
});

function calculate(firstNumber, operator, secondNumber) {
  firstNumber = parseInt(firstNumber);
  secondNumber = parseInt(secondNumber);
  let result = '';
  if (operator == 'plus') result = firstNumber + secondNumber;
  if (operator == 'minus') result = firstNumber - secondNumber;
  if (operator == 'multi') result = firstNumber * secondNumber;
  if (operator == 'divide') result = firstNumber / secondNumber;
  return result;
}

// Set up the time

const hourEl = document.querySelector('.clock__hour');
const minuteEl = document.querySelector('.clock__minute');

const updateTime = () => {
  const currentTime = new Date();

  let currentHour = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  hourEl.textContent = currentHour.toString();
  minuteEl.textContent = currentMinutes.toString().padStart(2, '0');
};
setInterval(updateTime, 1000);
updateTime();
// Function is called once after delay per second, so we need new func to update time every time (updateTime)
// We set all code from setInterval to updateTime and call updateTime in setInteveal every second;
