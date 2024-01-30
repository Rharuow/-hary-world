import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AdminService } from './admin/admin.service';
import { ClientService } from './client/client.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, AdminService, ClientService],
})
export class AppModule {}
