#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

const delay = ms => new Promise(_ => setTimeout(_, ms));

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }

  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    var queue = 'hello';

    channel.assertQueue(queue, {
      durable: false
    });

    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);

    channel.consume(
      queue,
      async function(msg) {
        if (msg.content.toString() === 'delayed') {
          await delay(6000);
          console.log('delayed job is finished executing');
        }

        if (msg.content.toString() === 'direct') {
          console.log('direct job is finished executing');
        }
      },
      {
        noAck: true
      }
    );
  });
});
