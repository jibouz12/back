const express = require('express');
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

const router = express.Router();

///////////////////
/// --> créer un nouvel utilisateur
/// --> connection utilisateur
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

/////////////////
/// --> récupérer les localisations proches
router.get(':id', auth, userCtrl.getGPSClose);

/// --> modifier une localisation
router.put('', auth, userCtrl.modifyGPS);

module.exports = router;