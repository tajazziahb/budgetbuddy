const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({ // create scheme for bill collection

    userId: String,
    name: String,            // 'Rent'
    amount: Number,
    category: String,        // 'housing'
    dueDay: Number,          // 1..31
    autopay: Boolean,
    lastPaidAt: Date | null,   // track last paid instance
    createdAt: Date,
    updatedAt: Date

}, { timestamps: true });

module.exports = mongoose.model('Bill', BillSchema);