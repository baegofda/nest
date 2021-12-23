import { CatsModule } from './cats/cats.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as mongoose from 'mongoose';

@Module({
  // 모듈에서 exports되어있는 부분들을 사용가능하게해준다.
  imports: [
    CatsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [AppController],
  // 사용될 모듈들의 provider를 하나하나 추가하는건 좋지않은 패턴 [AppService, CatsService....]
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;

  configure(consumer: MiddlewareConsumer) {
    //forRoutes에 원하는 라우트들을 명시할 수 있음
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // 개발시 쿼리를 찍어보기위해
    mongoose.set('debug', this.isDev);
  }
}
