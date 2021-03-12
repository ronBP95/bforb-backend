const Comment = require('../models/comments');
// const Guest = require('../models/guest');
// const Host = require('../models/host');
const Profile = require('../models/profile');

/**
 * because our db relates to the user profile I removed the show and index methods and routes
 * 
 * I don't think that we have a use case where this is necessary.  Keeping commented out so that
 * I can turn them on when needed.
 */
/** 
 * const index = (req, res) => {
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
*/

/**
 * Create a comment that automatically pulls in writtenBy id and writtenAbout id.
 * 
 * Step 1: bring in the writtenBy ID (log)
 * Step 2: bring in the writtenAbout ID (log)
 * Step 3: use db.create to create a comment object that stores the ids.
 * Step 4: Check conditional logic 
 * 
 * Only guests or hosts can leave comments and ratings but not host.
 * There is a radio on the form that ask if the commenter is a guest or host and returns a bool
 * 
 * Rating:
 *      Update the profile rating in total
 *      Average rating is total rating / number of comments
 *      When comment is created update total rating in profile and then display rating is totalRating / comments.length
 * 
 *      Comment should only update the rating total and possibly total comments
 * 
 */
const create = async (req, res) => {

    const { id } = req.params
    const myName = req.user.name
    const { isGuest, rating, comment } = req.body


    const userComment = await new Comment ({ 
        isGuest, 
        author: myName,  
        rating,
        comment,
        writtenAbout: id
    })

    // Step 1: Find myPorfile(myId) and otherProfile(id)
    const myProfile = await Profile.findOne({ userId: myId })
    const otherProfile = await Profile.findOne({ _id: id })

    otherProfile.ratingTotal = otherProfile.ratingTotal + rating
    otherProfile.commentTotal = otherProfile.commentTotal + 1

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
    // index,
    // show,
    create,
    update,
    destroy,
};