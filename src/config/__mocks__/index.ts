import { Module } from '@nestjs/common';

import config, { IConfig } from '../index';

export const mockConfig: IConfig = {
  port: 8081,

  clientApiKey: '55307f96-9e9b-4175-974d-949a86bdc341',

  postgresHost: 'postgres',
  postgresPort: 5432,
  postgresUser: 'root',
  postgresPassword: 'password-here',
  postgresDb: 'generic-e-commerce',
};

@Module({
  providers: [
    {
      provide: config.KEY,
      useValue: mockConfig,
    },
  ],
  exports: [config.KEY],
})
export class MockConfigModule {}
