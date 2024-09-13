const express = require("express");
const {
  register,
  login,
  validateToken,
  getAllUsers,
  changeUserRole,
} = require("../controllers/authController");
const { getUserInfo } = require("../controllers/authController");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const { deleteUser } = require("../controllers/authController");
const { updateUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/validate", validateToken);
router.get("/user", getUserInfo);
router.patch("/change-role", changeUserRole);
router.get("/users", protect, isAdmin, getAllUsers);
router.delete("/users/:id", protect, isAdmin, deleteUser); 
router.patch("/update-user/:id", protect, isAdmin, updateUser);


module.exports = router;
