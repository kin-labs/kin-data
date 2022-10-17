import * as Joi from 'joi'

export const validationSchema = Joi.object({
  API_URL: Joi.string().default(`http://${process.env.HOST || 'localhost'}:${process.env.PORT}/api`),
  ETHERSCAN_API_KEY: Joi.string().required(),
  HOST: Joi.string().alphanum().default('localhost'),
  NODE_ENV: Joi.string().valid('development', 'production', 'test'),
  PORT: Joi.number().default(4000),
  SNOWFLAKE_ACCOUNT: Joi.string().required(),
  SNOWFLAKE_DATABASE: Joi.string().required(),
  SNOWFLAKE_PASSWORD: Joi.string().required(),
  SNOWFLAKE_ROLE: Joi.string().required(),
  SNOWFLAKE_SCHEMA: Joi.string().required(),
  SNOWFLAKE_USERNAME: Joi.string().required(),
  SNOWFLAKE_WAREHOUSE: Joi.string().required(),
})
