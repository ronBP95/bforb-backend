const Comment = require('../models/comments');
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
    const myId = req.user._id
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

    otherProfile.ratingTotal = Number(otherProfile.ratingTotal) + Number(rating)
    otherProfile.commentTotal = Number(otherProfile.commentTotal) + 1
    otherProfile.rating = Number(otherProfile.ratingTotal) / Number(otherProfile.commentTotal)


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
    res.json(otherProfile)
};

/**
 * Goal: Update the other profiles total rating
 *      Step 1: Subract the previous rating from the totalRating
 *      Step 2: Add the new rating back to total rating.
 */
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

    // Update the ratingTotal
    otherProfile.ratingTotal = Number(otherProfile.ratingTotal) - Number(otherComment.rating)
    otherComment.rating = rating
    otherProfile.ratingTotal = Number(otherProfile.ratingTotal) + Number(otherComment.rating)
    otherProfile.rating = Number(otherProfile.ratingTotal) / Number(otherProfile.commentTotal)
    otherComment.comment = comment

    myProfile.save()
    otherProfile.save()

    res.json(myProfile)
};

/**
 * 
 * @param {*} req.params === CommentId && isGuest -- need to pass a boolean.
 * @param {*} res 
 * 
 *  * Goal: Destroy a single comment in the comments array
 * 
 * Step 1: Find my profile
 * Step 2: find comment ID by params
 */

const destroy = async (req, res) => {
    // Get ids for my profile and myComment that I want to delete
    const myId = req.user._id
    const commentId = req.params.id
    let isGuest = req.params.isGuest
    if (isGuest === 'true') { isGuest = true }
    if (isGuest === 'false') { isGuest = false }

    const myProfile = await Profile.findOne({ userId: myId })
    let otherProfile = {}

    // if isGuest
    if(isGuest){
        // find my profile and my commentToDelete
        const commentToDelete = myProfile.guest[0].comments.find( ({ _id }) => String(_id) === commentId )
        commentToDelete.comment = 'DELETED'
        
        // find the comment on the other persons profile
        const writtenAbout = commentToDelete.writtenAbout
        otherProfile =  await Profile.findOne({ _id: writtenAbout })
        const otherCommentToDelete = otherProfile.host[0].comments.find( ({ _id }) => String(_id) === commentId )
        otherCommentToDelete.comment = 'DELETED'
    } else {
        // find my profile and my commentToDelete
        const commentToDelete = myProfile.host[0].comments.find( ({ _id }) => String(_id) === commentId )
        commentToDelete.comment = 'DELETED'
        
        // find the comment on the other persons profile
        const writtenAbout = commentToDelete.writtenAbout
        otherProfile =  await Profile.findOne({ _id: writtenAbout })
        const otherCommentToDelete = otherProfile.guest[0].comments.find( ({ _id }) => String(_id) === commentId )
        otherCommentToDelete.comment = 'DELETED'
    }

    myProfile.save()
    otherProfile.save()

    res.json(otherProfile)

};

module.exports = {
    // index,
    // show,
    create,
    update,
    destroy,
};