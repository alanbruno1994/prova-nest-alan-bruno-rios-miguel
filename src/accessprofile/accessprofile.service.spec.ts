import { Test, TestingModule } from '@nestjs/testing';
import { AccessprofileService } from './accessprofile.service';

describe('AccessprofileService', () => {
  let service: AccessprofileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessprofileService],
    }).compile();

    service = module.get<AccessprofileService>(AccessprofileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
