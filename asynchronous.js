const express = require('express');
const asynchronous = express();

asynchronous.use(express.json());

const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};


asynchronous.get('/async/parallel', async (req, res) => {
  try {
    const tasks = [sleep(1000), sleep(2000), sleep(3000)];


    await Promise.all(tasks);

    res.send('Completed parallel tasks...');
  } catch (error) {
    console.error('Error:', error);


    res.status(500).send('Something went wrong.');
  }
});


asynchronous.get('/async/sequential', async (req, res) => {
  try {
    const start = new Date().getTime();

    await sleep(1000);
    console.log('Task 1 completed:', (new Date().getTime() - start) + 'ms');

    await sleep(2000);
    console.log('Task 2 completed:', (new Date().getTime() - start) + 'ms');

    await sleep(3000);
    console.log('Task 3 completed:', (new Date().getTime() - start) + 'ms');

    res.send('Completed sequential tasks...');
  } catch (error) {
    console.error('Error:', error);

    res.status(500).send('Something went wrong.');
  }
});

const tasks = [sleep(1000), sleep(2000), sleep(3000)];

await Promise.all(tasks);

asynchronous.listen(8080, () => {
  console.log('Server is running on port 3000');
});