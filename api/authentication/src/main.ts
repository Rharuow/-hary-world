import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env.DATABASE_URL);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  }); /* to make it throw an error instead of exit with the code 1 */
  app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: [String(process.env.PLATAFORM_URL)] });
  await app.listen(Number(process.env.PORT) || 3000);
}
bootstrap();
