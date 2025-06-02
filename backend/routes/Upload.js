const express = require("express");
const multer = require("multer");
const router = express.Router();

// Using memory storage for demo; you can switch to disk or cloud
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    // For testing: return dummy URL
    const dummyUrl = `http://localhost:8000/uploads/${req.file.originalname}`;

    res.status(200).json({ imageUrl: dummyUrl });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

module.exports = router;
