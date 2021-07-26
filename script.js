'use strict';

//functions of calculator
// const acEl = document.querySelector('#ac');
// const pmEl = document.querySelector('#pm');
// const percentEl = document.querySelector('#percent');

// //operators of calculator
// const divisionEl = document.querySelector('#division');
// const multiEl = document.querySelector('#multi');
// const minusEl = document.querySelector('#minus');
// const plusEl = document.querySelector('#plus');
// const equalEl = document.querySelector('#equal');

// //numbers of calculator
// const sevenEl = document.querySelector('#seven');
// const eightEl = document.querySelector('#eight');
// const nineEl = document.querySelector('#nine');
// const fourEl = document.querySelector('#four');
// const fiveEl = document.querySelector('#five');
// const sixEl = document.querySelector('#six');
// const oneEl = document.querySelector('#one');
// const twoEl = document.querySelector('#two');
// const threeEl = document.querySelector('#three');
// const zeroEl = document.querySelector('#zero');
// const dotEl = document.querySelector('#dot');

// // Addeventlistener on Numbers
// const numberElArray = [
//   zeroEl,
//   oneEl,
//   twoEl,
//   threeEl,
//   fourEl,
//   fiveEl,
//   sixEl,
//   sevenEl,
//   eightEl,
//   nineEl,
// ];

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
    const secondNumber = displayValue;
    const firstNumber = calculator.dataset.firstNumber;
    const operator = calculator.dataset.operator;
    console.log(firstNumber, secondNumber, operator);
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
