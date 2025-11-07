const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({ // create scheme for transactions collection

    userId: String,
    amount: Number,          // positive
    type: 'income' | 'expense',
    category: String,        // 'rent','groceries','paycheck', etc.
    date: Date,              // stored in UTC
    note: String,
    status: 'pending' | 'cleared',
    account: String,         // optional: 'checking', 'cash'
    createdAt: Date,
    updatedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);