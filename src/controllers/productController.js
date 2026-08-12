const Product = require('../models/Product');

const PAGE_SIZE = 10;

async function createProduct(req, res) {
  try {
    const { name, category, price, quantity } = req.body;

    const product = await Product.create({
      name,
      category: category || '',
      price,
      quantity,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getProducts(req, res) {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const skip = (page - 1) * PAGE_SIZE;

    const [products, total] = await Promise.all([
      Product.find().sort({ createdAt: -1 }).skip(skip).limit(PAGE_SIZE),
      Product.countDocuments(),
    ]);

    res.json({
      page,
      pageSize: PAGE_SIZE,
      total,
      totalPages: Math.ceil(total / PAGE_SIZE) || 1,
      data: products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid product id' });
    }
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function updateProduct(req, res) {
  try {
    const { name, category, price, quantity } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, category: category || '', price, quantity },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid product id' });
    }
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid product id' });
    }
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
