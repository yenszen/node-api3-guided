const express = require('express'); // importing a CommonJS module
const helmet = require('helmet'); // importing a pre-baked piece of middleware

const hubsRouter = require('./hubs/hubs-router.js'); // [ ARRAY OF MIDDLEWARES, EACH BEING AN ENDPOINT ]

const server = express();

server.use(express.json()); // ADDING A SEGMENT TO THE TUBE -> PLUGGING A PIECE OF MIDDLEWARE

// let's add a segment that obscures the fact that this is an Express app
// helmet, as imported, is a function that returns a middleware (which is in turn a function)
server.use(helmet( /* we could potentially add helmet configuration */ ))

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
