import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: String,
    imageUrl: String,
    price: Number,
    qty: { type: Number, default: 1 }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Preparing', 'Completed', 'Cancelled'], default: 'Pending' }
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
