const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

/////////////////////////
/// s'enregistrer :
/// vérifier format email
/// hacher le password
exports.signup = (req, res, next) => {
    let regexEmail = /[a-zA-Z1-9.-_]+[@]+[a-zA-Z1-9.-_]+[.]+[a-z]/;
    if (regexEmail.test(req.body.email)) {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                insta: req.body.insta,
                avatar: "avatar",
                dist: 1,
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ message: 'Pseudo ou Mail déjà enregistré !' }));
        })
        .catch(error => res.status(500).json({ error }));
    } else {
        return res.status(500).json({ message : "Respectez un format Email valide !" });
    }
};

//////////////////
/// se connecter :
/// comparer les passwords hachés
/// renvoyer Token (qui contient userId et admin)
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ message: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
                userId: user._id,
                insta: user.insta,
                avatar: user.avatar,
                token: jwt.sign(
                { userId: user._id },
                "" + process.env.CLE_TOKEN,
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

////////////////////////////////////////////
// recupérer les localisations proches :
exports.getGPSClose = (req, res, next) => {
    let userId = req.auth.userId;
    let lat = parseFloat(req.params.id.split('+')[0]);
    let lon = parseFloat(req.params.id.split('+')[1]);
    User.findOne({_id: userId})
    .then(user => {
        let distance = (user.dist) / 100;
        User.find({
            $and: [
                { latitude: { $lte: (lat + distance) } },
                { latitude: { $gte: (lat - distance) } },
                { longitude: { $lte: (lon + distance) } },
                { longitude: { $gte: (lon - distance) } },
                { _id: { $not: { $eq: userId } } },
            ]
        })
        .then(users => res.status(200).json( users ))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};

//////////////////////
// modifier localisation
exports.modifyGPS = (req, res, next) => {
    User.findOne({ _id: req.auth.userId })
    .then(user => {
        User.updateOne({ _id: req.auth.userId },
            {
                latitude : req.body.latitude,
                longitude: req.body.longitude
            }
        )
        .then(() => {res.status(201).json({ message: 'localisation actualisée !' })})
        .catch(error => {res.status(400).json({ error })})
    })
}

/////////////////////
// modifier avatar
exports.updateAvatar = (req, res, next) => {
    User.findOne({ _id: req.auth.userId })
    User.updateOne({ _id: req.auth.userId },
        {
            avatar: req.body.avatar
        }
    )
    .then((user) => {res.status(200).json({ message: 'ee' })})
    .catch(error => {res.status(400).json({ error })})
}

/////////////////////
// modifier distance
exports.updateDist = (req, res, next) => {
    User.findOne({ _id: req.auth.userId })
    .then(user => {
        User.updateOne({ _id: req.auth.userId },
            {
                dist: req.body.dist
            }
        )
        .then(() => {res.status(201).json({ message: 'distance modifiée !' })})
        .catch(error => {res.status(400).json({ error })})
    })
}

/////////////////////
// récupérer distance
exports.getDist = (req, res, next) => {
    User.findOne({ _id: req.auth.userId })
    .then(user => {res.status(200).json({ dist: user.dist })})
    .catch(error => {res.status(400).json({ error })})
}
