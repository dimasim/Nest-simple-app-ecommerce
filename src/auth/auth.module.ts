import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, // Impor UsersModule agar bisa memakai UsersService
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY', // GANTI DENGAN KUNCI RAHASIA YANG LEBIH KUAT
      signOptions: { expiresIn: '60m' }, // Token akan kedaluwarsa dalam 60 menit
    }),
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}