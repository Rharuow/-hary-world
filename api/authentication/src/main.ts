import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { globalMiddleware } from './middleware/globalMiddleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  }); /* to make it throw an error instead of exit with the code 1 */
  app.use(globalMiddleware);
  await app.listen(3000);
}
bootstrap();
