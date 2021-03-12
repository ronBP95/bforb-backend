const router = require('express').Router();
const ctrl = require('../controllers/comments');
const passport = require('passport')
const jwt = require('jsonwebtoken')


// routes
// router.get('/', ctrl.index)
// router.get('/:id', ctrl.show);
router.post('/:id', passport.authenticate('jwt', { session: false }), ctrl.create);
router.put('/:idx', passport.authenticate('jwt', { session: false }), ctrl.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), ctrl.destroy);


// exports
module.exports = router;