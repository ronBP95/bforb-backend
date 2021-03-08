const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentsSchema = new Schema({
    user: String,
    createdAt: Date,
    rating: Number,
    comment: String
})


const Comments = mongoose.model('Comments', commentsSchema)
module.exports = Comments