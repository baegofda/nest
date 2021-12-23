import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  // 모듈에서 exports되어있는 부분들을 사용가능하게해준다.
  imports: [CatsModule, CatsModule],
  controllers: [CatsController, AppController],
  // 사용될 모듈들의 provider를 하나하나 추가하는건 좋지않은 패턴 [AppService, CatsService....]
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //forRoutes에 원하는 라우트들을 명시할 수 있음
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
