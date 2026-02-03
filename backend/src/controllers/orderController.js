import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, phone } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  const populated = await Promise.all(
    items.map(async (i) => {
      const p = await Product.findById(i.product);
      if (!p) throw new Error('Product not found');
      return { product: p._id, name: p.name, imageUrl: p.imageUrl, price: p.price, qty: i.qty || 1 };
    })
  );
  const total = populated.reduce((sum, i) => sum + i.price * i.qty, 0);
  const order = await Order.create({
    user: req.user._id,
    shippingAddress: shippingAddress || req.user.address || '',
    phone: phone || req.user.phone || '',
    items: populated,
    total
  });
  res.status(201).json(order);
});

export const myOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate('items.product', 'imageUrl')
    .sort('-createdAt');
  res.json(orders);
});

export const allOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate('user')
    .populate('items.product', 'imageUrl')
    .sort('-createdAt');
  res.json(orders);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await Order.findById(id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  const allowed = ['Pending','Preparing','Completed','Cancelled'];
  if (status && !allowed.includes(status)) {
    res.status(400);
    throw new Error('Invalid status');
  }
  order.status = status || order.status;
  await order.save();
  res.json(order);
});
