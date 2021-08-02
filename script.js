'use strict';

const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('.display');
const buttonsContainer = calculator.querySelector('.buttons-container');

function calculate(firstNumber, operator, secondNumber) {
  firstNumber = parseFloat(firstNumber);
  secondNumber = parseFloat(secondNumber);
  let result = '';
  if (operator == 'plus') result = firstNumber + secondNumber;
  if (operator == 'minus') result = firstNumber - secondNumber;
  if (operator == 'multi') result = firstNumber * secondNumber;
  if (operator == 'divide' && secondNumber != 0) result = firstNumber / secondNumber;
  console.log(String(result).length);

  if (result < 0.1) {
    return result
      .toFixed(6)
      .replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')
      .replace(/0*$/, '');
  } // else if (String(result).length > 7) {
  //   // let res = result.toString(2);
  //   // return parseInt(res, 10);}
  else {
    return result;
  }
}
// 7
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
  if (displayValue.length < 7 || previousKeyType == 'operator') {
    if (type == 'number') {
      console.log(previousKeyType);

      if (displayValue == '0') {
        display.textContent = keyValue;
      } else if (previousKeyType == 'operator' || previousKeyType == 'percent') {
        display.textContent = keyValue;
      } else if (previousKeyType == 'operator' && displayValue !== '0') {
        display.textContent = displayValue + keyValue;
      } else {
        display.textContent = displayValue + keyValue;
      }
      if (previousKeyType == 'equal' && displayValue !== '0') {
        display.textContent = keyValue;
      }
    }

    // If this an Operator key?

    if (type === 'decimal') {
      if (!displayValue.includes('.')) {
        display.textContent = displayValue + '.';
      } else if (previousKeyType === 'operator' || previousKeyType === 'percent') {
        display.textContent = '0.';
      }
      if (previousKeyType === 'equal') {
        display.textContent = '';
      }
      console.log(previousKeyType);
    }

    if (type === 'change' && displayValue !== '0') {
      if (+displayValue > 0) {
        display.textContent = '-' + displayValue;
      } else if (+displayValue < 0) {
        display.textContent = displayValue.slice(1);
      }
    }
  }
  // If this a Number key?
  if (type == 'operator') {
    const operatorKeys = document.querySelectorAll('[data-type="operator"]');
    operatorKeys.forEach(item => {
      item.dataset.state = '';
    });
    if (displayValue != '0' && type == 'number') {
      display.textContent = keyValue;
      calculator.dataset.firstValue = displayValue;
      console.log(previousKeyType);
    }

    calculator.dataset.firstNumber = displayValue;
    key.dataset.state = 'selected';
    calculator.dataset.operator = key.dataset.key;
  }

  // If this an Equal key?
  // We need to numbers First and second to get some math operations FirstNumber * SecondNumber and etc.
  if (type == 'equal') {
    const firstNumber = calculator.dataset.firstNumber;
    const secondNumber = displayValue;
    const operator = calculator.dataset.operator;
    if (firstNumber && secondNumber && operator) {
      display.textContent = calculate(firstNumber, operator, secondNumber);
    } else {
      display.textContent = '0';
    }
    console.log(previousKeyType);
  }

  if (type == 'percent') {
    if (
      previousKeyType === 'equal' ||
      previousKeyType === 'number' ||
      previousKeyType === 'change'
    ) {
      if (displayValue >= 1 || displayValue <= 1) {
        display.textContent = displayValue / 100;
      } else {
        display.textContent = '0.00' + displayValue.slice(2);
      }
    }
    console.log(previousKeyType);
  }

  if (type == 'clear') {
    display.textContent = '0';
    calculator.dataset.firstValue = '';
    calculator.dataset.operator = '';
    calculator.dataset.previousKeyType = '';
    console.log(previousKeyType);
  }

  calculator.dataset.previousKeyType = type;
  // Refresh dataset.previousKeyType after every operation
});

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

console.log(
  parseInt(
    '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
    2
  )
);
