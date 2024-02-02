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

      expect(result).toBeDefined();
    });
  });

  describe('findUser', () => {
    it('should return a specific user', async () => {
      const result = await service.findUser(user.id);
      jest.spyOn(service, 'findUser').mockImplementation(async () => result);

      expect(result).toBeDefined();
    });

    it('should return a specific user contained password attribute', async () => {
      const result = await service.findUser(user.id, true);
      jest.spyOn(service, 'findUser').mockImplementation(async () => result);

      expect(result).toBeDefined();

  describe('findUserByName', () => {
    it('should return a specific user', async () => {
      const result = await service.findUserByName(user.name);
      jest
        .spyOn(service, 'findUserByName')
        .mockImplementation(async () => result);

      expect(result).toBeDefined();
    });

    it('should return a specific user contained password attribute', async () => {
      const result = await service.findUserByName(user.name, true);
      jest
        .spyOn(service, 'findUserByName')
        .mockImplementation(async () => result);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('password', result?.password);
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

      expect(result).toBeDefined();
    });
  });
});
