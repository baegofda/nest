import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 헤더에서 토큰을 추출한다.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // secretKey
      secretOrKey: 'secretKey',
      // 만료기간: 백엔드에서 프론트엔드로 넘겨줄때 해당 토큰의 만료기간이 있음
      ignoreExpiration: false,
    });
  }

  // async validate(payload) {}
}
