// IMPORTS
const express = require('express');
const users = require('./users/model');

// BUILD YOUR SERVER HERE
const server = express();
server.use(express.json());

// ✅ | POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
server.post('/api/users', async (req, res) => {
	console.log(req.body);
	try {
		const newUser = await users.insert(req.body);
		res.status(201).json(newUser);
	} catch (err) {
		res.status(500).json({message: 'Could not create user.'});
	};
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
		.then(returnedUser => {
			res.json(returnedUser);
		})
		.catch(() => {
			res.status(500).json({message: 'Could not find user.'});
		});
});

// ✅ | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
server.delete('/api/users/:id', (req, res) => {
	users.remove(req.params.id)
		.then(removedUser => {
			res.json(removedUser);
		})
		.catch(() => {
			res.status(500).json({message: 'Could not delete user.'});
		});
});

// ✅ | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |
server.put('/api/users/:id', async (req, res) => {
	try {
		const updatedUser = await users.update(req.params.id, req.body);
		if (updatedUser === null) {
			res.status(404).json({message: 'Could not find user.'});
			return;
		} else {
			res.json(updatedUser);
		}
	}
	catch(e) {
		res.status(500).json({message: 'Could not update user.'});
	}
});


module.exports = server; // EXPORT YOUR SERVER instead of {}
