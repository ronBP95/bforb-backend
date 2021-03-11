const Place = require('../models/placesToStay');
const Profile = require('../models/profile');

const index = (req, res) => {
    Profile.find({}, (err, foundPlaces) => {
        if (err) console.log(err)
        res.json(foundPlaces)
    });
}

const show = (req, res) => {
    Profile.findById(req.params.id, (err, foundPlaces) => {
        if (err) console.log('Error in games#show:', err);
        res.json(foundPlaces);
    });
};

const create = async (req, res) => {
    // Step 1: gather userId from req.user and find profile and gather body vars
    const { _id } = req.user 
    const myProfile = await Profile.findOne({ userId: _id })
    const { title, bedPhoto, description, rating } = req.body

    console.log(myProfile.host[0].placesToStay)

    // Step 2: crew new placeToStay
    const newPlaceToStay = await new Place ({
        title,
        bedPhoto,
        description,
        rating
    })

    // Step 3: push to myProfile
    myProfile.host[0].placesToStay.push(newPlaceToStay)
    myProfile.save()

    // Step 4: show it!
    res.json(myProfile)
};

const update = async (req, res) => {
    // Step 1: Drill down to the guest section in the profile.
    const userId = req.params.id
    const place = req.params.placeNum
    const myPlaceProfile = await Profile.findOne({ userId })
    const { title, bedPhoto, description } = req.body

    console.log(myPlaceProfile.host[0].placesToStay[place])

    // Step 2: update, save, send
    myPlaceProfile.host[0].placesToStay[place].title = title
    myPlaceProfile.host[0].placesToStay[place].bedPhoto = bedPhoto
    myPlaceProfile.host[0].placesToStay[place].description = description
    myPlaceProfile.save()
    res.json(myPlaceProfile.host[0].placesToStay[place])
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