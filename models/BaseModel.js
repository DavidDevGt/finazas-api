class BaseModel {
    constructor(db, tableName) {
        this.db = db;
        this.tableName = tableName;
    }

    findAll() {
        return this.db.query(`SELECT * FROM ${this.tableName}`);
    }

    findById(id) {
        return this.db.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
    }
}