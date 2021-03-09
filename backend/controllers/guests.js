const Guest = require('../models/guest');
const Profile = require('../models/profileSchema');

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
    const { numberOfStays, rating, wantsToMake } = req.body


    const newGuestProfile = await new Guest ({ 
        userId: _id,
        numberOfStays, 
        rating, 
        wantsToMake
    })

    const userProfile = await Profile.findOne({ userId: _id })

    userProfile.guest.push(newGuestProfile)
    userProfile.save()

    res.json(userProfile)
};

const update = (req, res) => {
    db.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatePlaces) => {
        if (err) console.log('Error in games#update:', err);
        res.json(updatePlaces)
    });
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