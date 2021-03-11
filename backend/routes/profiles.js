const router = require('express').Router();
const ctrl = require('../controllers');
const passport = require('passport')


// routes
router.get('/', ctrl.profiles.index)
// router.get('/:id', ctrl.profiles.show);
// router.post('/', ctrl.profiles.create);
// router.put('/:id', ctrl.profiles.update);
// router.delete('/:id', ctrl.profiles.destroy);
router.post('/', passport.authenticate('jwt', { session: false }), ctrl.profiles.create)
router.put('/:id', passport.authenticate('jwt', { session: false }), ctrl.profiles.update)

// exports
module.exports = router;