import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/updateUser.input';
import {
  MyBadRequestException,
  MyDBException,
  MyUnAuthorizedException,
} from 'src/utils/error';
import { UserRepository } from './user.repository';
import { USER_STATUS, GenKey, TYPE_KEY } from 'src/utils/const';
import { OtpService } from '../shared/otp/otp.service';
import { MailerService } from '@nestjs-modules/mailer';
import {
  NewNotificationDetectChangePasswordEmailOption,
  NewRefreshPasswordEmailOption,
  NewVerificationEmailOption,
} from 'src/utils/templateEmail';
import { MyNotFoundException } from 'src/utils/error';
import { CacheService } from 'src/database/cache.service';
import { HashPW, IsCorrectPW } from 'src/utils/hasher';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly otpService: OtpService,
    private readonly mailerService: MailerService,
    private readonly cacheService: CacheService,
  ) {}

  count() {
    return this.userRepository.count();
  }

  findAll(limit?: number, page?: number) {
    const offset = limit && page ? (page - 1) * limit : 0;

    return this.userRepository.find(limit, offset);
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOneById(id);

      if (!user) {
        throw new MyDBException('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async adminFindOne(id: string) {
    try {
      const user = await this.userRepository.findAdminById(id);

      if (!user) {
        throw new MyDBException('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneByEmail(email);

      if (!user) {
        throw new MyDBException('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.userRepository.updateOne(id, updateUserInput);

    return user;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async updateUserStatus(id: string, status: USER_STATUS) {
    await this.userRepository.updateOne(id, { status: status });

    return true;
  }

  async requireSendEmailVerifyUser(
    userEmail: string,
    userName: string,
    userSecretOtp: string,
  ): Promise<boolean> {
    const otp = await this.otpService.generateOtp(userSecretOtp);

    // Send the OTP to the user via email
    this.mailerService
      .sendMail(NewVerificationEmailOption(userEmail, userName, otp))
      .catch((err) => {
        console.log(err);
      });

    return true;
  }

  async verifyUser(
    userId: string,
    userSecretOtp: string,
    otp: string,
  ): Promise<boolean> {
    // Verify OTP entered by the user
    const otpIsValid = this.otpService.verifyOtp(userSecretOtp, otp);

    if (otpIsValid) {
      await this.userRepository.updateOne(userId, {
        status: USER_STATUS.ACTIVE,
      });
    }

    return otpIsValid;
  }

  async requireSendEmailResetPassword(email: string) {
    const user = await this.userRepository.findOneByEmail(email);

    if (!user) {
      throw new MyNotFoundException('User not found!');
    }

    const token = Date.now() % 100000;

    await this.cacheService.set(
      GenKey(user.id, TYPE_KEY.REFRESH_PASSWORD),
      token,
      {
        ttl: 1000 * 60 * 30,
      },
    ); // expired in 30 minutes

    this.mailerService
      .sendMail(
        NewRefreshPasswordEmailOption(
          user.email,
          user.firstName,
          user.id,
          token,
        ),
      )
      .catch((err) => console.log(err));
    return true;
  }

  async refreshUserPassword(
    userId: string,
    token: string,
    password: string,
  ): Promise<boolean> {
    const systemToken = await this.cacheService.get(
      GenKey(userId, TYPE_KEY.REFRESH_PASSWORD),
    );

    if (token === systemToken) {
      throw new MyBadRequestException('Your token is expired or invalid.');
    }

    const user = await this.userRepository.findOneById(userId);

    const hashPw = await HashPW(password, user.salt);

    await this.userRepository.updateOne(userId, { password: hashPw });
    return true;
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.userRepository.findOneById(userId);

    if (!IsCorrectPW(user.password, currentPassword)) {
      throw new MyUnAuthorizedException('Invalid password!');
    }
    const hashPw = await HashPW(newPassword, user.salt);

    await this.userRepository.updateOne(user.id, { password: hashPw });

    const token = Date.now() % 100000;

    await this.cacheService.set(
      GenKey(user.id, TYPE_KEY.REFRESH_PASSWORD),
      token,
      {
        ttl: 1000 * 60 * 30,
      },
    ); // expired in 30 minutes

    this.mailerService
      .sendMail(
        NewNotificationDetectChangePasswordEmailOption(
          user.email,
          user.name,
          user.id,
          token,
        ),
      )
      .catch(() => {});

    return true;
  }
}
