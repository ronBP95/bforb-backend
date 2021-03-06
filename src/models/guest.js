const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentsSchema = require('./comments').schema

const guestSchema = new Schema({
    numberOfStays: Number,
    wantsToMake: String,
    comments: [commentsSchema]
})

const Guest = mongoose.model('Guest', guestSchema)
module.exports = Guest