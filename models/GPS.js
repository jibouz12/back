const mongoose = require("mongoose");

const GPSSchema = mongoose.Schema({
    userId: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
});

module.exports = mongoose.model('GPS', GPSSchema)