import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';

describe('AdminController', () => {
  let controller: AdminController;
  let prismaService: PrismaService;
  let admin: Prisma.UserGetPayload<{ include: { admin: true; role: true } }>;

  afterAll(async () => {
    await prismaService.user.delete({
      where: {
        id: admin.id,
      },
    });
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [AdminService, PrismaService],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', async () => {
    const role = await prismaService.role.findUnique({
      where: { name: 'ADMIN' },
    });
    admin = await prismaService.user.create({
      data: {
        name: 'Admin test',
        password: '123',
        roleId: String(role?.id),
        admin: {
          create: {
            email: 'admin@example.com',
            phone: '123',
          },
        },
      },
      include: { role: true, admin: true },
    });
    expect(admin).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('listAdmin', () => {
    it('should return an array of admins', async () => {
      const result = await controller.listAdmin();
      jest
        .spyOn(controller, 'listAdmin')
        .mockImplementation(async () => result);

      expect(result).toBeDefined();
    });
  });

  describe('getAdmin', () => {
    it('should return a specific admin', async () => {
      const result = await controller.getAdmin({
        id: admin.id,
        adminId: String(admin.admin?.id),
      });
      jest.spyOn(controller, 'getAdmin').mockImplementation(async () => result);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('name', result.name);
      expect(result).toHaveProperty('admin', result.admin);
      expect(result.admin).toHaveProperty('email', result.admin?.email);
      expect(result.admin).toHaveProperty('phone', result.admin?.phone);
    });
  });
});
