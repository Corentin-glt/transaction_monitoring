import * as Joi from 'joi';

const variables = {
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'local')
    .required(),
  PORT: Joi.number().default(4000),
  DATABASE_URL: Joi.string(),
  BASE_URL_APP: Joi.string(),
  HOST_REDIS: Joi.string(),
  PORT_REDIS: Joi.number().default(6379),
};

export const validationSchema = Joi.object(variables);
