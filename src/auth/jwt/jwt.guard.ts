import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// 가드에서 strategy가 저절로 실행이 된다.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
