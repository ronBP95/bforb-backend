const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentsSchema = new Schema({
    user: String,
    createdAt: Date,
    rating: Number,
    writtenBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Profile'
    },
    writtenAbout: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    comment: String
})


const Comments = mongoose.model('Comments', commentsSchema)
module.exports = Comments