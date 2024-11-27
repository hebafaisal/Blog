/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || "e1d6f937b2f4b0c2d7d6165e45153cbb1ab13e1ad1e7d7f7f0c6fc80b1be35e03ee7b9ef4012f27e22c8b15b144b4e32",
    });
  }

  async validate(payload: any) {
     return { id: payload.sub, username: payload.username }; 
  }
}
