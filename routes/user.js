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
router.get('/gps/:id', auth, userCtrl.getGPSClose);

/// --> modifier une localisation
router.put('/gps', auth, userCtrl.modifyGPS);

/// --> modifier avatar
router.put('/avatar', auth, userCtrl.updateAvatar);

/// --> modifier distance
router.put('/dist', auth, userCtrl.updateDist);

/// --> récupérer distance
router.get('/dist', auth, userCtrl.getDist);

module.exports = router;