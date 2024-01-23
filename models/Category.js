const BaseModel = require("./BaseModel");

class Category extends BaseModel {
  constructor(db) {
    super(db, 'categories');
  }
}

module.exports = Category;
