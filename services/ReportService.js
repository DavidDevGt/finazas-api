const BaseService = require("./BaseService");

class ReportService extends BaseService {
  constructor(model) {
    super(model);
  }

  async getUserTransactionsSummary() {
    const sql = `SELECT * FROM user_transactions_summary`;
    return this.dbQuery(sql, []);
  }

  async getMonthlyExpenses() {
    const sql = `SELECT * FROM monthly_expenses`;
    return this.dbQuery(sql, []);
  }

  async getCategoryTrends() {
    const sql = `SELECT * FROM category_trends`;
    return this.dbQuery(sql, []);
  }
}

module.exports = ReportService;
