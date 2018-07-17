function add(a, b) {
  return a + b;
}

function sum() {
  let numbers = Array.from(arguments);
  let sum = 0;
  numbers.forEach(num => sum += num);
  return sum;
}

// testing
console.log(add(10, 6)); // 16
console.log(sum(10, 5, 6)); // 21
