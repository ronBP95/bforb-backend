const db = require('../models/placesToStay');

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

const create = (req, res) => {
    
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