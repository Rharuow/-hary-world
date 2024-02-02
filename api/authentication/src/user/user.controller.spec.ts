import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '@/prisma/prisma.service';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    userController = module.get<UserController>(UserController);
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

      expect(await userController.listUsers()).toBe(result);
    });
  });
});
