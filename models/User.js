const BaseModel = require("./BaseModel");

class User extends BaseModel {
    constructor(db) {
        super(db, 'users');
    }
}

module.exports = User;