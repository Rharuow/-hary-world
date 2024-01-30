import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AdminService } from './admin/admin.service';
import { ClientService } from './client/client.service';
import { UserController } from './user/user.controller';
import { AdminController } from './admin/admin.controller';
import { UserService } from './user/user.service';
import { Seed } from './utils/seed';

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
export class AppModule {
  constructor(private readonly prismaService: PrismaService) {
    this.runSeeds();
  }
  async runSeeds() {
    const seed = new Seed(this.prismaService);
    await seed.createDefaultRoles();
    await seed.createRootUser();
  }
}
