const BaseModel = require("./BaseModel");

class DiaryEntry extends BaseModel {
    constructor(db) {
        super(db, 'diary_entries');
    }

    findByUserId(userId) {
        return this.db.query(`SELECT * FROM ${this.tableName} WHERE user_id = ?`, [userId]);
    }

    findByUserIdAndDateRange(userId, startDate, endDate) {
        return this.db.query(`SELECT * FROM ${this.tableName} WHERE user_id = ? AND date BETWEEN ? AND ?`, [userId, startDate, endDate]);
    }

    findByUserIdAndDate(userId, date) {
        return this.db.query(`SELECT * FROM ${this.tableName} WHERE user_id = ? AND date = ?`, [userId, date]);
    }

    // Search for title in real time
    findByUserIdAndTitle(userId, title) {
        return this.db.query(`SELECT * FROM ${this.tableName} WHERE user_id = ? AND title LIKE ?`, [userId, title]);
    }
    
}

module.exports = DiaryEntry;