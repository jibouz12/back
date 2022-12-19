const express = require('express');
const GPSCtrl = require('../controllers/gps');
const auth = require('../middleware/auth');


const router = express.Router();

/// --> créer une localisation
router.post('', auth, GPSCtrl.createGPS);

/// --> récupérer une localisation
router.get('/:id', auth, GPSCtrl.getGPSByUserId);

/// --> modifier une localisation
router.put('', auth, GPSCtrl.modifyGPS);

module.exports = router;