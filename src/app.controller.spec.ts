import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mockConfig, MockConfigModule } from './config/__mocks__';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [MockConfigModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return expected string', () => {
      expect(appController.getHello()).toBe(
        `Hello from port: ${mockConfig.port}`,
      );
    });
  });
});
