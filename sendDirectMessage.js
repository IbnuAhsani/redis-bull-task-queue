const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );

async function sendDirectMessage() {
    const queuename = "testqueue";

    // send the messages directly
    await rsmq.sendMessageAsync({ qname: queuename, message: `Direct Message at ${new Date().toISOString()}`})

    console.log("pushed new direct message into queue..");
    
    process.exit()
}

sendDirectMessage();