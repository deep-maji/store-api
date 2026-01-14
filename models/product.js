const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'product name must me provided']
  },
  price: {
    type: Number,
    required: [true, 'product price must me provided']
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  company: {
    type: String,
    enum: {
      values: ['ikea', 'liddy', 'caressa', 'marcos'],
      message: '{value} is not supported',
    }
    // enum: ['ikea', 'liddy', 'caressa', 'marcos']
  }
}, {
  timestamps: true
});

const Products = mongoose.model("Product", productSchema);

module.exports = Products;