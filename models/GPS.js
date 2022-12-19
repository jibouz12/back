const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');


const GPSSchema = mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
});

GPSSchema.plugin(uniqueValidator);

module.exports = mongoose.model('GPS', GPSSchema)