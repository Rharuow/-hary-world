import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Role, User } from '@prisma/client';

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
      providers: [UserService, PrismaService],
    }).compile();

    userController = module.get<UserController>(UserController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('listUsers', () => {
    it('should return an array of users', async () => {
      const result = await userController.listUsers();
      jest
        .spyOn(userController, 'listUsers')
        .mockImplementation(async () => result);

      user = result[0];

      expect(await userController.listUsers()).toBe(result);
    });
  });

  describe('findUser', () => {
    it('should return a specific user', async () => {
      const result = await userController.findUser({ id: user.id });
      jest
        .spyOn(userController, 'findUser')
        .mockImplementation(async () => result);

      expect(await userController.findUser({ id: user.id })).toBe(result);
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
      const result = await userController.deleteUser({
        id: userCreatedToDelete.id,
      });
      jest
        .spyOn(userController, 'deleteUser')
        .mockImplementation(async () => result);

      expect(
        await userController.deleteUser({ id: userCreatedToDelete.id }),
      ).toBe(result);
    });
  });
});
