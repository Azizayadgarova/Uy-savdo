// models/Order.js
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
	{
		customerName: String,
		phone: String,
		orderNumber: { type: String, unique: true },
		totalPrice: Number,

		paymentType: {
			type: String,
			enum: ['click', 'payme'],
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
