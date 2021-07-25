'use strict';
const hourEl = document.querySelector('.clock__hour');
const minuteEl = document.querySelector('.clock__minute');
const valueEl = document.querySelector('.value');
//functions of calculator
const acEl = document.querySelector('#ac');
const pmEl = document.querySelector('#pm');
const percentEl = document.querySelector('#percent');

//operators of calculator
const divisionEl = document.querySelector('#division');
const multiEl = document.querySelector('#multi');
const minusEl = document.querySelector('#minus');
const plusEl = document.querySelector('#plus');
const equalEl = document.querySelector('#equal');

//numbers of calculator
const sevenEl = document.querySelector('#seven');
const eightEl = document.querySelector('#eight');
const nineEl = document.querySelector('#nine');
const fourEl = document.querySelector('#four');
const fiveEl = document.querySelector('#five');
const sixEl = document.querySelector('#six');
const oneEl = document.querySelector('#one');
const twoEl = document.querySelector('#two');
const threeEl = document.querySelector('#three');
const zeroEl = document.querySelector('#zero');
const dotEl = document.querySelector('#dot');

// Addeventlistener on Numbers
const numberElArray = [
  zeroEl,
  oneEl,
  twoEl,
  threeEl,
  fourEl,
  fiveEl,
  sixEl,
  sevenEl,
  eightEl,
  nineEl,
];

// const getValueAsStr = () => {
//   const currentDisplayStr = valueEl.textContent;
//   console.log(currentDisplayStr);
//   if (currentDisplayStr !== '0') {
//     return currentDisplayStr.split(' ').join(' ');
//   }
// };

const handleNumberClick = numStr => {
  const currentDisplayStr = getValueAsStr();

  if (currentDisplayStr == '0') {
    valueEl.textContent = numStr;
  } else {
    valueEl.textContent = parseFloat(currentDisplayStr + numStr).toLocaleString();
  }
};

for (let i = 0; i < numberElArray.length; i++) {
  const numberEl = numberElArray[i];
  numberEl.addEventListener('click', () => {
    handleNumberClick(i.toString());
  });
}

// Set up the time

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
// We set all code from setInterval to updateTime and call updateTime in set inteveal every second;
