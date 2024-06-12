const { createServer } = require('http');
const port = 3000;

const handler = (req, res) => {
  if (req.url === '/save' && req.method === 'POST') {
    res.writeHead(200)
    return res.end('Mood Save!');
  }
  return res.end('Hello World!')
};

const app = createServer((req, res) => {
  handler(req, res);
});

app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});

module.exports = app;