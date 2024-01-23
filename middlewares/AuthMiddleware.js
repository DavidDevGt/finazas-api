const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Autenticación fallida'
        });
    }
};

module.exports = authMiddleware;