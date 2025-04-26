const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  exchangeFor: {
    type: String,
    required: false,
    default: null,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  location: {
    type: String,
    required: true,
  },
  postedBy: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    validate: [arrayLimit, "Images cannot exceed 3"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  tradeType: {
    type: String,
    enum: ["Exchange", "Borrow", "Request"],
    default: "Exchange",
  },
});

function arrayLimit(val) {
  return val.length <= 3;
}

// Update the updatedAt field on save
ItemSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Item", ItemSchema);
