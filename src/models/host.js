const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentsSchema = require('./comments').schema
const placesToStaySchema = require('./placesToStay').schema

const hostSchema = new Schema({
    location: String,
    numberOfGuests: Number,
    wantsForBreakfast: String,
    placesToStay: [placesToStaySchema],
    comments: [commentsSchema]
})


const Host = mongoose.model('Host', hostSchema)
module.exports = Host