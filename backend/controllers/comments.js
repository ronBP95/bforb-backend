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

    // step 2: push the userComment to the profiles if I am guest push to myGuest 
    if (isGuest) { 
        myProfile.guest[0].comments.push(userComment)
        otherProfile.host[0].comments.push(userComment) 
    } else {
        myProfile.host[0].comments.push(userComment)
        otherProfile.guest[0].comments.push(userComment)
    }

    // Step 3: Save
    myProfile.save()
    otherProfile.save()

    // Step 4: Send myProfile to JSON format in postman
    res.json(myProfile)
};

const update = async (req, res) => {
    
    // Step 1: find my profile
    const myId = req.user._id
    const commentIdx = req.params.idx
    const myProfile = await Profile.findOne({ userId: myId })

    const { isGuest, rating, comment } = req.body
    let myComment = ''
    let otherComment = ''
    let otherProfile = ''

    if (isGuest) {
        myComment = myProfile.guest[0].comments[commentIdx]
        const myCommentText = myProfile.guest[0].comments[commentIdx].comment

        const writtenAbout = myProfile.guest[0].comments[commentIdx].writtenAbout
        otherProfile = await Profile.findOne({ _id: writtenAbout })
        const otherCommentArray = otherProfile.host[0].comments
        otherComment = otherCommentArray.find( ({ comment }) => comment === myCommentText )
    } else {
        myComment = myProfile.host[0].comments[commentIdx]
        const myCommentText = myProfile.host[0].comments[commentIdx].comment

        const writtenAbout = myProfile.host[0].comments[commentIdx].writtenAbout
        otherProfile = await Profile.findOne({ _id: writtenAbout })
        const otherCommentArray = otherProfile.guest[0].comments
        otherComment = otherCommentArray.find( ({ comment }) => comment === myCommentText )
    }

    myComment.rating = rating
    myComment.comment = comment

    otherComment.rating = rating
    otherComment.comment = comment

    myProfile.save()
    otherProfile.save()

    res.json(myProfile)
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