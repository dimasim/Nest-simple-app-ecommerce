// src/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY', // Harus SAMA dengan secret di auth.module.ts
    });
  }

  // Fungsi ini akan dipanggil setelah token berhasil divalidasi
  async validate(payload: any) {
    // Payload adalah hasil dekripsi dari token JWT
    // Apa yang di-return di sini akan ditambahkan ke object `request.user`
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}