const Category = require("../models/categoryModel");

// Crear una categoría
const createCategory = async (req, res) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: "El nombre de la categoría es requerido" });
    }
  
    try {
      // Verificar si la categoría ya existe
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ message: "La categoría ya existe" });
      }
  
      // Crear y guardar la nueva categoría
      const category = new Category({ name });
      await category.save();
  
      res.status(201).json({
        message: "Categoría creada exitosamente",
        category
      });
    } catch (error) {
      console.error("Error al crear la categoría:", error);
      res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
  };
  
  

// Obtener todas las categorías
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

// Obtener una categoría por ID
const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error("Error al obtener la categoría:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

// Actualizar una categoría
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    res.status(200).json({
      message: "Categoría actualizada",
      category,
    });
  } catch (error) {
    console.error("Error al actualizar la categoría:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

// Eliminar una categoría
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    res.status(200).json({ message: "Categoría eliminada" });
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
