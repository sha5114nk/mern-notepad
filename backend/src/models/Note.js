import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true
        }
    }, 
    { timestamps: true } //gives createdAt, updatedAt
)

const Note = mongoose.model('Note', noteSchema)

export default Note