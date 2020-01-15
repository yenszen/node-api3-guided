const express = require('express'); // importing a CommonJS module

const hubsRouter = require('./hubs/hubs-router.js'); // [ ARRAY OF MIDDLEWARES, EACH BEING AN ENDPOINT ]

const server = express();

server.use(express.json()); // ADDING A SEGMENT TO THE TUBE -> PLUGGING A PIECE OF MIDDLEWARE

server.use('/api/hubs', hubsRouter); // ADDING SEVERAL MIDDLEWARES

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
  `);
});

server.get('*', (req, res) => {
  res.status(404).json({ message: 'Not found, sorry about that' })
})

module.exports = server;
