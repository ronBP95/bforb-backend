const router = require('express').Router();
const ctrl = require('../controllers');
const passport = require('passport')


// routes
router.get('/', ctrl.places.index)
router.get('/:id', ctrl.places.show);
router.post('/', passport.authenticate('jwt', { session: false }), ctrl.places.create);
router.put('/:id', ctrl.places.update);
router.delete('/:id', ctrl.places.destroy);

// exports
module.exports = router;