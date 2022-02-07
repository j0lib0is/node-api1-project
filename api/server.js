// IMPORTS
const express = require('express');
const users = require('./users/model');

// BUILD YOUR SERVER HERE
const server = express();
server.use(express.json());

// ✅ | POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
server.post('/api/users', async (req, res) => {
	if (!req.body.name || !req.body.bio) {
		res.status(400).json({message: 'Please provide name and bio for the user'});
	} else {
		try {
			const newUser = await users.insert(req.body);
			res.status(201).json(newUser);
		} catch (err) {
			res.status(500).json({message: 'There was an error while saving the user to the database'});
		};
	};
});

// ✅ | GET    | /api/users     | Returns an array users.                                                                                |
server.get('/api/users', (req, res) => {
	users.find()
		.then(users => {
			res.json(users);
		})
		.catch((err) => {
			res.status(500).json({message: 'The users information could not be retrieved'});
		});
});

// ✅ | GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |
server.get('/api/users/:id', async (req, res) => {
	try {
		const searchedUser = await users.findById(req.params.id);

		if (searchedUser == null) {
			res.status(404).json({message: 'The user with the specified ID does not exist'});
		} else {
			res.json(searchedUser);
		}
	} catch(err) {
		res.status(500).json({message: 'The user information could not be retrieved'});
	};
});

// ✅ | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
server.delete('/api/users/:id', (req, res) => {
	users.remove(req.params.id)
		.then(removedUser => {
			if (removedUser === null) {
				res.status(404).json({message: 'The user with the specified ID does not exist'});
			} else {
				res.json(removedUser);
			}
		})
		.catch((err) => {
			res.status(500).json({message: 'The user could not be removed'});
		});
});

// ✅ | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |
server.put('/api/users/:id', async (req, res) => {
	if (!req.body.name || !req.body.bio) {
		res.status(400).json({message: 'Please provide name and bio for the user'});
	} else {
		try {
			const updatedUser = await users.update(req.params.id, req.body);
			if (updatedUser === null) {
				res.status(404).json({message: 'The user with the specified ID does not exist'});
			} else {
				res.json(updatedUser);
			}
		} catch(err) {
			res.status(500).json({message: 'The user information could not be modified'});
		}
	};
});


module.exports = server; // EXPORT YOUR SERVER instead of {}
