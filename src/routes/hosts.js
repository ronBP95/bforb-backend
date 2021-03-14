const router = require('express').Router();
const ctrl = require('../controllers');
const passport = require('passport')


// routes
router.post('/', passport.authenticate('jwt', { session: false }), ctrl.hosts.create);
router.put('/:id', passport.authenticate('jwt', { session: false }), ctrl.hosts.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), ctrl.hosts.destroy);

// exports
module.exports = router;