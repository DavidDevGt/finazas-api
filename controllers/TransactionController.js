const BaseController = require("./BaseController");
const Transaction = require("../models/Transaction");

class TransactionController extends BaseController {
    constructor() {
        super(new Transaction());
    }
}

module.exports = TransactionController;