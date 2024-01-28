import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MiddlewareCatsClass } from './middleware/class';
import { functionCatMiddleware } from './middleware/function';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiddlewareCatsClass, functionCatMiddleware)
      .forRoutes({ path: '/cats*', method: RequestMethod.GET });
  }
}
