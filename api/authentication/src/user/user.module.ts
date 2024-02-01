import { Module } from '@nestjs/common';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { PrismaService } from '@/prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientController } from './client/client.controller';
import { ClientService } from './client/client.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/auth/auth.guard';

@Module({
  controllers: [ClientController, AdminController, UserController],
  providers: [
    AdminService,
    PrismaService,
    UserService,
    ClientService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  exports: [UserService],
})
export class UserModule {}
