const router = require('express').Router();
const ctrl = require('../controllers/comments');
const passport = require('passport')
const jwt = require('jsonwebtoken')


// routes
// router.get('/', ctrl.index)
// router.get('/:id', ctrl.show);
router.post('/:id', passport.authenticate('jwt', { session: false }), ctrl.create);
router.put('/:idx', passport.authenticate('jwt', { session: false }), ctrl.update);
router.delete('/:id/:isGuest', passport.authenticate('jwt', { session: false }), ctrl.destroy);

/**
 * Dear Front End: A note on params
 * 
 * for the delete route you need to pass the commentId and then if the user is taking a guest comment pass true else false
 * 
 */


// exports
module.exports = router;