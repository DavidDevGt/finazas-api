const BaseController = require("./BaseController");
const EncryptService = require("../services/EncryptService");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

class UserController extends BaseController {
  constructor() {
    super(new User());
  }

  async register(req, res) {
    try {
      const hashedPassword = await EncryptService.hashPassword(
        req.body.password
      );
      const user = {
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
      };
      const data = await this.model.create(user);
      // Aquí va la lógica para generar y enviar el código de verificación por correo
      res.status(201).json(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async login(req, res) {
    try {
      const user = await this.model.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ message: "Autenticación fallida" });
      }

      const isValidPassword = await EncryptService.comparePassword(
        req.body.password,
        user.password
      );
      if (!isValidPassword) {
        return res.status(401).json({ message: "Autenticación fallida" });
      }

      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.json({ token: token, userId: user.id });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  sendVerificationCode(email) {
    // TODO: Implementar lo de generar y enviar el código de verificación
  }

  logout(req, res) {
    res.json({
      message:
        "Cierre de sesión exitoso. Por favor, elimine el token del lado del cliente.",
    });
  }
}

module.exports = UserController;
