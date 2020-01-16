// implement your API here

const express = require('express'); 

const db = require("./data/db.js");

const port = 4000;

const server = express(); 

server.listen(port, () => {
    console.log('**** listening on port 4000');
});

// global middleware 
server.use(express.json());   //??  do I need this?? -YES

server.get('/', (req, res) => {
    res.send('hello from express!');
}); 

/*
| POST   | /api/users     | Creates a user using the information sent inside the `request body`.
*/  
// 201 and working! 

server.post('/api/users', (req, res) => {
    const UserInfo = req.body;

    db.insert(UserInfo)
        .then(user => {
            if(user) {
                res.status(201).json({ success: true, user});
            } else {
                res.status(400).json({ success: false, message: 'Please provide name and bio for the user'});
            }
        })
        .catch(err => {
            res.status(500).json({success: false, message: 'The users iformation could not be retrieved', err});
        });
}); 


/*
| GET    | /api/users     | Returns an array of all the user objects contained in the database.  
*/
// works and gets users back 

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({success: false, 
                message: 'The users information could not be retrieved.'});
        });
});


/*
| GET    | /api/users/:id | Returns the user object with the specified `id`.   
*/
// error 200 in postman, 
//      but can get it thru the browser just fine?! - Had it spelled wrong in Postmand users NOT user
//          working! 

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;

    db.findById(id)
        .then(found => {
            if(found) {
                res.status(200).json({sucess: true, found});
            } else {
                res.status(404).json({success: false, message: 'The user with the specified ID does not exist'});
            }
        })
        .catch(err => {
            res.status(500).json({success: false, message: 'The user information could not be retrieved'});
        }); 
}); 


/*
| DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.   
*/
// users/:1 gone, but throwing error 500 in postman. 

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;

    db.remove(id)
        .then(deleted => {
            if(deleted) {
                res.status(204).end({message: ' User deleted worked!'}); 
            } else {
                res.status(404).json({ success: false, 
                    message: 'The user with the specified ID does not exist' });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, 
                message: 'The user could not be removed', err});
        });
}); 


/*
| PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**. |
*/
// works great! 

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const change = req.body;

    db.update(id, change)
        .then(user => {
            if(user) {
                res.status(200).json({success: true, user});
            } else if(id) {
                res.status(404).json({succes: false, 
                    message: 'The user with the specified ID does not exist.'}); 
            } else {
                res.status(400).json({sucess: false, message: 'Please provide name and bio for the user.'});
            }
        })
        .catch(err => {
            res.status(500).json({success: false, 
                message: 'The user information could not be modified.'})
        });
});