const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");
const ClaimLog = require("../models/ClaimLog");
const checkAbuse = require("../middleware/checkAbuse");

router.post("/claim", checkAbuse, async (req, res) => {
    const sessionId = req.cookies.sessionId || Math.random().toString(36).substr(2, 9);
    const coupon = await Coupon.findOneAndUpdate(
        { assignedTo: null },
        { assignedTo: sessionId, claimedAt: new Date() },
        { new: true }
    );

    if (!coupon) return res.status(400).json({ message: "No coupons available" });

    await new ClaimLog({ ip: req.ip, sessionId }).save();
    res.cookie("sessionId", sessionId, { httpOnly: true, maxAge: 3600000 });

    res.json({ message: "Coupon claimed successfully", coupon: coupon.code });
});

module.exports = router;
