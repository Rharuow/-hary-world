import { Prisma, Role } from '@prisma/client';
import { MemoryCache } from 'memory-cache-node';

const TIMETOEXPIRECACHE = process.env.NODE_ENV === 'test' ? 5 : 60 * 60; // 1 hour to expire items

export const userInMemory = new MemoryCache<
  string,
  Prisma.UserGetPayload<{
    select: {
      name: true;
      email: true;
      password?: boolean;
      id: true;
      role: { select: { name: true; id: true } };
    };
  }> | null
>(
  TIMETOEXPIRECACHE,
  100, // number of items
);

export const usersInMemory = new MemoryCache<
  string,
  Array<
    Prisma.UserGetPayload<{
      select: {
        name: true;
        email: true;
        password?: boolean;
        id: true;
        role: { select: { name: true; id: true } };
      };
    }>
  >
>(
  TIMETOEXPIRECACHE,
  100, // number of items
);

export const adminInMemory = new MemoryCache<
  string,
  Prisma.UserGetPayload<{
    select: {
      name: true;
      email: true;
      id: true;
      role: { select: { name: true; id: true } };
      admin: { select: { phone: true; id: true } };
    };
  }>
>(
  TIMETOEXPIRECACHE,
  100, // number of items
);

export const adminsInMemory = new MemoryCache<
  string,
  Array<
    Prisma.UserGetPayload<{
      select: {
        name: true;
        email: true;
        id: true;
        role: { select: { name: true; id: true } };
        admin: { select: { phone: true; id: true } };
      };
    }>
  >
>(
  TIMETOEXPIRECACHE,
  100, // number of items
);

export const clientInMemory = new MemoryCache<
  string,
  Prisma.UserGetPayload<{
    select: {
      name: true;
      id: true;
      email: true;
      role: { select: { name: true; id: true } };
      client: { select: { phone: true; id: true } };
    };
  }>
>(
  TIMETOEXPIRECACHE,
  100, // number of items
);

export const clientsInMemory = new MemoryCache<
  string,
  Array<
    Prisma.UserGetPayload<{
      select: {
        name: true;
        id: true;
        email: true;
        role: { select: { name: true; id: true } };
        client: { select: { phone: true; id: true } };
      };
    }>
  >
>(
  TIMETOEXPIRECACHE,
  100, // number of items
);

export const totalUsersInMemory = new MemoryCache<string, number>(
  TIMETOEXPIRECACHE,
  100, // number of items
);

export const rolesInMemory = new MemoryCache<string, Array<Role>>(
  TIMETOEXPIRECACHE,
  100,
);

export const roleInMemory = new MemoryCache<string, Role>(TIMETOEXPIRECACHE, 4);
