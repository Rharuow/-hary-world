import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly selectScope = {
    select: {
      name: true,
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
    try {
      return await this.prisma.user.findMany({
        where: { NOT: { role: { name: 'ROOT' } } },
        select,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(id: string) {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUser(id: string, password?: boolean) {
    const select = { ...this.selectScope.select, password };
    try {
      return await this.prisma.user.findUnique({
        where: { id },
        select,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUserByName(name: string, password?: boolean) {
    const select = { ...this.selectScope.select, password };
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: { name },
        select,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
