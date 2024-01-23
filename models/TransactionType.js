const BaseModel = require("./BaseModel");

class TransactionType extends BaseModel {
    constructor(db) {
        super(db, 'transaction_types');
    }
}

module.exports = TransactionType;