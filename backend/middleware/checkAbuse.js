const ClaimLog = require("../models/ClaimLog");

module.exports = async (req, res, next) => {
    const ip = req.ip;
    const sessionId = req.cookies.sessionId;

    const recentClaim = await ClaimLog.findOne({
        $or: [{ ip }, { sessionId }],
        claimedAt: { $gte: new Date(Date.now() - 3600000) },
    });

    if (recentClaim) {
        return res.status(429).json({ message: "You can claim another coupon in an hour." });
    }
    next();
};
