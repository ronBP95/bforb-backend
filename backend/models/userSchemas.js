import mongoose from 'mongoose';
const { Schema } = mongoose;
import guestSchema from './models/guestSchema'
import hostSchema from './models/hostSchema'

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


