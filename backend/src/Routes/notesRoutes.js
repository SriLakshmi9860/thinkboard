import express from "express";

import {
    createNote,
    deleteNote,
    getAllNotes,
    getNoteById,
    updateNote
} from "../controllers/notesControllers.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllNotes);
router.get("/:id", authMiddleware, getNoteById);

router.post("/", authMiddleware, createNote);
router.put("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);

export default router;