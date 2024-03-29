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

@Injectable()
export class UserService {
  private readonly selectScope = {
    select: {
      name: true,
      email: true,
      id: true,
      role: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  };
  constructor(private readonly prisma: PrismaService) {}

  async listUsers(password?: boolean) {
    const select = { ...this.selectScope.select, password };
    const reference = JSON.stringify(select + '-users');
    try {
      if (!usersInMemory.hasItem(reference)) {
        usersInMemory.storeExpiringItem(
          reference,
          await this.prisma.user.findMany({
            where: { NOT: { role: { name: 'ROOT' } } },
            select,
          }),
          process.env.NODE_ENV === 'test' ? 5 : 3600 * 24, // if test env expire in 5 miliseconds else 1 day
        );
      }
      return usersInMemory.retrieveItemValue(reference);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(id: string) {
    try {
      usersInMemory.clear();
      userInMemory.clear();
      adminInMemory.clear();
      adminsInMemory.clear();
      clientInMemory.clear();
      clientsInMemory.clear();
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUser(id: string, password?: boolean) {
    const select = { ...this.selectScope.select, password };
    const reference = JSON.stringify(select);
    try {
      if (!userInMemory.hasItem(reference)) {
        userInMemory.storeExpiringItem(
          reference,
          await this.prisma.user.findUnique({
            where: { id },
            select,
          }),
          process.env.NODE_ENV === 'test' ? 5 : 3600 * 24, // if test env expire in 5 miliseconds else 1 day
        );
      }
      return userInMemory.retrieveItemValue(reference);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUserByEmail(email: string, password?: boolean, fields?: object) {
    const select = { ...this.selectScope.select, password, ...fields };
    const reference = JSON.stringify(select) + '-user-email';
    try {
      if (!userInMemory.hasItem(reference)) {
        userInMemory.storeExpiringItem(
          reference,
          await this.prisma.user.findUniqueOrThrow({
            where: { email },
            select,
          }),
          process.env.NODE_ENV === 'test' ? 5 : 3600 * 24, // if test env expire in 5 miliseconds else 1 day
        );
      }
      return userInMemory.retrieveItemValue(reference);
    } catch (error) {
      throw new Error(error);
    }
  }

  async confirmation(id: string) {
    try {
      const user = await this.prisma.user.findFirstOrThrow({ where: { id } });
      if (user.available) throw new Error('User already available');
      return await this.prisma.user.update({
        where: { id },
        data: {
          available: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
