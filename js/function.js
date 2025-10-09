
/* Задание 1*/
function checkStringLength(charArray, length){
  try {
    return (charArray.length < length);
  } catch(exc){
    // console.error('not string');
  }
}

checkStringLength('проверяемая строка', 20);
// console.log(`Ожидаю true, получаю - ${checkStringLength('проверяемая строка', 20)}`);
// console.log(`Ожидаю true, получаю - ${checkStringLength('проверяемая строка', 18)}`);
// console.log(`Ожидаю false, получаю - ${checkStringLength('проверяемая строка', 10)}`);

/* Задание 2*/
function isPolyndrome(exampleString) {
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
function getNumber(yourString) {
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
