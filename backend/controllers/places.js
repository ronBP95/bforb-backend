const Place = require('../models/placesToStay');
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

const create = async (req, res) => {
    // Step 1: gather userId from req.user and find profile and gather body vars
    const { _id } = req.user 
    const myProfile = await Profile.findOne({ userId: _id })
    const { title, bedPhoto, description, rating } = req.body

    // Step 2: crew new placeToStay
    const newPlaceToStay = await new Place ({
        title,
        bedPhoto,
        description,
        rating
    })

    // Step 3: push to myProfile
    myProfile.host[0].placesToStay.push(newPlaceToStay)

    // Step 4: show it!
    res.json(myProfile)
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