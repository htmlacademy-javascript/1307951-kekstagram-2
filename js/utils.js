/**
 * возвращает рандомное число от @param {number} min до @param {number} max
*/
function getRandomInt(min = 0, max = 1000) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

/**  возвращает Функцию, которая считае число от
 * @param {number} min до @param {number} max,
 * которое не повторяется
 * */
const getUniqueRandomHelper = (min = 0, max = 1000) => {
  const array = [];
  let randomNumber = getRandomInt(min, max);

  return () => {
    try {
      if(array.length !== (max + 1)) {
        while(array.includes(randomNumber)) {
          randomNumber = getRandomInt(min, max);
        }
        array.push(randomNumber);
        return randomNumber;
      }

      throw new Error(`Вы перебрали все уникальные числа в диапазоне от ${min} до ${max}`);
    } catch (error) {
      console.error(error.message);
    }
  };
};


export {getRandomInt, getUniqueRandomHelper};
