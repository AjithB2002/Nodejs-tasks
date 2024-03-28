const express = require('express');
const errorhandle = express();

errorhandle.use(express.json());


errorhandle.use((err, req, res, next) => {
  console.error('Error:', err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).send({
    error: {
      message: err.message.replace(/(E\d{3})/g, '{code}'),
    },
  });
});


errorhandle.get('/', (req, res) => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  res.send(user);
});


errorhandle.listen(8080, () => {
  console.log('Server is running on port 3000');
});

const fakeAsyncFunction = () => {
  throw new Error('Something went wrong.');
};

try {
    fakeAsyncFunction();
  } catch (error) {
    next(error);
  }