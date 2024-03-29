import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '@/prisma/prisma.service';
import { ROLE, Role, User } from '@prisma/client';

type UserWithCreatedAt = {
  role: {
    name: ROLE;
    id: string;
  };
  email: string;
  name: string;
  id: string;
  password: string;
  createdAt: string;
};

describe('UserService', () => {
  let service: UserService;
  let user: Pick<
    User & { role: Pick<Role, 'name' | 'id'> },
    'id' | 'name' | 'role' | 'email'
  >;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', async () => {
    const role = await prismaService.role.findUnique({
      where: { name: 'ADMIN' },
    });
    user = await prismaService.user.create({
      data: {
        name: 'User test service',
        password: '123',
        email: 'user-service@example.com',
        roleId: String(role?.id),
      },
      include: { role: true },
    });
    expect(service).toBeDefined();
  });

  describe('listUsers', () => {
    it('should return an array of users', async () => {
      const result = await service.listUsers();
      jest.spyOn(service, 'listUsers').mockImplementation(async () => result);

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
      expect(result).toHaveProperty('password', result?.password);
    });
  });

  describe('findUserByEmail', () => {
    it('should return a specific user', async () => {
      const result = await service.findUserByEmail(user.email);
      jest
        .spyOn(service, 'findUserByEmail')
        .mockImplementation(async () => result);

      expect(result).toBeDefined();
    });

    it('should return a specific user contained password attribute', async () => {
      const result = await service.findUserByEmail(user.email, true);
      jest
        .spyOn(service, 'findUserByEmail')
        .mockImplementation(async () => result);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('password', result?.password);
    });

    it('should return a specific user without password attribute and ', async () => {
      const result = (await service.findUserByEmail(user.email, true, {
        createdAt: true,
      })) as UserWithCreatedAt;

      jest
        .spyOn(service, 'findUserByEmail')
        .mockImplementation(async () => result);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('password', result?.password);
      expect(result).toHaveProperty('createdAt', result?.createdAt);
    });
  });

  describe('deleteUser', () => {
    it('should delete and return a specific user', async () => {
      const result = await service.deleteUser(user.id);
      jest.spyOn(service, 'deleteUser').mockImplementation(async () => result);
      const userDeleted = await prismaService.user.findUnique({
        where: { id: user.id },
      });

      expect(result).toBeDefined();
      expect(userDeleted).toBeNull();
    });
  });
});
