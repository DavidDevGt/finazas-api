const BaseModel = require("./BaseModel");

class SavingsGoal extends BaseModel {
    constructor() {
        super('savings_goals');
    }

    // Métodos específicos para SavingsGoal
    findByUserId(userId) {
        return this.db.query(`SELECT * FROM ${this.tableName} WHERE user_id = ?`, [userId]);
    }

    findByUserIdAndDate(userId, date) {
        return this.db.query(`SELECT * FROM ${this.tableName} WHERE user_id = ? AND date = ?`, [userId, date]);
    }
}

module.exports = SavingsGoal;