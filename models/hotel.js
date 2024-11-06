const mongoose = require('mongoose');

const hotelDataSchema = new mongoose.Schema({
    hotel: { type: String },
    arrival_date_year: { type: Number },
    arrival_date_month: { type: String },
    arrival_date_day_of_month: { type: Number },
    adults: { type: Number },
    children: { type: Number },
    babies: { type: Number },
    country: { type: String },
    Unnamed_8: { type: String, default: null },
    Unnamed_9: { type: String, default: null },
    Unnamed_10: { type: String, default: null },
    Unnamed_11: { type: String, default: null },
    Unnamed_12: { type: String, default: null },
    Unnamed_13: { type: String, default: null },
    Unnamed_14: { type: String, default: null },
    Unnamed_15: { type: String, default: null },
    Unnamed_16: { type: String, default: null }
});

module.exports = mongoose.model('HotelData', hotelDataSchema);
