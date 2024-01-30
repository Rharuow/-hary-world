import { encodeSha256 } from '@/libs/bcrypt';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async createAdmin(
    data: Prisma.AdminCreateInput & Prisma.UserCreateInput & { roleId: string },
  ) {
    try {
      return await this.prisma.user.create({
        data: {
          name: data.name,
          password: encodeSha256(data.password),
          roleId: data.roleId,
          admin: {
            create: {
              ...(data.email && { email: data.email }),
              ...(data.phone && { phone: data.phone }),
            },
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserByName(name: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        name,
      },
      include: {
        role: true,
        admin: true,
      },
    });

    if (!user) {
      // Handle the case where the user is not found.
      throw new Error(`User with name ${name} not found`);
    }

    // Assuming that `admin` and `client` properties are optional in the return type.
    return {
      ...user,
      // Additional properties specific to your return type (e.g., Admin or Client).
    };
  }

  async getAdmin({ adminId, id }: { id: string; adminId: string }) {
    console.warn('adminId', adminId);
    console.warn('id', id);

    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: { id, AND: { admin: { id: adminId } } },
        select: {
          name: true,
          id: true,
          admin: { select: { id: true, phone: true, email: true } },
          role: { select: { id: true, name: true } },
        },
        // include: { admin: true, role: true },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async listAdmin() {
    try {
      return await this.prisma.user.findMany({
        where: {
          role: { name: 'ADMIN' },
        },
        select: {
          name: true,
          id: true,
          admin: {
            select: {
              id: true,
              phone: true,
              email: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
