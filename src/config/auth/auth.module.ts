import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { Member } from '../entities/member.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [process.env.NODE_ENV === 'production' ? path.join(process.cwd(), 'config', '.env.production') : path.join(process.cwd(), 'config', '.env.development')],
      isGlobal: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),

    TypeOrmModule.forFeature([Member]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: 'efofhieeiir3r3939r39ry8f7ggawjrpu308y7gjcaoeir9ur8yfhsoujjoaie930w8ryiufdhjksdwhegy34tu89gredrisueywghqju', //process.env.JWT_SECRET,
        signOptions: { expiresIn: '30d' }, //'1y'
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, TypeOrmModule, JwtModule, JwtStrategy],
})
export class AuthModule {}
