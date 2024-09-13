const express = require("express");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, createProduct).get(getProducts);
router.route("/:id").put(protect, updateProduct).delete(protect, deleteProduct);

module.exports = router;
