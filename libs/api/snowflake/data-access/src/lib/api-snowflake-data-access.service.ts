import { ApiCoreDataAccessService } from '@kin-data/api/core/data-access'
import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { createHash } from 'crypto'
import * as LRU from 'lru-cache'
import * as snowflake from 'snowflake-sdk'
import { Connection } from 'snowflake-sdk'

@Injectable()
export class ApiSnowflakeDataAccessService {
  private readonly cache = new LRU<string, any>({ maxAge: 1000 * 60 })
  private logger = new Logger(ApiSnowflakeDataAccessService.name)
  private snowflakeConnection: Connection
  private columnsApps = [`ID as "id"`, `NAME as "name"`]
  private columnsTxns: string[] = [
    `TRANSACTION_ID as "id"`,
    `TRANSACTION_HASH as "signature"`,
    `APP_ID as "index"`,
    `TRANSACTION_STATUS as "transactionStatus"`,
    `AMOUNT as "amount"`,
    `QUARKS as "quarks"`,
    `BLOCK as "block"`,
    `INSTRUCTION_OFFSET as "instructionOffset"`,
    `MEMO_TEXT as "memoText"`,
    `DATE_TIME as "dateTime"`,
    `SOURCE as "source"`,
    `SOURCE_OWNER as "sourceOwner"`,
    `DESTINATION as "destination"`,
    `DESTINATION_OWNER as "destinationOwner"`,
    `SUBSIDIZER as "subsidizer"`,
  ]
  private tableApps = `dim_kin_app`
  private tableTxns = `kin_transactions_curated`

  constructor(private readonly data: ApiCoreDataAccessService) {}

  async ingestedApps() {
    this.logger.verbose(`Fetching ingestedApps`)
    try {
      return this.executeQuery(this.columnsApps, this.getTable(this.tableApps), [`ORDER BY ID`])
    } catch (err) {
      console.log(`Error fetching ingestedApps`, err)
      return new BadRequestException(`Error fetching ingestedApps`)
    }
  }

  async ingestedTxByIndex(index: number) {
    this.logger.verbose(`Fetching ingestedTxByIndex ${index}`)
    try {
      return this.executeQuery(this.columnsTxns, this.getTable(this.tableTxns), [
        `WHERE APP_ID = ${index}`,
        `ORDER BY DATE_TIME DESC`,
        `LIMIT 100`,
      ])
    } catch (err) {
      console.log(`Error fetching ingestedTxByIndex ${index}`, err)
      return new BadRequestException(`Error fetching ingestedTxByIndex ${index}`)
    }
  }

  async ingestedTxBySignature(signature: string) {
    this.logger.verbose(`Fetching ingestedTxBySignature ${signature}`)
    try {
      return this.executeQuery(this.columnsTxns, this.getTable(this.tableTxns), [
        `WHERE TRANSACTION_HASH = '${signature}'`,
        `ORDER BY DATE_TIME DESC`,
        `LIMIT 100`,
      ])
    } catch (err) {
      console.log(`Error fetching ingestedTxBySignature ${signature}`, err)
      return new BadRequestException(`Error fetching ingestedTxBySignature ${signature}`)
    }
  }

  private async executeQuery(fields: string[], table: string, params: string[]) {
    const query = `SELECT ${fields.join(', ')} FROM ${table} ${params.join(' ')}`
    const cacheKey = this.getCacheKey(query)
    if (!this.cache.has(cacheKey)) {
      this.logger.verbose(`Caching ${cacheKey} started`)
      this.cache.set(cacheKey, await this.runQuery(query))
      this.logger.verbose(`Caching ${cacheKey} finished`)
    } else {
      this.logger.verbose(`Caching ${cacheKey} hit`)
    }
    return this.cache.get(cacheKey)
  }

  private async runQuery(query: string) {
    try {
      const sf = await this.getSnowflake()
      this.logger.verbose(`Executing Snowflake query: ${query}`)
      try {
        return new Promise((resolve, reject) => {
          sf.execute({
            sqlText: query,
            complete: (err, stmt, rows) => {
              if (err) {
                this.logger.log(`Error executing Snowflake query: ${err}`)
                return reject(err)
              }
              return resolve(rows)
            },
          })
        })
      } catch (err) {
        console.log(`Error executing Snowflake query (${query})`, err)
        return new BadRequestException(`Error executing Snowflake query`)
      }
    } catch (err) {
      return new BadRequestException(`Error getting Snowflake connection`)
    }
  }

  private async getSnowflake(): Promise<Connection> {
    if (!this.snowflakeConnection) {
      return this.connectSnowflake()
    }
    return this.snowflakeConnection
  }

  private async connectSnowflake() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = this.data.config.snowflake
    this.logger.log(`Connecting to Snowflake: ${JSON.stringify(rest)}`)
    return new Promise<Connection>((resolve, reject) => {
      snowflake.createConnection(this.data.config.snowflake).connect((err, conn) => {
        if (err) {
          this.logger.log(`Error connecting to Snowflake: ${err}`)
          return reject(err)
        }
        this.logger.log('Connected to Snowflake')
        this.snowflakeConnection = conn
        return resolve(this.snowflakeConnection)
      })
    })
  }

  private getCacheKey(query: string) {
    return createHash('md5').update(query).digest('hex')
  }

  private getTable(name: string) {
    return `${this.data.config.snowflake.database}.${this.data.config.snowflake.schema}.${name}`
  }
}
