import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './entities/auth.entity';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, JwtRefreshAuthGuard } from 'src/guard/jwt-auth.guard';
import { LogoutResponse } from './entities/logout.entity';
import { AdminLoginInput } from './dto/adminLogin.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(@Args('loginInput') loginInput: LoginInput) {
    const result = await this.authService.login(loginInput);

    return result;
  }

  @Mutation(() => AuthResponse)
  async adminLogin(@Args('loginInput') loginInput: AdminLoginInput) {
    const result = await this.authService.adminLogin(loginInput);

    return result;
  }

  @Mutation(() => Boolean)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Mutation(() => LogoutResponse)
  async logout(@CurrentUser() user: any) {
    return { result: await this.authService.logout(user.id, user.token) };
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Mutation(() => AuthResponse)
  async refreshAccessToken(@CurrentUser() user: any) {
    await this.authService.validateUserByJwtRefreshToken(user.id, user.token);

    return this.authService.refreshAccessToken(user.id, user.role);
  }
}
