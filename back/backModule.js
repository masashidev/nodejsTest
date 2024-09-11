

module.exports = {
  name: 'backModule',
  age: 25,
  updateAge() {
    this.age++;
    console.log(this.age);
  }
}
