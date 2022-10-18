const origins: string[] = process.env.API_CORS_ORIGINS?.includes(',')
  ? process.env.API_CORS_ORIGINS?.split(',')
  : [process.env.API_CORS_ORIGINS]

export const configuration = () => ({
  api: {
    cors: {
      origin: origins.length && origins[0] === '*' ? '*' : [process.env.WEB_URL, ...origins],
    },
    url: process.env.API_URL,
  },
  environment: process.env.NODE_ENV,
  host: process.env.HOST,
  port: parseInt(process.env.PORT, 10),
  prefix: 'api',
  snowflake: {
    account: process.env.SNOWFLAKE_ACCOUNT,
    database: process.env.SNOWFLAKE_DATABASE,
    password: process.env.SNOWFLAKE_PASSWORD,
    role: process.env.SNOWFLAKE_ROLE,
    schema: process.env.SNOWFLAKE_SCHEMA,
    username: process.env.SNOWFLAKE_USERNAME,
    warehouse: process.env.SNOWFLAKE_WAREHOUSE,
  },
})
