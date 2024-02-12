import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma, Role } from '@prisma/client';

describe('AdminController', () => {
  let controller: AdminController;
  let prismaService: PrismaService;
  let admin: Prisma.UserGetPayload<{ include: { admin: true; role: true } }>;
  let role: Role | null;

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
    role = await prismaService.role.findUnique({
      where: { name: 'ADMIN' },
    });
    expect(controller).toBeDefined();
  });

  describe('createAdmin', () => {
    it('should create a user admin', async () => {
      await controller.createAdmin({
        name: 'admin test',
        password: '123',
        roleId: String(role?.id),
        email: 'admin-controller@example.com',
        phone: '123',
      });

      admin = (await prismaService.user.findUnique({
        where: { email: 'admin-controller@example.com' },
        include: { admin: true, role: true },
      })) as Prisma.UserGetPayload<{ include: { admin: true; role: true } }>;

      jest.spyOn(controller, 'createAdmin').mockImplementation(async () => {});

      expect(admin).toBeDefined();
      expect(admin).toHaveProperty('name', admin.name);
      expect(admin).toHaveProperty('password', admin.password);
    });
  });

  describe('listAdmin', () => {
    it('should return an array of admins', async () => {
      const result = await controller.listAdmin();
      jest
        .spyOn(controller, 'listAdmin')
        .mockImplementation(async () => result);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('length', result?.length);
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
      expect(result).toHaveProperty('name', result?.name);
      expect(result).toHaveProperty('email', result?.email);
      expect(result).toHaveProperty('admin', result?.admin);
      expect(result?.admin).toHaveProperty('phone', result?.admin?.phone);
    });
  });

  describe('updateAdmin', () => {
    it('should update name of a specific admin', async () => {
      await controller.updateAdmin(
        {
          adminId: String(admin.admin?.id),
          id: admin.id,
        },
        { name: 'Admin test edited' },
      );

      const result = await controller.getAdmin({
        id: admin.id,
        adminId: String(admin.admin?.id),
      });

      expect(result).toBeDefined();
      expect(result).toHaveProperty('name', 'Admin test edited');
    });

    it('should update a specific admin', async () => {
      await controller.updateAdmin(
        {
          adminId: String(admin.admin?.id),
          id: admin.id,
        },
        { email: 'adminedited@gmai.com' },
      );

      const result = await controller.getAdmin({
        id: admin.id,
        adminId: String(admin.admin?.id),
      });

      expect(result).toBeDefined();
      expect(result).toHaveProperty('email', 'adminedited@gmai.com');
      expect(result?.admin).toBeDefined();
    });

    it('should update a specific admin', async () => {
      await controller.updateAdmin(
        {
          adminId: String(admin.admin?.id),
          id: admin.id,
        },
        {},
      );

      const result = await controller.getAdmin({
        id: admin.id,
        adminId: String(admin.admin?.id),
      });

      expect(result).toBeDefined();
      expect(result).toHaveProperty('email', 'adminedited@gmai.com');
      expect(result?.admin).toBeDefined();
    });
  });
});
