const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    // Validar datos de entrada
    if (!name || !price || !description || !category) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    // Crear un nuevo producto
    const product = new Product({
      name,
      price,
      description,
      category,
    });

    // Guardar el producto en la base de datos
    await product.save();

    // Recuperar el producto con la categoría poblada
    const populatedProduct = await Product.findById(product._id).populate(
      "category"
    );

    // Enviar una respuesta con el producto creado y la categoría poblada
    res.status(201).json(populatedProduct);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al crear el producto", error: error.message });
  }
};

const getProducts = async (req, res) => {
  const products = await Product.find().populate("category"); // Incluye los detalles de la categoría
  res.json(products);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  res.json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.status(204).end();
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
