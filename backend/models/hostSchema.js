const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentsSchema = require('./commentsSchema')

const hostSchema = new Schema({
    location: String,
    numberOfGuests: Number,
    rating: Number,
    placeOffered: [placesToStaySchema],
    wantsForBreakfast: String,
    comments: [commentsSchema]
})


const Host = mongoose.model('Host', hostSchema)
module.exports = Host