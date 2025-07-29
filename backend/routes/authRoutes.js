const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserInfo,
  updateUser,
} = require("../controller/authController");
const { protect } = require("../middleware/authMiddleware");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const fileName = file.originalname
      .replace(/\s+/g, "_")
      .replace(/[()]/g, "");
    cb(null, `${Date.now()}_${fileName}`);
  },
});

const upload = multer({ storage });

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", protect, getUserInfo);
router.put("/v1/user/update-user", protect, updateUser);
router.post("/v1/user/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No image provided" });
  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

module.exports = router;
