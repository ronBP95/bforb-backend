const router = require('express').Router();
const ctrl = require('../controllers');
const passport = require('passport')


// routes
router.get('/', ctrl.hosts.index)
router.get('/:id', ctrl.hosts.show);
router.post('/', passport.authenticate('jwt', { session: false }), ctrl.hosts.create);
router.put('/:id', passport.authenticate('jwt', { session: false }), ctrl.hosts.update);
router.delete('/:id', ctrl.hosts.destroy);

// exports
module.exports = router;