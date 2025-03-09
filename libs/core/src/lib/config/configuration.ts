const variables = {
  environment: process.env.NODE_ENV,
  port: process.env.PORT_GATEWAY,
  databaseUrl: process.env.DATABASE_URL,
  baseUrlApp: process.env.BASE_URL_APP,
  hostRedis: process.env.HOST_REDIS,
  portRedis: process.env.PORT_REDIS,
};

export const configuration = () => variables;
export type EnvironmentVariables = Record<
  keyof typeof variables,
  string
>;
