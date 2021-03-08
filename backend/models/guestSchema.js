import mongoose from 'mongoose';
import commentsSchema from './commentsSchema'
const { Schema } = mongoose;


const guestSchema = new Schema({
    numberOfStays: Number,
    rating: Number,
    wantsToMake: String,
    comments: [commentsSchema]
})

const Guest = mongoose.model('Guest', guestSchema)
module.exports = Guest