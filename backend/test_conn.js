const { MongoClient } = require('mongodb');

const uri = "mongodb://indajitpadhiyar_db_user:RHrzDth4M4AIkAaw@ac-wbyj9ca-shard-00-00.gwzjx5w.mongodb.net:27017/?ssl=true&authSource=admin";

async function run() {
    const client = new MongoClient(uri);
    try {
        console.log("Attempting to connect to shard...");
        await client.connect();
        console.log("Connected to shard!");
        const isMaster = await client.db().admin().command({ isMaster: 1 });
        console.log("ReplicaSet name:", isMaster.setName);
    } catch (err) {
        console.error("Failed to connect to shard:", err);
    } finally {
        await client.close();
    }
}

run();
