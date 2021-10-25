import { UserService } from './../user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'abc',
    });
  }

  async validate(payload: { sub: User['id']; username: string }) {
    const user = await this.userService.findById(+payload.sub);
    if (!user) {
      throw new UnauthorizedException('Access unauthorized');
    }
    return user;
  }
}
