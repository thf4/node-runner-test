'strict mode';

const assert = require('assert');
const { describe, it, mock, afterEach, after } = require('node:test');
const request = require('supertest');
const User = require('../src/entities/user.entity');
const app = require('../src/index');
const axios = require('axios');
const service = require('../src/services');

describe('Node Runner Tests Examples', () => {

  afterEach(() => {
    mock.reset();
  });

  after((done) => app.close(done));

  it('Should test sum', () => {
    const sum = 4 + 4;

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

  it('should test e2e', async () => {
    const response = await request(app)
      .get('/');

    assert.strictEqual(response.status, 200)
    assert.strictEqual(response.text, 'Hello World!')
  });

  it('should test e2e post', async () => {
    const user = User;
    user.setAge(20);
    user.setEmail('teste@gmail.com');
    user.setName('Ezequiel');

    mock.method(global, 'fetch', () => {
      return { status: 201, json: () => user }
    })
    const response = await request(app)
      .post('/save')
      .send(user);

    assert.strictEqual(response.text, '{"email":"teste@gmail.com","name":"Ezequiel","age":20}')
  });

  it('should test e2e post with axios mock', async () => {
    const user = User;
    user.setAge(12);
    user.setEmail('node@gmail.com');
    user.setName('Ezreal');

    mock.method(axios, 'post', () => {
      return {
        status: 201, json: () => ({
          email: "teste@gmail.com", name: "Ezequiel", age: 20
        })
      }
    })
    const response = await request(app)
      .post('/save/axios')
      .send(user);

    assert.strictEqual(response.text, '{"email":"teste@gmail.com","name":"Ezequiel","age":20}');
  });

  it('should test post with axios mock error', async () => {
    const user = User;
    user.setAge(12);
    user.setEmail('node@gmail.com');
    user.setName('Ezreal');

    const error = new Error('some error message');
    mock.method(axios, 'post', () => Promise.reject(error))

    await assert.rejects(async () => service.createUserWithAxios(user), error);
  });

  it('should test post with fetch mock error', async () => {
    const user = User;
    user.setAge(12);
    user.setEmail('node@gmail.com');
    user.setName('Ezreal');

    const error = new Error('some error message');
    mock.method(global, 'fetch', () => Promise.reject(error))

    await assert.rejects(async () => service.createUser(user), error);
  });

  it('should test post with service mock error', async () => {
    const user = User;
    user.setAge(12);
    user.setEmail('node@gmail.com');
    user.setName('Ezreal');

    const error = new Error('some error message');
    mock.method(service, 'createUser', () => Promise.reject(error))

    await assert.rejects(async () => service.createUser(user), error);
  });

  it('should test service mock', async () => {
    const user = User;
    user.setAge(12);
    user.setEmail('node@gmail.com');
    user.setName('Ezreal');

    const returnuser = {
      age: 10,
      name: 'Estela',
      email: 'mundo@gmail.com'
    };
    mock.method(service, 'createUser', () => returnuser);

    const result = await service.createUser(user);
     assert.equal(result, returnuser);
     // spy call function mock
     assert.equal(service.createUser.mock.calls.length, 1);
  });
})