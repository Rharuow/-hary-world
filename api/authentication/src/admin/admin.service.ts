import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { encodeSha256 } from 'src/libs/bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async createAdmin(data: Prisma.AdminCreateInput & Prisma.UserCreateInput) {
    return await this.prisma.user.create({
      data: {
        name: data.name,
        password: encodeSha256(data.password),
        role: data.role,
        admin: {
          create: {
            ...(data.email && { email: data.email }),
            ...(data.phone && { phone: data.phone }),
          },
        },
      },
    });
  }
}
