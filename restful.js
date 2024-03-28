const express = require('express');
const restful = express();

const products = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  { id: 3, name: 'Product 3', price: 30 }
];

restful.get('/products', (req, res) => {
  res.send(products);
});

restful.post('/products', (req, res) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  };
  products.push(product);
  res.send(product);
});

restful.put('/products/:id', (req, res) => {
  const productId = req.params.id;
  const updatedProduct = {
    name: req.body.name,
    price: req.body.price
  };
  const index = products.findIndex(p => p.id === productId);
  if (index >= 0) {
    products[index] = updatedProduct;
  } else {
    return res.status(404).send('Product not found');
  }
  res.send(updatedProduct);
});

restful.delete('/products/:id', (req, res) => {
  const productId = req.params.id;
  const index = products.findIndex(p => p.id === productId);
  if (index < 0) {
    return res.status(404).send('Product not found');
  }
  products.splice(index, 1);
  res.send(products);
});

restful.listen(8080, () => console.log('Listening on port 3000'));
