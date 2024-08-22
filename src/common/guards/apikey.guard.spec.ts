import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockConfig, MockConfigModule } from '../../config/__mocks__';
import { ApikeyGuard } from './apikey.guard';

describe('ApikeyGuard', () => {
  let apikeyGuard: ApikeyGuard;
  let mockContext: Partial<ExecutionContext>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [MockConfigModule],
      providers: [ApikeyGuard],
    }).compile();

    apikeyGuard = app.get<ApikeyGuard>(ApikeyGuard);
    mockContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          headers: {
            'api-key': mockConfig.clientApiKey,
          },
        }),
      }),
    };
  });

  it('should be defined', () => {
    // Act and Assert
    expect(apikeyGuard).toBeDefined();
  });

  it('should return true if API key matches', () => {
    // Act
    const result = apikeyGuard.canActivate(mockContext as ExecutionContext);

    // Assert
    expect(result).toBe(true);
  });

  it('should return false if API key does not match', () => {
    // Prepare
    (mockContext.switchToHttp().getRequest as jest.Mock).mockReturnValue({
      headers: {
        'api-key': 'wrong-api-key',
      },
    });

    // Act
    const result = apikeyGuard.canActivate(mockContext as ExecutionContext);

    // Assert
    expect(result).toBe(false);
  });
});
