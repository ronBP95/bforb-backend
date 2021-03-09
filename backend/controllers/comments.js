const db = require('../models/comments');

const index = (req, res) => {
    db.find({}, (err, foundComments) => {
        if (err) console.log(err)
        res.json(foundComments)
    });
}

const show = (req, res) => {
    db.findById(req.params.id, (err, foundComments) => {
        if (err) console.log('Error in games#show:', err);
        res.json(foundComments);
    });
};

/**
 * Create a comment that automatically pulls in writtenBy id and writtenAbout id.
 * 
 * Step 1: bring in the writtenBy ID (log)
 * Step 2: bring in the writtenAbout ID (log)
 * Step 3: use db.create to create a comment object that stores the ids.
 * Step 4: Check conditional logic 
 * 
 */
const create = (req, res) => {

    const { _id } = req.user
    const { comment, rating } = req.body

    const newComment = new db ({
        writtenBy: _id,
        // Adjusted routes so that writtenAbout id would be stored in req.params -- have to
        // consider how we want to set the params and adjust
        writtenAbout: req.params,
        comment, 
        rating,
        createAt: Date.now()
    })

    res.json(newComment)


};

const update = (req, res) => {
    db.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updateComments) => {
        if (err) console.log('Error in games#update:', err);
        res.json(updateComments)
    });
};

const destroy = (req, res) => {
    db.findByIdAndDelete(req.params.id, (err, deletedComments) => {
        if (err) {
            console.log('Error in games#destroy:', err);
        } else {
            res.json(deletedComments)
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