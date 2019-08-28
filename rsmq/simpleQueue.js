const RedisSMQ = require('rsmq');
const rsmq = new RedisSMQ({ host: '127.0.0.1', port: 6379, ns: 'rsmq' });

const delay = ms => new Promise(_ => setTimeout(_, ms));

function main() {
  const queuename = 'testqueue';

  // create a queue
  rsmq.createQueue({ qname: queuename }, err => {
    if (err) {
      // if the error is `queueExists` we can keep going as it tells us that the queue is already there
      if (err.name !== 'queueExists') {
        console.error(err);
        return;
      } else {
        console.log('queue exists.. resuming..');
      }
    }

    // start checking for messages every 500ms
    receiveMessageLoop(queuename);
  });
}

main();

function receiveMessageLoop(queuename) {
  // check for new messages every second
  setInterval(() => {
    // alternative to receiveMessage would be popMessage => receives the next message from the queue and deletes it.
    rsmq.receiveMessage({ qname: queuename }, async (err, resp) => {
      if (err) {
        console.error(err);
        return;
      }

      if (resp.message === 'direct-message') {
        console.log('direct-message received');
      }

      // delay the delayed-message for 5 seconds
      if (resp.message === 'delayed-message') {
        await delay(5000);
        console.log('delayed-message received');
      }

      // checks if a message has been received
      if (resp.id) {
        console.log('received message:', resp.message);

        // we are done with working on our message, we can now safely delete it
        rsmq.deleteMessage({ qname: queuename, id: resp.id }, err => {
          if (err) {
            console.error(err);
            return;
          }

          console.log('deleted message with id', resp.id);
        });
      } else {
        console.log('no available message in queue..');
      }
    });
  }, 500);
}
