const BaseModel = require("./BaseModel");

class TransactionType extends BaseModel {
    constructor() {
        super('transaction_types');
    }
}

module.exports = TransactionType;