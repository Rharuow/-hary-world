import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Seed } from './utils/seed';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  }); /* to make it throw an error instead of exit with the code 1 */
  app.setGlobalPrefix('api/v1');
  const seed = new Seed(new PrismaService());
  await seed.createDefaultRoles();
  await app.listen(3000);
}
bootstrap();
