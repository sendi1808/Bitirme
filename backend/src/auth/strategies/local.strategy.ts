import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'sicilNo'
    });
  }

  async validate(sicilNo: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(sicilNo, password);
    if (!user) {
      throw new UnauthorizedException('Geçersiz kimlik bilgileri');
    }
    return user;
  }
}