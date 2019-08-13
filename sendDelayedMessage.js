const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );

async function sendDelayedMessage() {
    const queuename = "testqueue";

    // send the messages with a random delay 5 seconds
    await rsmq.sendMessageAsync({ qname: queuename, message: `Delayed Message at ${new Date().toISOString()}`, delay: 5})

    console.log("pushed new delayed message into queue..");
    
    process.exit()
}

sendDelayedMessage();