const router = require('express').Router();
const ctrl = require('../controllers');
const passport = require('passport')


// routes
router.get('/', ctrl.guests.index)
router.get('/:id', ctrl.guests.show);
router.post('/:id', passport.authenticate('jwt', { session: false }), ctrl.guests.create);
router.put('/:id', ctrl.guests.update);
router.delete('/:id', ctrl.guests.destroy);



// exports
module.exports = router;