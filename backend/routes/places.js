const router = require('express').Router();
const ctrl = require('../controllers');
const passport = require('passport')


// routes
// Create a non-authenticated get route that does not include any user information.
router.post('/', passport.authenticate('jwt', { session: false }), ctrl.places.create);
router.put('/:id/:placeNum', passport.authenticate('jwt', { session: false }), ctrl.places.update);
router.delete('/:id', ctrl.places.destroy);

// exports
module.exports = router;