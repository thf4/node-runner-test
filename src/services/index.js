'strict mode';
const axios = require('axios');
class ServiceWorker {
  url;
  constructor() {
    this.url = "http://localhost:3001/create/"
  };

  async createUser(user) {
    try {
      const users = await fetch(this.url, { method: 'POST', body: { user } });
      return users.json();
    } catch (error) {
      throw error
    }
  }

  async createUserWithAxios(user) {
    try {
      const users = await axios.post(this.url, { user });
      return users.json();
    } catch (error) {
      throw error
    }
  }
}

module.exports = new ServiceWorker();