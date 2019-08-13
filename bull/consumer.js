const Bull = require('bull')

const delay = ms => new Promise(_ => setTimeout(_, ms));

const consume = () => {
    const QUEUE_NAME = 'simple-queue'
    const queue = new Bull(QUEUE_NAME)
    
    console.log('consumer is running')
    
    queue.process(async (job, done) => {
        console.log('job is executing')

        const { data } = job;
        
        if(data.message === 'delayed') {
            await delay(5000);
            console.log('data: ' + data.message)
        } else {
            console.log('data: ' + data.message)
        }

        done(null, data.message);

        console.log('job is finished\n')
    })
}

consume()