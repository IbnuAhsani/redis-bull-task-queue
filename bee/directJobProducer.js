const Queue = require('bee-queue')

const QUEUE_NAME = 'bee-queue';

const produce = async () => {
    const queue = new Queue(QUEUE_NAME);

    const job = await queue.createJob({message: 'direct'}).save();

    console.log('job')
    console.log(job)

    if(job){
        console.log('direct job is added to queue..')
    }

    process.exit();
}

produce();