const mongoose = require("mongoose");

const workingUri = "mongodb://indajitpadhiyar_db_user:RHrzDth4M4AIkAaw@ac-wbyj9ca-shard-00-00.gwzjx5w.mongodb.net:27017/?ssl=true&authSource=admin";

const testConnect = async () => {
    try {
        console.log("Testing connection with workingUri from test_conn.js...");
        await mongoose.connect(workingUri, {
            family: 4,
            serverSelectionTimeoutMS: 5000,
            dbName: "credivo" // Guessing the DB name
        });
        console.log("✅ Success! Mongoose connected using the direct shard URI.");
        process.exit(0);
    } catch (err) {
        console.error("❌ Failed with workingUri:", err.message);
        process.exit(1);
    }
};

testConnect();
