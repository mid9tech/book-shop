import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OtpService {
  constructor(private readonly databaseService: DatabaseService) {}

  async generateSecret(id: string) {
    const secret = speakeasy.generateSecret({ length: 20 });
    await this.databaseService.user.update({
      where: { id: id },
      data: { secretOtp: secret.base32 },
    });
  }

  async generateOtp(secret: string): Promise<string> {
    const token = speakeasy.totp({
      secret: secret,
      encoding: 'base32',
    }); // Your secret generation logic

    return token;
  }

  async verifyOtp(secret: string, otp: string): Promise<boolean> {
    const result = speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: otp,
      window: 2, // Allowable drift, in seconds
    });

    return result;
  }
}
