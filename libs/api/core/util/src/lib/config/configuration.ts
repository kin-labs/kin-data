const origins: string[] = process.env.API_CORS_ORIGINS?.includes(',')
  ? process.env.API_CORS_ORIGINS?.split(',')
  : [process.env.API_CORS_ORIGINS]

export const configuration = () => ({
  prefix: 'api',
  environment: process.env.NODE_ENV,
  host: process.env.HOST,
  port: parseInt(process.env.PORT, 10),
  apiUrl: process.env.API_URL,
  api: {
    cors: {
      origin: origins.length && origins[0] === '*' ? '*' : [process.env.WEB_URL, ...origins],
    },
  },
})
