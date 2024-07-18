import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from 'src/guard/google-auth.guard';
import { CLIENT_SITE_DOMAIN } from 'src/utils/const';
import {
  DecodeFromEncryptedString,
  EncodeToEncryptedString,
} from 'src/utils/myCrypto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google/check')
  async checkOauthByGoogle(@Query('token') token: string) {
    const userData = DecodeFromEncryptedString(token);

    try {
      const result = await this.authService.checkOauthByGoogle(userData);

      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'Internal Server Error',
        error.message,
      );
    }
  }

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req, @Res() res) {
    return res.redirect(
      `${CLIENT_SITE_DOMAIN}/oauth/check?token=${EncodeToEncryptedString(req.user)}`,
    );
  }
}
