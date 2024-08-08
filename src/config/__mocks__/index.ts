import { Module } from '@nestjs/common';

import config, { IConfig } from '../index';

export const mockConfig: IConfig = {
  port: 8081,

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
