// jwt.strategy.ts

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { MyUnAuthorizedException } from 'src/utils/error';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET_ACCESS_TOKEN_KEY'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUserByPayload(payload);

    if (!user) {
      throw new MyUnAuthorizedException('Invalid access token');
    }

    user.role = payload.role;

    return user;
  }
}

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET_ACCESS_TOKEN_KEY'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateAdmin(payload);

    if (!user) {
      throw new MyUnAuthorizedException('Invalid access token');
    }

    user.role = payload.role;

    return user;
  }
}
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET_ACCESS_REFRESH_KEY'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUserByPayload(payload);

    if (!user) {
      throw new MyUnAuthorizedException('Invalid JWT');
    }

    user.role = payload.role;

    return user;
  }
}
