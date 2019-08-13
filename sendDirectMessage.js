const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );

async function sendDirectMessage() {
    const queuename = "testqueue";

    await rsmq.sendMessageAsync({ qname: queuename, message: 'direct-message'})

    console.log("pushed new direct message into queue..");
    
    process.exit()
}

sendDirectMessage();