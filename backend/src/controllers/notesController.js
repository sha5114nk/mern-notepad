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

}

export function deleteNote (req, res) {
    res.status(200).json({message: 'Note deleted successfully'})
}