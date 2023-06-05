import schedule from "node-schedule";
import logger from "../logger/logger.js"

class JobManager {
  jobsMap;

  constructor() {
    this.jobsMap = new Map();
  }

  createJob(name, fn, interval) {
    logger.info("inside createjob function")
    const job = schedule.createJob(interval, fn);
    logger.info(`Create Job: ${job}`)
    this.jobsMap.set(name, job);
  }

  getJob(name) {
    logger.info("inside getjob function")
    const job = this.jobsMap.get(name);
    logger.info(`get Job: ${job}`)
    if (!job) return;
    return job;
  }

  updateJob(name, newInterval) {
    logger.info("inside updatejob function")
    const job = this.jobsMap.get(name);
    logger.info(`update Job: ${job}`)
    if (!job) return;
    job.reschedule(newInterval);
    logger.info(`update Job: ${job}`)
  }

  deleteJob(name) {
    logger.info(`inside deleteJob`)
    const job = this.jobsMap.get(name);
    logger.info(`update Job: ${job}`)
    if (!job) {
      logger.info("No job exists with given name.")
      console.log("No job exists with given name.");
      return;
    }
    job.cancel();
    this.jobsMap.delete(name);
  }
}

export default new JobManager();
