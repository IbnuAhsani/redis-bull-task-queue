const Bull = require('bull')

const produce = async () => {
    const QUEUE_NAME = 'simple-queue'
    const queue = new Bull(QUEUE_NAME)

    const job = await queue.add({message: 'delayed'});

    if(job){
        console.log('delayed job is added to queue..')
    }

    process.exit();
}

produce();