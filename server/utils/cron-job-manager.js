import schedule from "node-schedule";

class JobManager {
  jobsMap;

  constructor() {
    this.jobsMap = new Map();
  }

  createJob(name, fn, interval) {
    console.log("Create jobb")
    const job = schedule.createJob(interval, fn);
    this.jobsMap.set(name, job);
  }

  getJob(name) {
    console.log("getJobb")
    const job = this.jobsMap.get(name);
    if (!job) return;
    return job;
  }

  updateJob(name, newInterval) {
    const job = this.jobsMap.get(name);
    if (!job) return;
    job.reschedule(newInterval);
  }

  deleteJob(name) {
    const job = this.jobsMap.get(name);
    if (!job) {
      console.log("No job exists with given name.");
      return;
    }
    job.cancel();
    this.jobsMap.delete(name);
  }
}

export default new JobManager();
