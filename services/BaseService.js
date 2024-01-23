class BaseService {
    constructor(model) {
        this.model = model;
    }

    async dbQuery(sql, params) {
        try {
            return await this.model.dbQuery(sql, params);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BaseService;
