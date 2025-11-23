import Note from '../models/Note.js'

export async function getAllNotes (_, res) { //_ -> convention to name unused arguments
    try {
        const notes = await Note.find().sort({ createdAt: -1 }) //show newest first
        res.status(200).json(notes)
    } catch (error) {
        console.error("getAllNotes", error)
        res.status(500).send('Internal server error')
    }
}

export function createNote (req, res) {
    res.status(201).json({message: 'Note created successfully'})
}

export function updateNote (req, res) {
    res.status(200).json({message: 'Note updated successfully'})
}

export function deleteNote (req, res) {
    res.status(200).json({message: 'Note deleted successfully'})
}