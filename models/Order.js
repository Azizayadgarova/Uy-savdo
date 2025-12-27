const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['kutilmoqda', 'yig‘ilmoqda', 'yetkazilmoqda', 'yetkazib berildi'],
      default: 'kutilmoqda',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)
