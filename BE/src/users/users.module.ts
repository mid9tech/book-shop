import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserRepository } from './user.repository';
import { OtpService } from '../shared/otp/otp.service';
import { UserController } from './user.controller';

@Module({
  providers: [UsersResolver, UsersService, UserRepository, OtpService],
  exports: [UserRepository, UsersService],
  controllers: [UserController],
})
export class UsersModule {}
