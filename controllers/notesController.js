const Note = require('../models/notesModel');

// POST
const createNote = async(req, res) => {

    try{
        const {title, description} = req.body;

        // Validate fields
        if(!title || !description){
            return res.status(400).json({ msg: "Title and Description are required" });
        }

        const note = await Note.create({
            title, 
            description,
            user: req.user._id,
        });

        res.status(200).json({ message : "Added new note", note});

    }catch(error){

        // Handle duplicate title error
        if (error.code === 11000) {
            return res.status(400).json({ msg: "Note title must be unique" });
        }
        
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

// GET
const getNotes = async(req, res) => {
    try{
        const note = await Note.find({ user: req.user._id});

        return res.status(200).json({message: "All notes fetched successfully", note});

    }catch(error){
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

// GET by id
const getNoteById = async(req, res) => {

    try{
        const note = await Note.findById(req.params.id);

        if(!note){
            return res.status(404).json({ msg: "Note not found" });
        }

        // Check ownership
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        return res.status(200).json({message: "Note found", note});

    }catch(error){
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

// DELETE
const deleteNote = async(req, res) => {

    try{
        const note = await Note.findById(req.params.id);

        if(!note){
            return res.status(400).json({message: "Note not found"});
        }

        if(note.user.toString() != req.user._id.toString()){
            return res.status(401).json({message: "Not authorized"});
        }

        await Note.deleteOne({_id: req.params.id});

        return res.status(200).json({message: "Note is deleted"});

    }catch(error){
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

// PUT
const updateNote = async(req, res) => {

    try{
        const {title, description} = req.body;
        
        // Validate fields
        if(!title || !description){
            return res.status(400).json({ msg: "Title and Description are required" });
        }

        const note = await Note.findById(req.params.id,);

        if (!note) {
            return res.status(404).json({ msg: "Note not found" });
        }

        // note.user : userID stored in the note
        // req.user._id : ID of currently logged-in user
        // To make sure the logged-in user is the owner of the note they’re trying to update
        if(note.user.toString() != req.user._id.toString()){
            return res.status(401).json({message: "Not Authorized"});
        }

        note.title = title;
        note.description = description;

        const updatedNote = await note.save();

        return res.status(200).json({message: "Note updated", updatedNote});

    }catch(error){
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    createNote,
    getNotes,
    deleteNote,
    getNoteById,
    updateNote
}