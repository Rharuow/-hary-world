import { encodeSha256 } from '@/libs/bcrypt';
import {
  adminInMemory,
  adminsInMemory,
  clientInMemory,
  clientsInMemory,
  userInMemory,
  usersInMemory,
} from '@/libs/memory-cache';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdminService {
  private readonly selectScope = {
    name: true,
    id: true,
    email: true,
    role: {
      select: {
        name: true,
        id: true,
      },
    },
    admin: {
      select: {
        id: true,
        phone: true,
      },
    },
  };
  constructor(private readonly prisma: PrismaService) {}

  async createAdmin(
    data: Omit<Prisma.AdminCreateInput, 'user'> &
      Omit<Prisma.UserCreateInput, 'role'> & { roleId: string },
  ) {
    try {
      userInMemory.clear();
      usersInMemory.clear();
      adminInMemory.clear();
      adminsInMemory.clear();
      clientInMemory.clear();
      clientsInMemory.clear();
      const admin = await this.prisma.user.create({
        data: {
          name: data.name,
          password: encodeSha256(data.password),
          email: data.email,
          roleId: data.roleId,
          admin: {
            create: {
              ...(data.phone && { phone: data.phone }),
            },
          },
        },
      });

      return admin;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAdmin({ adminId, id }: { id: string; adminId: string }) {
    const reference = adminId + '-' + id + '-' + 'admin';
    try {
      if (!adminInMemory.hasItem(reference)) {
        adminInMemory.storeExpiringItem(
          reference,
          await this.prisma.user.findUniqueOrThrow({
            where: { id, AND: { admin: { id: adminId } } },
            select: this.selectScope,
          }),
          process.env.NODE_ENV === 'test' ? 5 : 3600 * 24, // if test env expire in 5 miliseconds else 1 day
        );
      }
      return adminInMemory.retrieveItemValue(reference);
    } catch (error) {
      throw new Error(error);
    }
  }

  async listAdmin() {
    const reference = JSON.stringify(this.selectScope) + '-list-admin';
    try {
      if (!adminsInMemory.hasItem(reference)) {
        adminsInMemory.storeExpiringItem(
          reference,
          await this.prisma.user.findMany({
            where: {
              role: { name: 'ADMIN' },
            },
            select: this.selectScope,
          }),
          process.env.NODE_ENV === 'test' ? 5 : 3600 * 24, // if test env expire in 5 miliseconds else 1 day
        );
      }
      return adminsInMemory.retrieveItemValue(reference);
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
    const { name, password, email, ...admin } = data;
    userInMemory.clear();
    usersInMemory.clear();
    adminInMemory.clear();
    adminsInMemory.clear();
    clientInMemory.clear();
    clientsInMemory.clear();
    try {
      return await this.prisma.user.update({
        where: { id, AND: { admin: { id: adminId } } },
        data: {
          ...(name && { name }),
          ...(password && { password }),
          ...(email && { email }),
          ...(admin && {
            admin: {
              update: {
                data: admin,
              },
            },
          }),
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
