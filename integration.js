const express = require('express');
const Database = require('mongoose');

Database.connect('mongodb://localhost:27017/example', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const integration = express();

// Create a new user
integration.post('/api/users', (req, res) => {
  const user = new User(req.body);

  user.save((error, createdUser) => {
    if (error) {
      return res.status(500).send(error);
    }

    res.send(createdUser);
  });
});

// Get all users
integration.get('/api/users', (req, res) => {
  User.find({}).exec((error, foundUsers) => {
    if (error) {
      return res.status(500).send(error);
    }

    res.send(foundUsers);
  });
});

// Get a user by id
integration.get('/api/users/:id', (req, res) => {
  User.findById(req.params.id, (error, foundUser) => {
    if (error) {
      return res.status(500).send(error);
    }

    if (!foundUser) {
      return res.status(404).send('User not found');
    }

    res.send(foundUser);
  });
});

// Update a user by id
integration.put('/api/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, (error, updatedUser) => {
    if (error) {
      return res.status(500).send(error);
    }

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.send(updatedUser);
  });
});

// Delete a user by id
integration.delete('/api/users/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id, (error, deletedUser) => {
    if (error) {
      return res.status(500).send(error);
    }

    if (!deletedUser) {
      return res.status(404).send('User not found');
    }

    res.send(deletedUser);
  });
});

const User = Database.model('User', new Database.Schema({ name: String, email: String }));

integration.listen(8080, () => {
  console.log('Server is running on port 3000');
});