const router = require('express').Router();
const ctrl = require('../controllers');


// routes
router.get('/', ctrl.hosts.index)
router.get('/:id', ctrl.hosts.show);
router.post('/', ctrl.hosts.create);
router.put('/:id', ctrl.hosts.update);
router.delete('/:id', ctrl.hosts.destroy);

// exports
module.exports = router;