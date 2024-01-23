const BaseModel = require("./BaseModel");

class Transaction extends BaseModel {
    constructor(db) {
        super(db, 'transactions');
    }

    findByUserId(userId) {
        return this.db.query(`SELECT * FROM ${this.tableName} WHERE user_id = ?`, [userId]);
    }

    findByUserIdAndDateRange(userId, startDate, endDate) {
        return this.db.query(`SELECT * FROM ${this.tableName} WHERE user_id = ? AND date BETWEEN ? AND ?`, [userId, startDate, endDate]);
    }
}

module.exports = Transaction;