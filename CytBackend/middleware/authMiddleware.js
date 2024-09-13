const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Asegúrate de que la ruta al modelo es correcta


const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "No autorizado, token no encontrado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token no válido" });
  }
};

const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.userId;

    // Buscar el usuario en la base de datos
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar el rol del usuario
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Acceso denegado, se requiere rol de administrador" });
    }

    // Continuar con la solicitud
    next();
  } catch (error) {
    res.status(401).json({ message: "Token no válido", error: error.message });
  }
};

module.exports = { protect, isAdmin };
