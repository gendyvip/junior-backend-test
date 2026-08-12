const express = require('express');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { auth, requireAdmin } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { productRules } = require('../validators/productValidators');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

router.post('/', auth(), requireAdmin, productRules, validate, createProduct);
router.put('/:id', auth(), requireAdmin, productRules, validate, updateProduct);
router.delete('/:id', auth(), requireAdmin, deleteProduct);

module.exports = router;
