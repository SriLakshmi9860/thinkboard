import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find({ userId: req.userId })
            .sort({ createdAt: -1 });

        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotesController", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            userId: req.userId,
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found!",
            });
        }

        res.json(note);

    } catch (error) {
        console.error("Error in getNoteById controller", error);

        res.status(500).json({
            message: "Internal server error",
        });
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;

        const note = await Note.create({
            title,
            content,
            userId: req.userId,
        });

        res.status(201).json(note);
    } catch (error) {
        console.error("Error in createNoteController", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;

        const note = await Note.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.userId,
            },
            {
                title,
                content,
            },
            {
                new: true,
            }
        );

        if (!note) {
            return res.status(404).json({
                message: "Note not found!",
            });
        }

        res.status(200).json(note);

    } catch (error) {
        console.error("Error in updateNote controller", error);

        res.status(500).json({
            message: "Internal server error",
        });
    }
}

export async function deleteNote(req, res) {
    try {
        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId,
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found!",
            });
        }

        res.status(200).json({
            message: "Note deleted successfully",
        });

    } catch (error) {
        console.error("Error in deleteNote controller", error);

        res.status(500).json({
            message: "Internal server error",
        });
    }
}