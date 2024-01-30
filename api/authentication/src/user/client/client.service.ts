import { encodeSha256 } from '@/libs/bcrypt';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async createClient(
    data: Prisma.ClientCreateInput &
      Prisma.UserCreateInput & { roleId: string },
  ) {
    try {
      return await this.prisma.user.create({
        data: {
          name: data.name,
          password: encodeSha256(data.password),
          roleId: data.roleId,
          client: {
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

  async getClient({ clientId, id }: { id: string; clientId: string }) {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: { id, AND: { client: { id: clientId } } },
        select: {
          name: true,
          id: true,
          client: { select: { id: true, phone: true, email: true } },
          role: { select: { id: true, name: true } },
        },
        // include: { client: true, role: true },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async listClient() {
    try {
      return await this.prisma.user.findMany({
        where: {
          role: { name: 'CLIENT' },
        },
        select: {
          name: true,
          id: true,
          client: {
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

  async updateClient({
    clientId,
    data,
    id,
  }: {
    data: Prisma.UserUpdateInput & { client: Prisma.ClientUpdateInput };
    id: string;
    clientId: string;
  }) {
    const { client, ...user } = data;
    try {
      return await this.prisma.user.update({
        where: { id, AND: { client: { id: clientId } } },
        data: {
          ...user,
          client: {
            update: {
              data: client,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
