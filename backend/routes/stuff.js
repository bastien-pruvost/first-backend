const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

// --- POST ---
// POST one stuff
router.post('/', stuffCtrl.createThing);

// --- GET ---
// GET All Stuff
router.get('/', stuffCtrl.getAllThings);

// GET One Stuff
router.get('/:id', stuffCtrl.getOneThing);

// --- PUT ---
// PUT One Stuff (Update)
router.put('/:id', stuffCtrl.modifyThing);

// --- DELETE ---
// DELETE One Stuff
router.delete('/:id', stuffCtrl.deleteThing);

// Export routers
module.exports = router;
