const Comment = require('../models/comments');
const Guest = require('../models/guest');
const Host = require('../models/host');

const index = (req, res) => {
    db.find({}, (err, foundComments) => {
        if (err) console.log(err)
        res.json(foundComments)
    });
}

const show = (req, res) => {
    db.findById(req.params.id, (err, foundComments) => {
        if (err) console.log('Error in games#show:', err);
        res.json(foundComments);
    });
};

/**
 * Create a comment that automatically pulls in writtenBy id and writtenAbout id.
 * 
 * Step 1: bring in the writtenBy ID (log)
 * Step 2: bring in the writtenAbout ID (log)
 * Step 3: use db.create to create a comment object that stores the ids.
 * Step 4: Check conditional logic 
 * 
 */
const create = (req, res) => {

    const { userId } = req.params
    const myId = req.user._id
    const { name } = req.user  
    const { isGuest, isHost, rating, comment } = req.body


    const userComment = await new Comment ({ 
        isGuest,
        isHost, 
        author: name,  
        rating,
        comment,
        writtenAbout: userId
    })

    let db = isGuest ? Guest : Host 
    const myProfile = await db.findOne({ userId: myId })
    myProfile.comment.push(userComment)
    myProfile.save()
    
    const bd = !isGuest ? Guest : Host 
    const otherProfile = await bd.findOne({ userId })
    otherProfile.comment.push(userComment)
    otherProfile.save()

    console.log(otherProfile)
    res.json(myProfile)
};

const update = (req, res) => {
    db.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updateComments) => {
        if (err) console.log('Error in games#update:', err);
        res.json(updateComments)
    });
};

const destroy = (req, res) => {
    db.findByIdAndDelete(req.params.id, (err, deletedComments) => {
        if (err) {
            console.log('Error in games#destroy:', err);
        } else {
            res.json(deletedComments)
        }
    });
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};