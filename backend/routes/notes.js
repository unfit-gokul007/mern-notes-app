const express = require("express");
const multer = require("multer");
const Note = require("../models/Note");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
  ];
  cb(null, allowedTypes.includes(file.mimetype));
};

const upload = multer({ storage, fileFilter });

// Create Note
router.post("/", authMiddleware, upload.single("file"), async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = await Note.create({
      title,
      content,
      file: req.file ? req.file.path : null,
      user: req.user,
    });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Error creating note" });
  }
});

// Get Notes
router.get("/", authMiddleware, async (req, res) => {
  const notes = await Note.find({ user: req.user });
  res.json(notes);
});

// Update Note
router.put("/:id", authMiddleware, upload.single("file"), async (req, res) => {
  const updateData = {
  title: req.body.title,
  content: req.body.content,
};
if (req.file) {
  updateData.file = req.file.path;
}
const note = await Note.findOneAndUpdate(
  { _id: req.params.id, user: req.user },
  updateData,
  { new: true }
);
res.json(note);
});

// Delete Note
router.delete("/:id", authMiddleware, async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, user: req.user });
  res.json({ message: "Note deleted" });
});

module.exports = router;
