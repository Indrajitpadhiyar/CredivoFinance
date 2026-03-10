const dns = require("dns");
const mongoose = require("mongoose");

// Use a reliable public DNS server for SRV lookups when the system resolver is blocked.
// You can override by setting DNS_SERVERS="8.8.8.8,1.1.1.1" in your .env.
const dnsServers = process.env.DNS_SERVERS
  ? process.env.DNS_SERVERS.split(",").map((s) => s.trim())
  : ["8.8.8.8", "1.1.1.1"];
dns.setServers(dnsServers);

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      family: 4,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected successfully...");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
};

module.exports = connectDb;
// This code connects to a MongoDB database using Mongoose.
