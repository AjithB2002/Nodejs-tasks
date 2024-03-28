const express = require('express');
const jsonweb = express();
const jwt = require('jsonwebtoken');


jsonweb.get('/api/authenticate', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  const user = {
    username: username,
    password: password
  };

  const token = jwt.sign('User', process.env.JWT_SECRET, {
    expiresIn: 3600 
  });

  res.send(token);
});


jsonweb.get('/api/protected', (req, res) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).send('No JWT token provided');
  }

  const payload = jwt.verify(header, process.env.JWT_SECRET);

  if (!payload) {
    return res.status(401).send('Invalid JWT token');
  }

  res.send(payload);
});

jsonweb.listen(8080, () => console.log('Listening on port 3000'));
