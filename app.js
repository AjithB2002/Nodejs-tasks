const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to my Express.js application!');
});

app.post('/', (req, res) => {
    res.send(' posted to /');
});

app.listen(8080, () => console.log('Listening on port 3000'));
