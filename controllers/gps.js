const User = require("../models/User");
const auth = require("../middleware/auth");
const GPS = require('../models/GPS');
const GPS = require("../models/GPS");


////////////////
// créer localisation
exports.createGPS = (req, res, next) => {
    User.findOne({ _id: req.auth.userId})
    .then(() => {
        const GPS = new GPS({
            userId: req.auth.userId,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        });
        GPS.save()
        .then(() => {res.status(201).json({message: 'GPS enregistré'})})
        .catch(error => { res.status(400).json( { error })})
    })
}

///////////////////////////
// recupérer localisation d'un utilisateur --> avec userId :
exports.getGPSByUserId = (req, res, next) => {
    GPS.findOne({ userId: req.params.id })
    .then(gps => res.status(200).json(gps))
    .catch(error => res.status(400).json({ error }));
};