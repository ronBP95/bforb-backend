const router = require('express').Router();
const ctrl = require('../controllers');
const passport = require('passport')


// routes
router.get('/', passport.authenticate('jwt', { session: false }), ctrl.profiles.index);
router.get('/showAll', ctrl.profiles.showNonAuth)
router.get('/:id', passport.authenticate('jwt', { session: false }), ctrl.profiles.show);
router.post('/', passport.authenticate('jwt', { session: false }), ctrl.profiles.create)
router.put('/', passport.authenticate('jwt', { session: false }), ctrl.profiles.update)
router.delete('/', passport.authenticate('jwt', { session: false }), ctrl.profiles.destroy)

// exports
module.exports = router;