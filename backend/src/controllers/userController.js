import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Order from '../models/Order.js';

export const listUsers = asyncHandler(async (req, res) => {
  // Only return non-admin users so admin accounts are not shown in the customers list
  const docs = await User.find({ isAdmin: false }).select('name email phone address isAdmin createdAt');
  const users = docs.map(u => ({
    _id: u._id,
    name: u.name,
    email: u.email,
    phone: u.phone || '',
    address: u.address || '',
    isAdmin: u.isAdmin,
    createdAt: u.createdAt
  }));
  res.json(users);
});

export const userOrders = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const orders = await Order.find({ user: id })
    .populate('items.product', 'imageUrl')
    .sort('-createdAt');
  res.json(orders);
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('+password');
  if(!user){ res.status(404); throw new Error('User not found'); }
  const { name, phone, address, currentPassword, newPassword } = req.body;
  if(name !== undefined) user.name = name;
  if(phone !== undefined) user.phone = phone;
  if(address !== undefined) user.address = address;
  if(newPassword){
    if(!currentPassword){ res.status(400); throw new Error('Current password required'); }
    const ok = await user.matchPassword(currentPassword);
    if(!ok){ res.status(401); throw new Error('Current password is incorrect'); }
    user.password = newPassword;
  }
  await user.save();
  res.json({ _id:user._id, name:user.name, email:user.email, phone:user.phone||'', address:user.address||'', isAdmin:user.isAdmin });
});
