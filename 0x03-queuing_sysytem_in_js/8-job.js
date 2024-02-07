// Import Kue
import kue from 'kue';

// Function to create push notifications jobs
function createPushNotificationsJobs(jobs, queue) {
  // Check if jobs is an array
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  // Create jobs in the queue push_notification_code_3
  jobs.forEach((jobData) => {
    const job = queue.create('push_notification_code_3', jobData);

    // On successful creation of the job
    job.on('enqueue', () => {
      console.log(`Notification job created: ${job.id}`);
    });

    // On completion of the job
    job.on('complete', () => {
      console.log(`Notification job ${job.id} completed`);
    });

    // On failure of the job
    job.on('failed', (error) => {
      console.log(`Notification job ${job.id} failed: ${error}`);
    });

    // On progress of the job
    job.on('progress', (progress) => {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });

    // Save the job to the queue
    job.save((error) => {
      if (error) {
        console.error('Error creating job:', error);
      }
    });
  });
}

// Export the function
export default createPushNotificationsJobs;
