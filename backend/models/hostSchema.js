const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentsSchema = require('./commentsSchema').schema
const placesToStaySchema = require('./placesToStaySchema').schema

const hostSchema = new Schema({
    location: String,
    numberOfGuests: Number,
    rating: Number,
    placeOffered: [commentsSchema],
    wantsForBreakfast: String,
    comments: [placesToStaySchema]
})


const Host = mongoose.model('Host', hostSchema)
module.exports = Host