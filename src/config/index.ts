import { registerAs } from '@nestjs/config';

export interface IConfig {
  port: number;

  postgresUser: string;
  postgresPassword: string;
  postgresDb: string;
}

export default registerAs('config', (): IConfig => {
  return {
    port: +process.env.PORT || 8081,

    postgresUser: process.env.POSTGRES_USER,
    postgresPassword: process.env.POSTGRES_PASSWORD,
    postgresDb: process.env.POSTGRES_DB,
  };
});
