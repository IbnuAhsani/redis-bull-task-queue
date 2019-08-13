const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );

async function sendDelayedMessage() {
    const queuename = "testqueue";

    await rsmq.sendMessageAsync({ qname: queuename, message: 'delayed-message'})

    console.log("pushed new delayed message into queue..");
    
    process.exit()
}

sendDelayedMessage();