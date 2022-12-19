const User = require("../models/User");
const auth = require("../middleware/auth");
const GPS = require("../models/GPS");


////////////////
// créer localisation
exports.createGPS = (req, res, next) => {
        const gps = new GPS({
            userId: req.auth.userId,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        });
        gps.save()
        .then(() => {res.status(201).json({message: 'GPS enregistré'})})
        .catch(error => { res.status(400).json( { error })})
};

///////////////////////////
// recupérer localisation d'un utilisateur --> avec userId :
exports.getGPSByUserId = (req, res, next) => {
    GPS.findOne({ userId: req.params.id })
    .then(gps => res.status(200).json(gps))
    .catch(error => res.status(400).json({ error }));
};

///////////////////////////
// recupérer les localisations proches :
exports.getGPSClose = (req, res, next) => {
    let latitude = req.params.id.split('+')[0];
    let longitude = req.params.id.split('@')[1];
    GPS.find({ latitude:{ $gte: latitude - 0.05 && longitude - 0.05, $lte: latitude + 0.05 && longitude + 0.05} })
    .then(gps => res.status(200).json(gps))
    .catch(error => res.status(400).json({ error }));
};

//////////////////////
// modifier localisation
exports.modifyGPS = (req, res, next) => {
    GPS.findOne({ userId: req.auth.userId })
    .then(gps => {
        GPS.updateOne({ userId: req.auth.userId },
            {
                latitude : req.body.latitude,
                longitude: req.body.longitude
            }
        )
        .then(() => { res.status(201).json({message: 'localisation actualisée !'})})
        .catch(error => { res.status(400).json( { error })})
    })
}