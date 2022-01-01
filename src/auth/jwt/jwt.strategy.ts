import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Payload } from './jwt.payload';
import { CatsRepository } from 'src/cats/cats.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      // 헤더에서 토큰을 추출한다.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // secretKey
      secretOrKey: process.env.JWT_SECRET,
      // 만료기간: 백엔드에서 프론트엔드로 넘겨줄때 해당 토큰의 만료기간이 있음
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );

    console.log('validate', cat);

    if (cat) {
      return cat; //request.user
    } else {
      console.log('validate');
      throw new UnauthorizedException('접근 오류');
    }
  }
}
