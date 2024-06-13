'strict mode';

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
}

module.exports = new ServiceWorker();