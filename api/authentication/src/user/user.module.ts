import { Module } from '@nestjs/common';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { PrismaService } from '@/prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [AdminController, UserController],
  providers: [AdminService, PrismaService, UserService],
})
export class UserModule {}
