const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname
      .replace(/\s+/g, "_")
      .replace(/[()]/g, "");
    const finalName = `${Date.now()}_${fileName}`;
    cb(null, finalName);
  },
});

const upload = multer({ storage });

// console.log(upload)

router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    const imageUrl = `/uploads/${req.file.filename}`; // this is relative to your static path
    res.status(200).json({ imageUrl }); // return relative path, not full host
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

module.exports = router;
