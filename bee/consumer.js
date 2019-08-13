const Queue = require('bee-queue')

const delay = ms => new Promise(_ => setTimeout(_, ms));

const QUEUE_NAME = 'bee-queue';

const consume = () => {
    console.log('consumer is running')

    const queue = new Queue(QUEUE_NAME);

    queue.process(10, async job => {
        console.log('job is executing')

        const { data } = job

        if(data.message === 'delayed') {
            await delay(4000);
            console.log('data: ' + data.message)
        } else {
            console.log('data: ' + data.message)
        }

        console.log('job is finished\n')

        return data;
    })
}

consume()