import kue from 'kue';

// Create a queue with Kue
const queue = kue.createQueue();

// Object containing the Job data
const jobData = {
  phoneNumber: '071118586',
  message: 'Nipe Nigware'
};

// Create a job in the push_notification_code queue
const job = queue.create('push_notification_code', jobData);

// When the job is created without error
job.on('enqueue', () => {
  console.log(`Notification job created: ${job.id}`);
}); 
// When the job is completed
job.on('complete', () => {
  console.log('Notification job completed');
});

// When the job is failing
job.on('failed', () => {
  console.log('Notification job failed');
});

// Save the job to the queue
job.save((error) => {
  if (error) {
    console.error('Error creating job:', error);
  }
});

// Exit gracefully
process.on('SIGTERM', () => {
  queue.shutdown(5000, () => {
    console.log('Kue shutdown');
    process.exit(0);
  });
});
