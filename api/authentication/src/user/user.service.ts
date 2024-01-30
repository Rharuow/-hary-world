import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async listUsers() {
    try {
      return await this.prisma.user.findMany({
        where: { NOT: { role: { name: 'ROOT' } } },
        select: {
          id: true,
          name: true,
          role: {
            select: {
              name: true,
              id: true,
            },
          },
        },
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

  async findUser(id: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
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
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
