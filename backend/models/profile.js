const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hostSchema = require('./host').schema

const guestSchema = new Schema({
    numberOfStays: Number,
    rating: Number,
    wantsToMake: String,
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comments'}]
})

const profileSchema = new Schema({
    userId: String, 
    name: String,
    userPhoto: String,
    locations: String,
    aboutMe: String,
    whyTravel: String,
    favBreakfast: String,
    memberSince: Date,
    isGuest: Boolean,
    isHost: Boolean,
    guest: [guestSchema],
    host: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Host'
    } 
})

const Profile = mongoose.model('Profile', profileSchema)
module.exports = Profile