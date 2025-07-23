const express = require('express');
const router = express.Router();
const {createNote, getNotes, deleteNote, getNoteById, updateNote} = require('../controllers/notesController');
const {protect} = require('../middleware/authMiddleware');

router.post("/", protect, createNote);

router.get("/", protect, getNotes);

router.delete("/:id", protect, deleteNote);

router.get("/:id", protect, getNoteById);

router.put("/:id", protect, updateNote);

module.exports = router;