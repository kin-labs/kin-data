import { BigQuery as BQ, Job } from '@google-cloud/bigquery'
import { Injectable, Logger } from '@nestjs/common'

const sleep = (seconds = 1) => new Promise((resolve) => setTimeout(resolve, seconds * 1000))

function hasErrors(job: Job) {
  const errorResult = job.metadata.status.errorResult
  if (errorResult) {
    return errorResult
  } else {
    return false
  }
}

@Injectable()
export class BigQueryStatsService {
  readonly logger = new Logger('BigQuery')
  waitSeconds = 10
  maxRetries = 600 //total time to waiit = maxRetries * waitSeconds

  bigquery: BQ

  constructor() {
    this.bigquery = new BQ()
  }

  async waitReady(retries: number, job: Job): Promise<boolean> {
    retries++
    const status = (await job.get())[0].metadata.status

    if (retries >= this.maxRetries) {
      return false
    }

    if (status.state !== 'DONE') {
      await sleep(this.waitSeconds)
      return this.waitReady(retries, job)
    } else {
      return true
    }
  }

  async query(query: string): Promise<any[]> {
    const retries = 0
    const options = {
      query: query,
      location: 'US',
      useLegacySql: false,
    }

    // Run the query as a job
    const [job] = await this.bigquery.createQueryJob(options)
    // Wait for the query to finish
    const status = await this.waitReady(retries, job)

    if (!status) {
      throw new Error('Max retries for job reached')
    }

    const errors = hasErrors(job)
    if (errors) {
      throw errors
    }

    return job
      .getQueryResults()
      .then((items) => (Array.isArray(items) ? items[0] : items))
      .then((items) => items.map((item) => ({ ...item, date: item.date?.value ? item.date.value : item.date })))
  }
}
