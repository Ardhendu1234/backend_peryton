const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productType: {
    type: String,
    enum: [
      'FPV Goggles',
      'Frames',
      'Light Controllers',
      'Receivers',
      'Transmitters',
      'VTX',
      'Cameras',
      'Antennas',
      'Propellers',
      'Motors',
    ],
    required: true,
  },
  imageUrls: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
},{timestamps:true});

export const Product = mongoose.model('Product', productSchema);

