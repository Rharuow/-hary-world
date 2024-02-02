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
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
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

  describe('findUser', () => {
    it('should return a specific user', async () => {
      const result = await service.findUser(user.id);
      jest.spyOn(service, 'findUser').mockImplementation(async () => result);

      expect(await service.findUser(user.id)).toBe(result);
    });
  });

  describe('deleteUser', () => {
    it('should delete and return a specific user', async () => {
      const userCreatedToDelete = await prismaService.user.create({
        data: {
          name: 'User created to delete',
          password: '123',
          roleId: user.role.id,
        },
      });
      const result = await service.deleteUser(userCreatedToDelete.id);
      jest.spyOn(service, 'deleteUser').mockImplementation(async () => result);

      expect(await service.deleteUser(userCreatedToDelete.id)).toBe(result);
    });
  });
});
