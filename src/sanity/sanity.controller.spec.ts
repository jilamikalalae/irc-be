import { Test, TestingModule } from '@nestjs/testing';
import { SanityController } from './sanity.controller';
import { SanityService } from './sanity.service';

describe('SanityController', () => {
  let controller: SanityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SanityController],
      providers: [SanityService],
    }).compile();

    controller = module.get<SanityController>(SanityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
