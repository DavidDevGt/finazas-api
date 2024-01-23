const BaseModel = require("./BaseModel");

class Category extends BaseModel {
  constructor() {
    super('categories');
  }
}

module.exports = Category;
