const BaseController = require("./BaseController");
const TransactionType = require("../models/TransactionType");

class TransactionTypeController extends BaseController {
    constructor() {
        super(new TransactionType());
    }
}

module.exports = TransactionTypeController;