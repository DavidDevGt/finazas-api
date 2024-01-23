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

    findOne(conditions = {}, fields = '*') {
        const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
        const values = Object.values(conditions);
        return this.db.query(`SELECT ${fields} FROM ${this.tableName} WHERE ${whereClause}`, values);
    }

    create(data) {
        const keys = Object.keys(data);
        const values = Object.values(conditions);
        const placeholders = keys.map(key => '?').join(', ');
        return this.db.query(`INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${placeholders})`, values);
    }

    update(id, data) {
        const updates = Object.keys(data).map(key => `${key} = ?`).join(', ');
        const values = [...Object.values(data), id];
        return this.db.query(`UPDATE ${this.tableName} SET ${updates} WHERE id = ?`, values);
    }

    delete(id) {
        return this.db.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
    }

    // Método para realizar búsquedas complejas, si es necesario
    dbQuery(sql, params) {
        return this.db.query(sql, params);
    }
}