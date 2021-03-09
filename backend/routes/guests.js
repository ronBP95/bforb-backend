const router = require('express').Router();
const ctrl = require('../controllers');


// routes
router.get('/', ctrl.guests.index)
router.get('/:id', ctrl.guests.show);
router.post('/', ctrl.guests.create);
router.put('/:id', ctrl.guests.update);
router.delete('/:id', ctrl.guests.destroy);

// exports
module.exports = router;