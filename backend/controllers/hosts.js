const Host = require('../models/host');
const Profile = require('../models/profile');

const index = (req, res) => {
    db.find({}, (err, foundPlaces) => {
        if (err) console.log(err)
        res.json(foundPlaces)
    });
}

const show = (req, res) => {
    db.findById(req.params.id, (err, foundPlaces) => {
        if (err) console.log('Error in games#show:', err);
        res.json(foundPlaces);
    });
};

/**
 * Create guestProfile for user 
 * User authenticated login in routes/index.js
 * 
 * TODO: Write logic for numberOfStays and Ratings
 */
const create = async (req, res) => {

    const { _id } = req.user
    const { location, numberOfGuests, rating, wantsForBreakfast } = req.body


    const newHostProfile = await new Host ({ 
        location, 
        numberOfGuests,
        rating,
        wantsForBreakfast
    })

    const userProfile = await Profile.findOne({ userId: _id })

    userProfile.host.push(newHostProfile)
    userProfile.save()

    res.json(userProfile)
};

const update = async (req, res) => {
    // Step 1: Drill down to the guest section in the profile.
    const userId = req.params.id
    const myHostProfile = await Profile.findOne({ userId })
    const { location, numberOfGuests, wantsForBreakfast } = req.body

    // Step 2: update, save, send
    myHostProfile.host[0].location = location
    myHostProfile.host[0].numberOfGuests = numberOfGuests
    myHostProfile.host[0].wantsForBreakfast = wantsForBreakfast
    myHostProfile.save()
    res.json(myHostProfile.host[0])
};

const destroy = (req, res) => {
    db.findByIdAndDelete(req.params.id, (err, deletedPlaces) => {
        if (err) {
            console.log('Error in games#destroy:', err);
        } else {
            res.json(deletedPlaces)
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