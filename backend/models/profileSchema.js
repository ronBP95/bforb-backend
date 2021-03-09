const mongoose = require('mongoose')
const Schema = mongoose.Schema
const guestSchema = require('./guest').schema
const hostSchema = require('./hostSchema').schema

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