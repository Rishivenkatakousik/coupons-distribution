const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    code: String,
    assignedTo: String,
    claimedAt: Date,
});

module.exports = mongoose.model("Coupon", couponSchema);
