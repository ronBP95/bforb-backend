import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentsSchema = new Schema({
    user: String,
    createdAt: Date,
    rating: Number,
    comment: String
})


const Comments = mongoose.model('Comments', commentsSchema)
module.exports = Comments