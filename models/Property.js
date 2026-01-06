const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['apartment', 'house', 'commercial'],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rooms: Number,
    yearBuilt: Number,
    area: Number,

    // STATUSLAR
    status: {
      type: String,
      enum: ['active', 'hidden', 'deleted'],
      default: 'active',
    },

    // GOLD
    type: {
      type: String,
      enum: ['normal', 'gold'],
      default: 'normal',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Property', propertySchema)
