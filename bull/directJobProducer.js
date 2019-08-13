const Bull = require('bull')

const produce = async () => {
    const QUEUE_NAME = 'simple-queue'
    const queue = new Bull(QUEUE_NAME)

    const job = await queue.add({message: 'direct'});

    if(job){
        console.log('direct job is added to queue..')
    }

    process.exit();
}

produce();