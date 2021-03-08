const router = require('express').Router();
const ctrl = require('../controllers');


// routes
router.get('/', ctrl.todos.index)
router.get('/:id', ctrl.todos.show);
router.post('/', ctrl.todos.create);
router.put('/:id', ctrl.todos.update);
router.delete('/:id', ctrl.todos.destroy);

// exports
module.exports = router;