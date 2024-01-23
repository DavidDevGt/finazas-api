const BaseController = require("./BaseController");
const User = require("../models/User");

class UserController extends BaseController {
    constructor() {
        super(new User());
    }
}

module.exports = UserController;