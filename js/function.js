
/* Задание 1*/
function checkStringLength(myString = '', length = 1) {
  try {
    return (myString.length < length);
  } catch(exc){
    // console.error('not string');
  }
}

const checkStringLength2 = (myString = '', length = 1) => myString.length < length;

checkStringLength('проверяемая строка', 20);
checkStringLength2('проверяемая строка', 20);
// console.log(`Ожидаю true, получаю - ${checkStringLength('проверяемая строка', 20)}`);
// console.log(`Ожидаю true, получаю - ${checkStringLength('проверяемая строка', 18)}`);
// console.log(`Ожидаю false, получаю - ${checkStringLength('проверяемая строка', 10)}`);

/* Задание 2*/
function isPolyndrome(exampleString = '') {
  try {
    const originalString = exampleString.replaceAll(' ', '').toLowerCase();
    let reverseString = '';

    for (let i = originalString.length - 1; i >= 0 ; i--) {
      reverseString += originalString[i];
    }

    return (reverseString === originalString);
  } catch (e) {
    // console.error('что-то пошло не так... проверьте, строку ль ввели?');
  }
}

isPolyndrome('Лёша на полке клопа нашёл ');
// console.log(`Ожидаю true, получаю - ${isPolyndrome('Лёша на полке клопа нашёл ')}`);

/* Задание 3*/
function getNumber(yourString = '') {
  let number = '';
  let str = '';

  try {
    if(typeof yourString === 'string') {
      str = yourString;
    } else if (typeof yourString === 'number') {
      str = yourString.toString();
    } else {
      throw new Error('нужна или строка, или число, а я получил что-то другое');
    }
  } catch (e) {
    // console.error(e.message);
  }

  for (let i = 0; i < str.length; i++){
    const symbol = parseInt(str[i], 10);

    if(!Number.isNaN(symbol)) {
      number += str[i];
    }
  }

  return !number.length ? number : parseInt(number, 10);
}

getNumber('2023 год');
// console.log(`Ожидаю число 2023, получаю - ${getNumber('2023 год')}`);
// console.log(`Ожидаю число 2022, получаю - ${getNumber('ECMAScript 2022')}`);
// console.log(`Ожидаю число 105, получаю - ${getNumber('1 кефир, 0.5 батона')}`);
// console.log(`Ожидаю число 7, получаю - ${getNumber('агент 007')}`);
// console.log(`Не ожидаю числа, получаю  - ${getNumber('а я томат')}`);
// console.log(`Ожидаю число 2023, получаю - ${getNumber(2023)}`);
// console.log(`Ожидаю число 1, получаю - ${getNumber(-1)}`);
// console.log(`Ожидаю число 15, получаю - ${getNumber(1.5)}`);

/**
 * считаем минуты
*/

function getMinutesFromTimeString(timeString) {
  const parts = timeString.split(':');
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);

  return (hours * 60) + minutes;
}

function isWorkHoursMeeting (dayStart, dayEnd, meetingStart, meetingDuration) {
  const startDay = getMinutesFromTimeString(dayStart);
  const endDay = getMinutesFromTimeString(dayEnd);
  const startMeeting = getMinutesFromTimeString(meetingStart);
  const endMeeting = startMeeting + meetingDuration;

  return (startDay <= startMeeting && endDay >= endMeeting);
}

console.log(isWorkHoursMeeting('08:00', '17:30', '14:00', 90));
console.log(isWorkHoursMeeting('8:0', '10:0', '8:0', 120));
console.log(isWorkHoursMeeting('08:00', '14:30', '14:00', 90));
console.log(isWorkHoursMeeting('14:00', '17:30', '08:0', 90));
console.log(isWorkHoursMeeting('8:00', '17:30', '08:00', 900));
