const _ = require('lodash');

function add(a, b) {
  return a + b;
}

function sum() {
  let numbers = Array.from(arguments);
  let sum = 0;
  numbers.forEach(num => sum += num);
  return sum;
}

function sumArray() {
  let arr = arguments[0];

  if (arguments.length > 1) {
    arr = _.concat(...arguments);
  }
  // reusing the sum function
  // using the spread operator (...) since
  // sum takes an argument of numbers
  return sum(...arr);
}

module.exports = {
  add,
  sum,
  sumArray,
};
