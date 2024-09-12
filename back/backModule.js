
function function1() {
  return 'This is function1 from backModule.js';
}
function function2() {
  return 'This is function2 from backModule.js';
}

const objData = {
  name: 'John',
  age: 25
};

module.exports = {
  function1,
  function2,
  objData,
};
