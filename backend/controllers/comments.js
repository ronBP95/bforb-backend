const Comment = require('../models/comments');
// const Guest = require('../models/guest');
// const Host = require('../models/host');
const Profile = require('../models/profile');

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
const create = async (req, res) => {

    const { id } = req.params
    const myId = req.user._id
    const { name } = req.user  
    const { isGuest, rating, comment } = req.body


    const userComment = await new Comment ({ 
        isGuest, 
        author: myId,  
        rating,
        comment,
        writtenAbout: id
    })

    // Step 1: Find myPorfile(myId) and otherProfile(id)
    const myProfile = await Profile.findOne({ userId: myId })
    const otherProfile = await Profile.findOne({ _id: id })

    // test
    // console.log(myProfile.host[0]) 
    // my profile works, but the otherProfile does not
    console.log(otherProfile.guest[0])
    
    
    // Step 2: If I am the guest push to my guest and other's host else other
    // if (isGuest) {
    //     myProfile.guest[0].comment.push(userComment)
    //     otherProfiel.host[0].comment.push(userComment)
    // }

    // if (isGuest) {
    //     const myProfile = await Profile.findOne({ userId: myId }) 
    //     myProfile.guest[0].comments.push(userComment)
    //     myProfile.save()

    //     const otherProfile = await Profile.findOne({ id })
    //     otherProfile.host[0].comments.push(userCommnet)
    //     otherProfile.save()
    // } else if (!isGuest) {
    //     const myProfile = await Profile.findOne({ userId: myId }) 
    //     myProfile.host[0].comments.push(userComment)
    //     myProfile.save()

    //     const otherProfile = await Profile.findOne({ id })
    //     otherProfile.guest[0].comments.push(userCommnet)
    //     otherProfile.save()
    // }

    // res.json(myProfile)
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