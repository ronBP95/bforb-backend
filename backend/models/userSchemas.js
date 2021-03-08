import mongoose from 'mongoose';
const { Schema } = mongoose;
import guestSchema from './guestSchema'
import hostSchema from './hostSchema'

const userSchema = new Schema({
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

const User = mongoose.model('User', userSchema)
module.exports = User