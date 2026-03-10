const mongoose = require("mongoose");
require("dotenv").config();

const testUri = "mongodb+srv://indajitpadhiyar_db_user:RHrzDth4M4AIkAaw@credivo.gwzjx5w.mongodb.net/?appName=credivo";

const testConnect = async () => {
    try {
        console.log("Testing connection to credivo.gwzjx5w.mongodb.net...");
        await mongoose.connect(testUri, {
            family: 4,
            serverSelectionTimeoutMS: 5000,
        });
        console.log("✅ Success! The correct cluster name is 'credivo'.");
        process.exit(0);
    } catch (err) {
        console.error("❌ Failed with 'credivo':", err.message);
        process.exit(1);
    }
};

testConnect();
