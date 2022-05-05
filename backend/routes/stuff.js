const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../midddleware/auth');
const multer = require('../midddleware/multer-config');

// --- POST ---
// POST one stuff
router.post('/', auth, multer, stuffCtrl.createThing);

// --- GET ---
// GET All Stuff
router.get('/', auth, stuffCtrl.getAllThings);

// GET One Stuff
router.get('/:id', auth, stuffCtrl.getOneThing);

// --- PUT ---
// PUT One Stuff (Update)
router.put('/:id', auth, multer, stuffCtrl.modifyThing);

// --- DELETE ---
// DELETE One Stuff
router.delete('/:id', auth, stuffCtrl.deleteThing);

// Export routers
module.exports = router;
