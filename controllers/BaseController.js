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

  async create(req, res) {
    try {
      const data = await this.model.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async update(req, res) {
    try {
      await this.model.update(req.params.id, req.body);
      res.status(200).send("Registro actualizado con éxito");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async delete(req, res) {
    try {
      await this.model.delete(req.params.id);
      res.status(200).send("Registro eliminado con éxito");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  // Método para búsquedas personalizadas, si es necesario
  async query(req, res) {
    try {
      const data = await this.model.dbQuery(req.query.sql, req.query.params);
      res.json(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
