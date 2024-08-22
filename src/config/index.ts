import { registerAs } from '@nestjs/config';

export interface IConfig {
  port: number;

  clientApiKey: string;

  postgresHost: string;
  postgresPort: number;
  postgresUser: string;
  postgresPassword: string;
  postgresDb: string;
}

export default registerAs('config', (): IConfig => {
  return {
    port: +process.env.PORT || 8081,

    clientApiKey: process.env.CLIENT_API_KEY,

    postgresHost: process.env.POSTGRES_HOST,
    postgresPort: +process.env.POSTGRES_PORT || 5432,
    postgresUser: process.env.POSTGRES_USER,
    postgresPassword: process.env.POSTGRES_PASSWORD,
    postgresDb: process.env.POSTGRES_DB,
  };
});
