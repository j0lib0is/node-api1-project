// IMPORTS
const express = require('express');
const users = require('./users/model');

// BUILD YOUR SERVER HERE
const server = express();

// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
server.post('/api/users', (req, res) => {
	// Destructure the request
	const body = req.body;
	
	users.insert(body)
			.then((newUser) => {
				// Return newly created user
				res.status(201).json(newUser);
			})
			.catch(() => {
				// Or return error if user could not be created
				res.status(500).json({message: 'Could not create user.'});
			});
});

// ✅ | GET    | /api/users     | Returns an array users.                                                                                |
server.get('/api/users', (req, res) => {
	users.find()
		.then(users => {
			res.json(users);
		})
		.catch(() => {
			res.status(500).json({message: 'Could not find users.'});
		});
});

// ✅ | GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |
server.get('/api/users/:id', (req, res) => {
	users.findById(req.params.id)
		.then(user => {
			res.json(user);
		})
		.catch(() => {
			res.status(500).json({message: 'Could not find user.'});
		});
});

// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
server.delete('/api/users/:id', (req, res) => {
	
});

// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |
server.put('/api/users/:id', (req, res) => {

});


module.exports = server; // EXPORT YOUR SERVER instead of {}
