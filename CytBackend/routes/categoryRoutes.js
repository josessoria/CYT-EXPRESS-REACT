const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController"); // Asegúrate de ajustar la ruta al archivo correcto

// Crear una categoría
router.post("/", createCategory);

// Obtener todas las categorías
router.get("/", getCategories);

// Obtener una categoría por ID
router.get("/:id", getCategoryById);

// Actualizar una categoría
router.put("/:id", updateCategory);

// Eliminar una categoría
router.delete("/:id", deleteCategory);

module.exports = router;
