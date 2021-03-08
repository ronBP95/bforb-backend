import mongoose from 'mongoose';
const { Schema } = mongoose;

const placesToStaySchema = new Schema({
    location: String,
    bedPhoto: String,
    description: String,
    rating: Number
})


const Places = mongoose.model('Places', placesToStaySchema)
module.exports = Places