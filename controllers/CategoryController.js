const BaseController = require("./BaseController");
const Category = require("../models/Category");

class CategoryController extends BaseController {
    constructor() {
        super(new Category());
    }
}

module.exports = CategoryController;