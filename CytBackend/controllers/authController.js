const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateToken = (req, res) => {
  // Obtener el token del encabezado de autorización
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    // Verificar el token con la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Si el token es válido, enviar una respuesta exitosa
    res.status(200).json({ message: "Token válido", decoded });
  } catch (error) {
    // Si el token no es válido o ha expirado, devolver un error
    res.status(401).json({ message: "Token no válido", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Obtener todos los usuarios
    const users = await User.find().select("-password"); // Excluir la contraseña del resultado
    res.status(200).json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

// Obtener la información del usuario basado en el token
const getUserInfo = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Buscar el usuario en la base de datos
    const user = await User.findById(userId).select("-password"); // Excluir la contraseña del resultado

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Devolver la información del usuario
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: "Token no válido", error: error.message });
  }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Comprobar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está en uso" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generar el token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    // Devolver el usuario creado sin la contraseña y el token
    res.status(201).json({
      message: "Usuario registrado",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

// Inicio de sesión
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Generar el token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

const changeUserRole = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { newRole } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  if (!["user", "admin"].includes(newRole)) {
    return res.status(400).json({ message: "Rol inválido" });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Buscar al usuario en la base de datos
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar el rol del usuario
    user.role = newRole;
    await user.save();

    // Devolver el usuario actualizado sin la contraseña
    res.status(200).json({
      message: "Rol actualizado",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(401).json({ message: "Token no válido", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar y eliminar el usuario en la base de datos
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar los campos del usuario si están presentes en la solicitud
    if (username) user.username = username;
    if (email) user.email = email;
    if (role) {
      if (!["user", "admin"].includes(role)) {
        return res.status(400).json({ message: "Rol inválido" });
      }
      user.role = role;
    }

    // Guardar los cambios
    await user.save();

    // Devolver el usuario actualizado sin la contraseña
    res.status(200).json({
      message: "Usuario actualizado",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

module.exports = {
  register,
  login,
  validateToken,
  getUserInfo,
  changeUserRole,
  getAllUsers,
  deleteUser,
  updateUser,
};
