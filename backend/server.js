const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const claimRoutes = require("./routes/claimRoutes");

dotenv.config();
const app = express();
app.use(express.json());
app.use(
    cors({
        origin: process.env.FRONTEND_URL, // ✅ Set the correct frontend URL
        credentials: true, // ✅ Allow cookies if needed
    })
);
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected to MongoDB"));

app.use("/api", claimRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
