import { expect } from 'chai';
import sinon from 'sinon';
import { createPushNotificationsJobs } from './8-job.js';
import kue from 'kue';

describe('createPushNotificationsJobs function', () => {
  let sandbox;
  let queue;

  before(() => {
    sandbox = sinon.createSandbox();
    queue = kue.createQueue();
    queue.testMode.enter(); // Enter test mode
  });

  after(() => {
    queue.testMode.clear(); // Clear the queue
    queue.testMode.exit(); // Exit test mode
    sandbox.restore();
  });

  it('should display an error message if jobs is not an array', () => {
    expect(() => {
      createPushNotificationsJobs('not an array', queue);
    }).to.throw('Jobs is not an array');
  });

  it('should create two new jobs to the queue', () => {
    const jobs = [
      { phoneNumber: '123', message: 'Message 1' },
      { phoneNumber: '456', message: 'Message 2' }
    ];

    createPushNotificationsJobs(jobs, queue);

    expect(queue.testMode.jobs.length).to.equal(2);
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
  });
});