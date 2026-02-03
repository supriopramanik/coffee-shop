import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';
import Admin from '../models/Admin.js';

dotenv.config();

const products = [
  {
    name: 'Double Shot Espresso Pouch',
    description: 'Ready-to-drink premium Arabica espresso pouch. No sugar.',
    price: 249,
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1400',
  },
  {
    name: 'Cold Brew Concentrate',
    description: 'Smooth 12-hour steeped cold brew concentrate.',
    price: 299,
    imageUrl: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=1400',
  },
  {
    name: 'Hazelnut Espresso Pouch',
    description: 'Subtle hazelnut aroma with rich espresso.',
    price: 269,
    imageUrl: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=1400',
  }
];

const run = async () => {
  try {
    await connectDB();
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(products);
      console.log('Seeded demo products');
    } else {
      console.log('Products already exist, skipping');
    }

    const adminExists = await Admin.findOne({ email: 'admin@drinkin.global' });
    if (!adminExists) {
      await Admin.create({ name: 'Admin', email: 'admin@drinkin.global', password: 'Admin@123' });
      console.log('Created default admin (admin@drinkin.global / Admin@123) in admins collection');
    }
    await mongoose.connection.close();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

run();
