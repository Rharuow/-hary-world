import { encodeSha256 } from '@/libs/bcrypt';
import {
  adminInMemory,
  adminsInMemory,
  clientInMemory,
  clientsInMemory,
  userInMemory,
  usersInMemory,
} from '@/libs/memory-cache';
import { MailService } from '@/mail/mail.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClientService {
  private readonly selectScope = {
    name: true,
    id: true,
    email: true,
    client: { select: { id: true, phone: true } },
    role: { select: { id: true, name: true } },
  };

  constructor(
    private readonly prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async createClient(
    data: Prisma.ClientCreateInput &
      Prisma.UserCreateInput & { roleId: string },
  ) {
    usersInMemory.clear();
    userInMemory.clear();
    adminInMemory.clear();
    adminsInMemory.clear();
    clientInMemory.clear();
    clientsInMemory.clear();
    try {
      const client = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: encodeSha256(data.password),
          roleId: data.roleId,
          client: {
            create: {
              ...(data.phone && { phone: data.phone }),
            },
          },
        },
      });
      await this.mailService.sendUserConfirmation({
        email: client.email,
        name: client.name,
        id: client.id,
      });
      return client;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getClient({ clientId, id }: { id: string; clientId: string }) {
    const reference =
      clientId + '-' + id + '-' + JSON.stringify(this.selectScope) + '-client';
    try {
      if (!clientInMemory.hasItem(reference)) {
        clientInMemory.storeExpiringItem(
          reference,
          await this.prisma.user.findUniqueOrThrow({
            where: { id, AND: { client: { id: clientId } } },
            select: this.selectScope,
          }),
          process.env.NODE_ENV === 'test' ? 5 : 3600 * 24, // if test env expire in 5 miliseconds else 1 day
        );
      }
      return clientInMemory.retrieveItemValue(reference);
    } catch (error) {
      throw new Error(error);
    }
  }

  async listClient() {
    const reference = JSON.stringify(this.selectScope) + '-users';
    try {
      if (!clientsInMemory.hasItem(reference)) {
        clientsInMemory.storeExpiringItem(
          reference,
          await this.prisma.user.findMany({
            where: {
              role: { name: 'CLIENT' },
            },
            select: this.selectScope,
          }),
          process.env.NODE_ENV === 'test' ? 5 : 3600 * 24, // if test env expire in 5 miliseconds else 1 day
        );
      }
      return clientsInMemory.retrieveItemValue(reference);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateClient({
    clientId,
    data,
    id,
  }: {
    data: Prisma.UserUpdateInput & Prisma.ClientUpdateInput;
    id: string;
    clientId: string;
  }) {
    const { name, password, ...client } = data;
    usersInMemory.clear();
    userInMemory.clear();
    adminInMemory.clear();
    adminsInMemory.clear();
    clientInMemory.clear();
    clientsInMemory.clear();
    try {
      return await this.prisma.user.update({
        where: { id, AND: { client: { id: clientId } } },
        data: {
          ...(name && { name }),
          ...(password && { password }),
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
