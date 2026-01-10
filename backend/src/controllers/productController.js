import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

// Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isActive: true }).sort('-createdAt');
  res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

// Admin
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, imageUrl, isActive } = req.body;
  const product = await Product.create({ name, description, price, imageUrl, isActive });
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  await product.deleteOne();
  res.json({ message: 'Product removed' });
});
