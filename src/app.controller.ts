import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

// 소비자
@Controller()
export class AppController {
  // 의존성 주입 (공급자) : nest의 class는 모두 공급자로 취급
  //module에서 providers에 선언이 되어야함 그리고 Injectable()해야함
  // 생성자에서 초기화하지않고 바로 사용함으로써 의존성을 주입한다 (DI)
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return 'hello world';
  }
}
