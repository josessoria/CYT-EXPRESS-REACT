const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Importar CORS
const connectDB = require("./config/database");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());

// Permitir todos los orígenes
app.use(cors());

// Rutas
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));

app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
