import { Test, TestingModule } from '@nestjs/testing';
import { AccessprofileResolver } from './accessprofile.resolver';

describe('AccessprofileResolver', () => {
  let resolver: AccessprofileResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessprofileResolver],
    }).compile();

    resolver = module.get<AccessprofileResolver>(AccessprofileResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
