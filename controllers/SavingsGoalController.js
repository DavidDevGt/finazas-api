const BaseController = require("./BaseController");
const SavingsGoal = require("../models/SavingsGoal");

class SavingsGoalController extends BaseController {
    constructor() {
        super(new SavingsGoal());
    }
}

module.exports = SavingsGoalController;