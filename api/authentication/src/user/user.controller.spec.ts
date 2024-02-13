import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

describe('UserController', () => {
  let userController: UserController;
  let prismaService: PrismaService;
  let user: Pick<
    User & { role: Pick<Role, 'name' | 'id'> },
    'id' | 'name' | 'role'
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService, JwtService],
    }).compile();

    userController = module.get<UserController>(UserController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', async () => {
    const role = await prismaService.role.findUnique({
      where: { name: 'ADMIN' },
    });
    user = await prismaService.user.create({
      data: {
        name: 'User test controller',
        email: 'user-controller@example.com',
        password: '123',
        roleId: String(role?.id),
      },
      include: { role: true },
    });
    expect(userController).toBeDefined();
  });

  describe('listUsers', () => {
    it('should return an array of users', async () => {
      const result = await userController.listUsers();
      jest
        .spyOn(userController, 'listUsers')
        .mockImplementation(async () => result);

      expect(result).toBeDefined();
    });
  });

  describe('findUser', () => {
    it('should return a specific user', async () => {
      const result = await userController.findUser({ id: user.id });
      jest
        .spyOn(userController, 'findUser')
        .mockImplementation(async () => result);

      expect(result).toBeDefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete and return a specific user', async () => {
      const result = await userController.deleteUser({
        id: user.id,
      });
      jest
        .spyOn(userController, 'deleteUser')
        .mockImplementation(async () => result);

      expect(result).toBeDefined();
    });
  });
});
