const assert = require('assert');
const { describe, it, mock, afterEach, after } = require('node:test');
const request = require('supertest');
const User = require('../src/entities/user.entity');
const app = require('../src/index');


describe('Node Runner Tests Examples',() => {

  afterEach(() => {
    mock.reset();
  });
  
  after((done) => app.close(done));

  it('Should test sum',() => {
    const sum = 4+4;

    assert.strictEqual(sum, 8)
  });

  it('should create user', () => {
    const user = User;
    user.setAge(20);
    user.setEmail('teste@gmail.com');
    user.setName('Ezequiel');

    assert.strictEqual(user.getName(), 'Ezequiel');
    assert.strictEqual(user.getAge(), 20);
    assert.strictEqual(user.getEmail(), 'teste@gmail.com');
  });

  it('should test e2e',async  () => {
    const response = await request(app)
      .get('/');

    assert.strictEqual(response.status, 200)
    assert.strictEqual(response.text, 'Hello World!')
  });

  it('should test e2e post',async  () => {
    const response = await request(app)
      .post('/save');

    assert.strictEqual(response.text, 'Mood Save!')
  });
})