// implement your API here

const express = require('express'); 

const db = require("./data/db.js");

const port = 4000;

const server = express(); 

server.listen(port, () => {
    console.log('**** listening on port 4000');
});

// global middleware 
server.use(express.json());   //??  do I need this??

server.get('/', (req, res) => {
    res.send('hello from express!');
}); 

/*
| POST   | /api/users     | Creates a user using the information sent inside the `request body`.
*/  
server.post('/api/users', (req, res) => {
    
})
