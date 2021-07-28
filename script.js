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

  return result;
}

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
    console.log(previousKeyType);
    if (displayValue == '0') {
      display.textContent = keyValue;
    } else if (previousKeyType == 'operator') {
      display.textContent = keyValue;
    } else if (previousKeyType == 'operator' && displayValue !== '0') {
      display.textContent = displayValue + keyValue;
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
    if (firstNumber && secondNumber && operator) {
      display.textContent = calculate(firstNumber, operator, secondNumber);
    } else {
      display.textContent = '0';
    }
  }

  if (type == 'percent') {
    if (previousKeyType === 'equal' || previousKeyType === 'number') {
      const secondNumber = parseInt(displayValue);
      display.textContent = secondNumber / 100;
    }
  }
  if ((displayValue != '0' && previousKeyType === 'equal') || previousKeyType === 'percent') {
    display.textContent = keyValue;
    calculator.dataset.firstValue = displayValue;
  }

  if (type == 'clear') {
    display.textContent = '0';
    calculator.dataset.firstValue = '';
    calculator.dataset.operator = '';
    calculator.dataset.previousKeyType = '';
  }

  if (type === 'decimal') {
    if (!displayValue.includes('.')) {
      display.textContent = displayValue + '.';
    } else if (
      previousKeyType === 'operator' ||
      previousKeyType === 'equal' ||
      previousKeyType === 'percent'
    ) {
      display.textContent = '0.';
    }
  }

  calculator.dataset.previousKeyType = type;
  // Refresh dataset.previousKeyType after every operation
});

// keys.addEventListener('click', e => {
//     if (e.target.matches('button')) {
//         const key = e.target;
//         const action = key.dataset.action;
//         const keyContent = key.textContent;
//         const displayedNum = display.textContent;
//         // Remove .is-depressed class from all keys
//         Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));

//         if (!action) {
//             const previousKeyType = calculator.dataset.previousKeyType;
//             if (displayedNum === '0' ||
//             previousKeyType === 'operator' ||
//             previousKeyType === 'calculate') {
//                 display.textContent = keyContent;
//             } else {
//                 display.textContent = displayedNum + keyContent;
//             }
//             calculator.dataset.previousKeyType = 'number';
//         }

//         if (action === 'decimal') {
//             if (!displayedNum.includes('.')) {
//               display.textContent = displayedNum + '.';
//             } else if (
//               previousKeyType === 'operator' ||
//               previousKeyType === 'calculate'
//             ) {
//               display.textContent = '0.';
//             }
//           calculator.dataset.previousKeyType = 'decimal'
//         }

//         if (
//             action === 'add' ||
//             action === 'subtract' ||
//             action === 'multiply' ||
//             action === 'divide'
//         ) {
//             const firstValue = calculator.dataset.firstValue;
//             const operator = calculator.dataset.operator;
//             const secondValue = displayedNum;
//             const previousKeyType = calculator.dataset.previousKeyType;
//             if (
//                 firstValue &&
//                 operator &&
//                 previousKeyType !== 'operator' &&
//                 previousKeyType !== 'calculate') {
//                 const calcValue = calculate(firstValue, operator, secondValue);
//                 display.textContent = calcValue;
//                 // Update calculated value as firstValue
//                 calculator.dataset.firstValue = calcValue;
//             } else {
//             // If there are no calculations, set displayedNum as the firstValue
//                 calculator.dataset.firstValue = displayedNum;
//             }

//             key.classList.add('is-depressed');
//             // Add custom attribute
//             calculator.dataset.previousKeyType = 'operator';
//             calculator.dataset.firstValue = displayedNum;
//             calculator.dataset.operator = action;
//         }

//         if (action === 'decimal') {
//             if (!displayedNum.includes('.') ) {
//                 display.textContent = displayedNum + '.';
//             }
//             if (calculator.dataset.previousKeyType === 'operator') {
//                 display.textContent = '0.';
//             }
//             calculator.dataset.previousKeyType = 'decimal';
//         }

//         if (action === 'clear') {
//             if (key.textContent === 'AC') {
//                 calculator.dataset.firstValue = '';
//                 calculator.dataset.modValue = '';
//                 calculator.dataset.operator = '';
//                 calculator.dataset.previousKeyType = '';
//               } else {
//                 key.textContent = 'AC';
//               }
//             display.textContent = 0;
//             calculator.dataset.previousKeyType = 'clear';
//         }
//         if (action !== 'clear') {
//             const clearButton = calculator.querySelector('[data-action=clear]')
//             clearButton.textContent = 'CE';
//         }

//         if (action === 'calculate') {
//             let firstValue = calculator.dataset.firstValue;
//             const operator = calculator.dataset.operator;
//             let secondValue = displayedNum;
//             const previousKeyType = calculator.dataset.previousKeyType;
//             if (firstValue) {
//                 if (previousKeyType === 'calculate') {
//                     firstValue = displayedNum;
//                     secondValue = calculator.dataset.modValue;
//                   }
//                 display.textContent = calculate(firstValue, operator, secondValue);
//             }
//             // Set modValue attribute
//             calculator.dataset.modValue = secondValue;
//             calculator.dataset.previousKeyType = 'calculate';
//         }
//     }
// })

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
