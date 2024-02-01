import { Module } from '@nestjs/common';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { PrismaService } from '@/prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientController } from './client/client.controller';
import { ClientService } from './client/client.service';

@Module({
  controllers: [ClientController, AdminController, UserController],
  providers: [AdminService, PrismaService, UserService, ClientService],
  exports: [UserService],
})
export class UserModule {}
