const jobs = [
    {
      phoneNumber: '4153518780',
      message: 'This is the code 1234 to verify your account'
    },
    {
      phoneNumber: '4153518781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4153518743',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4153538781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4153118782',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4153718781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4159518782',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4158718781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4153818782',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4154318781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4151218782',
      message: 'This is the code 4321 to verify your account'
    }
  ];

  import kue from 'kue';

  const queue = kue.createQueue();

  // Loop through the array of jobs
jobs.forEach((jobData, index) => {
    // Create a new job in the queue 'push_notification_code_2'
    const job = queue.create('push_notification_code_2', jobData);
  
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
  
  // Gracefully shutdown the queue
  process.once('SIGTERM', () => {
    queue.shutdown(5000, (error) => {
      console.log('Kue shutdown');
      process.exit(0);
    });
  });