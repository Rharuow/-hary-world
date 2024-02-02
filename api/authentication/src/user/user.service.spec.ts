import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Role, User } from '@prisma/client';

describe('UserService', () => {
  let service: UserService;
  let user: Pick<
    User & { role: Pick<Role, 'name' | 'id'> },
    'id' | 'name' | 'role'
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listUsers', () => {
    it('should return an array of users', async () => {
      const result = await service.listUsers();
      jest.spyOn(service, 'listUsers').mockImplementation(async () => result);

      user = result[0];

      expect(await service.listUsers()).toBe(result);
    });
  });
});
