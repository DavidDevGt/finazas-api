class BaseController {
  constructor(model) {
    this.model = model;
  }

  async getAll(req, res) {
    try {
      const data = await this.model.findAll();
      res.json(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getOne(req, res) {
    try {
      const data = await this.model.findById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
