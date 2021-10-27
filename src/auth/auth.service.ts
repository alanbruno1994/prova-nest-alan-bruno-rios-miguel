import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';
import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: AuthInput): Promise<AuthType> {
    const user = await this.userService.getUserByEmail(data.email);
    const validatePassword = compareSync(data.password, user.password);
    if (!validatePassword) {
      throw new UnauthorizedException('Incorrect Password');
    }
    const token = await this.jwtToken(user);
    return { user, token };
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = { userName: user.name, sub: user.id };
    return await this.jwtService.signAsync(payload);
  }
}
