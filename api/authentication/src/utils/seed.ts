import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';

export class Seed {
  constructor(private readonly prismaService: PrismaService) {}

  async createDefaultRoles() {
    const defaultRoles: Array<Prisma.RoleCreateInput> = [];
    const roles = (
      await this.prismaService.role.findMany({
        select: { name: true },
      })
    ).map((role) => role.name);

    if (
      roles.includes('ADMIN') &&
      roles.includes('CLIENT') &&
      roles.includes('ROOT')
    )
      return;

    !roles.includes('ADMIN') && defaultRoles.push({ name: 'ADMIN' });
    !roles.includes('CLIENT') && defaultRoles.push({ name: 'CLIENT' });
    !roles.includes('ROOT') && defaultRoles.push({ name: 'ROOT' });

    return await this.prismaService.role.createMany({
      data: defaultRoles,
    });
  }
}
