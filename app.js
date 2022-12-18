const express = require('express');
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
require("dotenv").config();

////////////////////////////////
// connexion mongoDB via mongoose (base de données noSQL)
mongoose.connect(
    process.env.CONNECTION,
  { useNewUrlParser: true,
    useUnifiedTopology: true }
)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

//////////////////////////////
// utilisation d'express
const app = express();
app.use(express.json());

//////////////////////////////////
// permettre l'accès à l'API (CORS)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

/////////////////////
/// routes principales de l'API :
/// --> route des utilisateurs
app.use("/api/auth", userRoutes);


module.exports = app;

