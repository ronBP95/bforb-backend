const db = require('../models/commentsSchema');

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

const create = (req, res) => {
    db.create(req.body, (err, savedComments) => {
        if (err) console.log('Error in games#create:', err);
        res.json(savedComments)
    });
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