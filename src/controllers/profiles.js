const db = require('../models/profile');
const Comments = require('./comments')

/**
 * Keep the index route and update to authenticated route, so that only that information can be displayed
 * to authenticated users
 * */
const index = (req, res) => {
    db.find({}, (err, foundComments) => {
        if (err) console.log(err)
        res.json(foundComments)
    });
};

/**
 * Goal: Non-Authenticated view and authenticated view.
 * 
 * Front end will queery the database and send this to the front end. 
 * 
 * Because we are doing this for a class project we decided to by-pass some validations
 * IE we are just going to send all data to the front-end because we don't have a lot of users and
 * wont have to worry about time complexity.
 * 
 * name, userPhotos, locations, aboutMe, whyTravel, favBreakfrast, memberSince, isGuest, isHost,
 */
const showNonAuth = (req, res) => {
    let nonAuthProfiles = []

    db.find({}, (err, foundProfiles) => {
        if (err) console.log(err)
        foundProfiles.map((i) => {
            const { _id, userId, name, userPhoto, locations, aboutMe, whyTravel, favBreakfast, memberSince, rating, isGuest, isHost } = i

            nonAuthProfiles.push({
                _id,
                userId, 
                name, 
                userPhoto,
                locations, 
                aboutMe, 
                whyTravel, 
                favBreakfast,
                memberSince,
                rating, 
                isGuest,
                isHost,
            })
        })
        res.json(nonAuthProfiles)
    });
}

const show = (req, res) => {
    db.findById(req.user._id, (err, foundProfile) => {
        if (err) console.log('Error in games#show:', err);
        res.json(foundProfile);
    });
};

// embed the User id in the profile.
const create = (req, res) => {

    const { _id, name } = req.user
    const { userPhoto, locations, aboutMe, whyTravel, favBreakfast, isGuest, isHost } = req.body

    const newProfile = new db ({
        userId: _id,
        name,
        userPhoto, 
        locations, 
        aboutMe,
        whyTravel,
        favBreakfast, 
        memberSince: Date.now(),
        rating: 5,
        ratingTotal: 5,
        commentTotal: 1,
        isGuest,
        isHost
    })

    db.create(newProfile)
    res.json(newProfile)
};

const update = async (req, res) => {

    const myProfile = await db.findOne({ userId: req.user._id })
    const id = myProfile._id

    db.findByIdAndUpdate(id, req.body, { new: true }, (err, updateProfiles) => {
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
    showNonAuth,
    show,
    create,
    update,
    destroy,
};