const mongoose = require("mongoose");

const claimLogSchema = new mongoose.Schema({
    ip: String,
    sessionId: String,
    claimedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ClaimLog", claimLogSchema);
