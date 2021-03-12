const Profile = require('../models/profile');
const db = require('../models/profile');
const Comments = require('./comments')

/**
 * In order to get MVP I am creating a show all route b/c we won't have more than 10 people in the DB
 * However, if this were for an application that could be used by others, I would work closely with the front-end
 * team and mimic their component structure to ensure we are optimizing the best number of calls to db against
 * the time complexity of sending data to front.
 * */
const index = (req, res) => {
    db.find({}, (err, foundProfiles) => {
        if (err) console.log(err)
        res.json(foundProfiles)
    });
};

const show = (req, res) => {
    db.findById(req.params.id, (err, foundComments) => {
        if (err) console.log('Error in games#show:', err);
        res.json(foundComments);
    });
};

// embed the User id in the profile.
const create = (req, res) => {

    const { _id, name } = req.user
    const { userPhoto, locations, aboutMe, whyTravel, favBreakfast, isGuest, isHost } = req.body

    const newProfile = new db ({
        userId: _id,
        name,
        userPhoto, // make sure that we are doing this correctly
        locations, 
        aboutMe,
        whyTravel,
        favBreakfast, 
        memberSince: Date.now(),
        isGuest,
        isHost
    })

    db.create(newProfile)
    res.json(newProfile)
};

const update = async (req, res) => {

    db.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updateProfiles) => {
        if (err) console.log('Error in games#update:', err);
        res.json(updateProfiles)
    });

};

/**
 * Requires refractoring.  Can throw those for loops into a function that saves the profile
 *      Could try and grab the updateComments method from the comments controller.
 *      May figure out once mvp is done
 * 
 * Also, doesn't work... so fuck this functionality for now.  Need to update the ratings.
 */
const destroy = async (req, res) => {

    // const myProfile = await db.findOne({ userId: req.user._id })
    // const guestComments = myProfile.guest[0].comments
    // const hostComments = myProfile.host[0].comments

    // let otherProfile = ''
    // let otherComment = ''

    // // in the guestComments section of myProfile
    // for(let i = 0; i < guestComments.length; i++){
    //     const author = guestComments[i]
    //     const myComment = guestComments[i].comment
    //     const writtenAbout = guestComments[i].writtenAbout
    //     otherProfile = await db.findOne({ _id: writtenAbout })
    //     otherComment = otherProfile.host[0].comments.find(  ({ comment }) => comment === myComment )

    //     // if guestComment author is not the same, go to host and change written about
    //     // go to host and change the writtenBAbout
    //     if (author !== req.user._id){
    //         otherComment.author = 'ACCOUNT DELETED'
    //     } else if (author === req.user._id) {
    //         otherComment.writtenAbout = 'ACCOUNT DELETED'
    //     }
    // }

    // otherProfile.save()
    // console.log(otherProfile.host[0].comments)

    // // console.log(otherProfile.host[0].comments)

    // for(let i = 0; i < hostComments.length; i++){
    //     // const { author, comment } = hostComments[i]
    //     const author = guestAuthor[i].author
    //     const myComment = hostComments[i].comment
    //     const writtenAbout = hostComments[i].writtenAbout
    //     otherProfile = await db.findOne({ _id: writtenAbout })
    //     otherComment = otherProfile.guest[0].comments.find(  ({ comment }) => comment === myComment )

    //     if (author !== req.user._id){
    //         otherComment.author = 'ACCOUNT DELETED'
    //     } else if (author === req.user._id) {
    //         otherComment.writtenAbout = 'ACCOUNT DELETED'
    //     }
    // }

    // otherProfile.save()
    // console.log(otherProfile.host[0].comments)

    // // console.log(otherProfile)

    const myProfile = await db.findOne({ userId: req.user._id })
    const id = myProfile._id

    db.findByIdAndDelete(id, (err, deletedProfiles) => {
        if (err) {
            console.log('Error in games#destroy:', err);
        } else {
            res.json(deletedProfiles)
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