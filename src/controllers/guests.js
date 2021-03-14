const Guest = require('../models/guest');
const Profile = require('../models/profile');

/**
 * Create guestProfile for user 
 * User authenticated login in routes/index.js
 * 
 * Completed!
 */
 const create = async (req, res) => {

    const { _id } = req.user
    const { numberOfStays, wantsToMake } = req.body


    const newGuestProfile = await new Guest ({ 
        userId: _id,
        numberOfStays, 
        wantsToMake
    })

    const userProfile = await Profile.findOne({ userId: _id })

    userProfile.guest.push(newGuestProfile)
    userProfile.save()

    res.json(userProfile)
};

const update = async (req, res) => {

    // Step 1: Drill down to the guest section in the profile.
    const userId = req.params.id
    const myGuestProfile = await Profile.findOne({ userId })
    const { wantsToMake } = req.body

    // Step 2: update, save, send
    myGuestProfile.guest[0].wantsToMake = wantsToMake
    myGuestProfile.save()
    res.json(myGuestProfile.guest[0])
};

const destroy = async (req, res) => {
    const userId = req.user._id
    const guestId = req.params.id
    const myProfile = await Profile.findOne({ userId })
    const index = myProfile.guest.findIndex( ({ _id }) => _id === guestId )

    myProfile.guest.splice(index, 1)

    myProfile.save()

    res.json(myProfile)
};

module.exports = {
    create,
    update,
    destroy,
};