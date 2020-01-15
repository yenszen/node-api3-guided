const express = require('express'); // importing a CommonJS module
const helmet = require('helmet'); // importing a pre-baked piece of middleware
const hubsRouter = require('./hubs/hubs-router.js'); // [ ARRAY OF MIDDLEWARES, EACH BEING AN ENDPOINT ]

function auth(req, res, next) {
  // 1- we need to check username and password
  // 2- username and password are in the request somewhere
  // 3- credentials will be expected in the req.body { username, password }
  // 4- if username === 'emma' & password === '1234' then proceed ---> next()
  // 5- otherwise we res.json 400 and that's that 
  const data = req.body; // {}
  if (data.username === "emma" && data.password === "1234") {
    next();
  } else {
    res.status(404).json("Nope!");
  }
}

const server = express();

server.use(express.json()); // ADDING A SEGMENT TO THE TUBE -> PLUGGING A PIECE OF MIDDLEWARE
// server.use(auth); // this would be putting auth across the board

// let's add a segment that obscures the fact that this is an Express app
// helmet, as imported, is a function that returns a middleware (which is in turn a function)
server.use(helmet( /* we could potentially add helmet configuration */))

function logger(req, res, next) {
  console.log('logging the thing');
  next()
}

const loggerWithConfig = (customText) => (req, res, next) => {
  console.log(`logging ${customText}`);
  next()
}

// server.use(logger)
server.use(loggerWithConfig('THE COOLNESS'))

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

server.post('*', (req, res) => {
  res.json('congrats')
})

module.exports = server;
