import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ErrorsController } from './errors/errors.controller';

@Module({
  imports: [CatsModule],
  controllers: [AppController, ErrorsController],
  providers: [AppService],
})
export class AppModule {}
