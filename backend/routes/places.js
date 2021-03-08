const router = require('express').Router();
const ctrl = require('../controllers');


// routes
router.get('/', ctrl.places.index)
router.get('/:id', ctrl.places.show);
router.post('/', ctrl.places.create);
router.put('/:id', ctrl.places.update);
router.delete('/:id', ctrl.places.destroy);

// exports
module.exports = router;