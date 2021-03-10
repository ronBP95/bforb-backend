const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentsSchema = new Schema({
    isGuest: Boolean,
    user: String,
    createdAt: Date,
    rating: Number,
    author: String,
    writtenAbout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: String
})

const Comments = mongoose.model('Comments', commentsSchema)
module.exports = Comments