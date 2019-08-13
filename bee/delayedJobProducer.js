const Queue = require('bee-queue')

const QUEUE_NAME = 'bee-queue';

const produce = async () => {
    const queue = new Queue(QUEUE_NAME);

    const job = await queue.createJob({message: 'delayed'}).save();

    if(job){
        console.log('delayed job is added to queue..')
    }

    process.exit();
}

produce();