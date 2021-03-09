const db = require('../models/profileSchema');

const index = (req, res) => {
    db.find({}, (err, foundProfiles) => {
        if (err) console.log(err)
        res.json(foundProfiles)
    });
};

const show = (req, res) => {
    db.findById(req.params.id, (err, foundProfiles) => {
        if (err) console.log('Error in games#show:', err);
        res.json(foundProfiles);
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

const update = (req, res) => {
    db.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updateProfiles) => {
        if (err) console.log('Error in games#update:', err);
        res.json(updateProfiles)
    });
};

const destroy = (req, res) => {
    db.findByIdAndDelete(req.params.id, (err, deletedProfiles) => {
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