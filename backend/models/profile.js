const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hostSchema = require('./host').schema
const guestSchema = require('./guest').schema

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
    host: [hostSchema]
})

const Profile = mongoose.model('Profile', profileSchema)
module.exports = Profile