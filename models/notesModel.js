const mongoose = require('mongoose');

// Schema
const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    // It connects your document to the User collection, so you can link and fetch user details easily.
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{ timestamps: true});

// Model
const Note = mongoose.model("Note",notesSchema); // collection name: notes

module.exports = Note;