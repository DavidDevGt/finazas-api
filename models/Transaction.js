const BaseModel = require("./BaseModel");

class Transaction extends BaseModel {
    constructor() {
        super('transactions');
    }

    findByUserId(userId) {
        return this.db.query(`SELECT * FROM ${this.tableName} WHERE user_id = ?`, [userId]);
    }

    findByUserIdAndDateRange(userId, startDate, endDate) {
        return this.db.query(`SELECT * FROM ${this.tableName} WHERE user_id = ? AND date BETWEEN ? AND ?`, [userId, startDate, endDate]);
    }

    findByUserIdAndTransactionType(userId, transactionType) {
        return this.db.query(`SELECT * FROM ${this.tableName} WHERE user_id = ? AND transaction_type = ?`, [userId, transactionType]);
    }

    findByUserIdAndCategory(userId, category) {
        return this.db.query(`SELECT * FROM ${this.tableName} WHERE user_id = ? AND category = ?`, [userId, category]);
    }
}

module.exports = Transaction;