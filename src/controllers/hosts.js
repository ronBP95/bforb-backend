const Host = require('../models/host');
const Profile = require('../models/profile');

/**
 * Create guestProfile for user 
 * User authenticated login in routes/index.js
 * 
 * TODO: Write logic for numberOfStays and Ratings
 */
const create = async (req, res) => {

    const { _id } = req.user
    const { location, numberOfGuests, wantsForBreakfast } = req.body


    const newHostProfile = await new Host ({ 
        location, 
        numberOfGuests,
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
    const userId = req.user._id
    const hostId = req.params.id
    const myProfile = await Profile.findOne({ userId })
    const index = myProfile.host.findIndex( ({ _id }) => _id === hostId )

    myProfile.host.splice(index, 1)

    myProfile.save()

    res.json(myProfile)
};

module.exports = {
    create,
    update,
    destroy,
};