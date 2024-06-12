class User {
  email;
  name;
  age;
  constructor(){}

  setEmail(email) {
    this.email = email;
  }

  getEmail() {
    return this.email
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name
  }

  setAge(age) {
    this.age = age;
  }

  getAge() {
    return this.age
  }
}

module.exports = new User();