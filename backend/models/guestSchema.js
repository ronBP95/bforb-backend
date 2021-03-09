const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentsSchema = require('./commentsSchema').schema

const guestSchema = new Schema({
    numberOfStays: Number,
    rating: Number,
    wantsToMake: String,
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comments'}]
})

const Guest = mongoose.model('Guest', guestSchema)
module.exports = Guest