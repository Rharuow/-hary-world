import { encodeSha256 } from '@/libs/bcrypt';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async createAdmin(
    data: Omit<Prisma.AdminCreateInput, 'user'> &
      Omit<Prisma.UserCreateInput, 'role'> & { roleId: string },
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

  async getAdmin({ adminId, id }: { id: string; adminId: string }) {
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

  async updateAdmin({
    adminId,
    data,
    id,
  }: {
    data: Prisma.UserUpdateInput & Omit<Prisma.AdminUpdateInput, 'user'>;
    id: string;
    adminId: string;
  }) {
    const { ...user }: Prisma.UserUpdateInput = data;
    const { ...admin }: Prisma.AdminUpdateInput = data;

    console.log('user = ', user);
    console.log('admin = ', admin);

    // try {
    //   return await this.prisma.user.update({
    //     where: { id, AND: { admin: { id: adminId } } },
    //     data: {
    //       ...(user && user),
    //       ...(admin && {
    //         admin: {
    //           update: {
    //             data: admin,
    //           },
    //         },
    //       }),
    //     },
    //   });
    // } catch (error) {
    //   throw new Error(error);
    // }
  }
}
