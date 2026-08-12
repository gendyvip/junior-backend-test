const { body } = require('express-validator');

const productRules = [
  body('name')
    .exists({ checkFalsy: true })
    .withMessage('name is required')
    .isString()
    .withMessage('name must be a string')
    .trim()
    .notEmpty()
    .withMessage('name cannot be empty'),

  body('category')
    .optional({ nullable: true })
    .isString()
    .withMessage('category must be a string')
    .trim(),

  body('price')
    .exists({ checkNull: true })
    .withMessage('price is required')
    .isFloat({ gt: 0 })
    .withMessage('price must be a positive number')
    .toFloat(),

  body('quantity')
    .exists({ checkNull: true })
    .withMessage('quantity is required')
    .isInt({ min: 0 })
    .withMessage('quantity must be a non-negative integer')
    .toInt(),
];

module.exports = { productRules };
