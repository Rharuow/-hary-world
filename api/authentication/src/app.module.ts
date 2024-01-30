import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AdminService } from './admin/admin.service';
import { ClientService } from './client/client.service';
import { UserController } from './user/user.controller';
import { AdminController } from './admin/admin.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, AdminController],
  providers: [
    AppService,
    PrismaService,
    AdminService,
    ClientService,
    UserService,
  ],
})
export class AppModule {}
