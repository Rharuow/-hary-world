import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';

export class Seed {
  private roleRootId?: string;

  constructor(private readonly prismaService: PrismaService) {}

  async createDefaultRoles() {
    try {
      const defaultRoles: Array<Prisma.RoleCreateInput> = [];
      const roles = await this.prismaService.role.findMany();

      const roleNames = roles.map((role) => role.name);

      if (
        roleNames.includes('ADMIN') &&
        roleNames.includes('CLIENT') &&
        roleNames.includes('ROOT')
      ) {
        this.roleRootId = roles.find((role) => role.name === 'ROOT')?.id;
        return;
      }

      !roleNames.includes('ADMIN') && defaultRoles.push({ name: 'ADMIN' });
      !roleNames.includes('CLIENT') && defaultRoles.push({ name: 'CLIENT' });
      !roleNames.includes('ROOT') && defaultRoles.push({ name: 'ROOT' });

      await this.prismaService.role.createMany({
        data: defaultRoles,
      });

      this.roleRootId = (
        await this.prismaService.role.findUniqueOrThrow({
          where: {
            name: 'ROOT',
          },
        })
      ).id;
      return;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createRootUser() {
    try {
      const rootUser = await this.prismaService.user.findUnique({
        where: {
          name: String(process.env.ROOT_USER_NAME),
        },
      });
      if (rootUser) return;
      return await this.prismaService.user.create({
        data: {
          name: String(process.env.ROOT_USER_NAME),
          password: String(process.env.ROOT_USER_PASSWORD),
          roleId: String(this.roleRootId),
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
