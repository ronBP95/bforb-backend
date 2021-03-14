const Place = require('../models/placesToStay');
const Profile = require('../models/profile');

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

    // Step 2: update, save, send
    myPlaceProfile.host[0].placesToStay[place].title = title
    myPlaceProfile.host[0].placesToStay[place].bedPhoto = bedPhoto
    myPlaceProfile.host[0].placesToStay[place].description = description
    myPlaceProfile.save()
    res.json(myPlaceProfile.host[0].placesToStay[place])
};

const destroy = async (req, res) => {
    const placesId = req.params.id
    const userId = req.user._id
    const myProfile = await Profile.findOne({ userId })

    const placesArray = myProfile.host[0].placesToStay
    const placeToDelete = myProfile.host[0].placesToStay.findIndex( ({ _id }) => String(_id) === placesId )

    placesArray.splice(placeToDelete, 1)

    myProfile.save()

    res.json(myProfile)
}

module.exports = {
    create,
    update,
    destroy,
};