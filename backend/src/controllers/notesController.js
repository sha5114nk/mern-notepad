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

export async function getNoteById (req, res) {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(404).json({ message: 'Note not found' })
        res.status(200).json(note)
    } catch (error) {
        console.error("getNoteById", error)
        res.status(500).send('Internal server error')
    }
}

export async function createNote (req, res) {
    try {
        const { title, content } = req.body
        const note = new Note({title, content})
        const savedNote = await note.save()
        res.status(201).json(savedNote)
    } catch (error) {
        console.error('createNote', error)
        res.status(500).send('Error creating note')
    }
}

export async function updateNote (req, res) {
    try {
        const { title, content } = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true })
        if (!updatedNote) return res.status(400).json({ message: 'Note not found' })
        res.status(200).json(updatedNote)
    } catch (error) {
        console.error('updateNote', error)
        res.status(500).send('Error updating note')
    }
}

export async function deleteNote (req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if (!deletedNote) return res.status(404).json({ message: 'Note not found' })
        res.status(200).json(deletedNote)
    } catch (error) {
        console.error('deleteNote', error)
        res.status(500).send('Error deleting note')
    }
}