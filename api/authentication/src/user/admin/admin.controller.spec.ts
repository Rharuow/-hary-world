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
      },
      include: { role: true, admin: true },
    });
    expect(admin).toBeDefined();
    expect(controller).toBeDefined();
  });
});
