const mongoose = require('mongoose')
const Schema = mongoose.Schema
const guestSchema = require('./guestSchema').schema
const hostSchema = require('./hostSchema').schema

const profileSchema = new Schema({
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