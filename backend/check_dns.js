const dns = require('dns').promises;

async function checkDns() {
    const clusterNames = ['cerdivo', 'credivo', 'cluster0', 'cerdivo-finance', 'credivo-finance'];
    for (const name of clusterNames) {
        const srvHost = `_mongodb._tcp.${name}.gwzjx5w.mongodb.net`;
        console.log(`Checking SRV for ${srvHost}...`);
        try {
            const records = await dns.resolveSrv(srvHost);
            console.log(`✅ FOUND! Records for ${name}:`, records);
            return;
        } catch (err) {
            console.log(`❌ Not found for ${name}: ${err.code}`);
        }
    }

    console.log("None of the common cluster names worked. Checking A record for gwzjx5w.mongodb.net...");
    try {
        const aRecords = await dns.resolve4('gwzjx5w.mongodb.net');
        console.log("A records for gwzjx5w.mongodb.net:", aRecords);
    } catch (err) {
        console.log("Failed to resolve gwzjx5w.mongodb.net:", err.code);
    }
}

checkDns();
