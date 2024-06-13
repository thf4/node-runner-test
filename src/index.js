'strict mode';

const { createServer } = require('http');
const ServiceWorker = require('../src/services');

const port = 3000;

const serviceWorker = ServiceWorker;
const handler = async (req, res) => {
  if (req.url === '/save' && req.method === 'POST') {
    const user = await serviceWorker.createUser(req.body);
    res.writeHead(200, null, { "Content-type": "application/json" })
    return res.end(JSON.stringify(user));
  }
  return res.end('Hello World!')
};

const app = createServer((req, res) => {
  req
    .on('data', chunk => {
      req['body'] = JSON.parse(chunk.toString());
    }).on('end', () => {
      handler(req, res);
    })
});

app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});

module.exports = app;