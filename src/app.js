const express = require('express');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Product Inventory API' });
});

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong' });
});

module.exports = app;
