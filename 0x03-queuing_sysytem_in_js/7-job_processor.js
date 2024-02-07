import kue from 'kue';

// Array of blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Function to send notifications
function sendNotification(phoneNumber, message, job, done) {
  // Track the progress of the job
  job.progress(0, 100);

  // Check if phoneNumber is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    // Fail the job with an Error object
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  // Update job progress to 50%
  job.progress(50, 100);

  // Log notification message
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Complete the job
  done();
}

// Create a queue with Kue
const queue = kue.createQueue({ concurrency: 2 });

// Process jobs in the 'push_notification_code_2' queue
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;

  // Call the sendNotification function with job data
  sendNotification(phoneNumber, message, job, done);
});

// Handle graceful shutdown of the queue
process.once('SIGTERM', () => {
  queue.shutdown(5000, (error) => {
    console.log('Kue shutdown');
    process.exit(0);
  });
});
