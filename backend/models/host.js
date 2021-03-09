const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentsSchema = require('./comments').schema
const placesToStaySchema = require('./placesToStay').schema

const hostSchema = new Schema({
    location: String,
    numberOfGuests: Number,
    rating: Number,
    placeOffered: [{type: mongoose.Schema.Types.ObjectId, ref: 'Places'}],
    wantsForBreakfast: String,
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comments'}]
})


const Host = mongoose.model('Host', hostSchema)
module.exports = Host