const router = require('express').Router();
const ctrl = require('../controllers');
const passport = require('passport')


// routes
router.post('/', passport.authenticate('jwt', { session: false }), ctrl.guests.create);
router.put('/:id', passport.authenticate('jwt', { session: false }), ctrl.guests.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), ctrl.guests.destroy);
router.delete('/:id', ctrl.guests.destroy);



// exports
module.exports = router;