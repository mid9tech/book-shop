import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/updateUser.input';
import { UseGuards } from '@nestjs/common';
import {
  CurrentUser,
  JwtAccessAuthGuard,
  JwtAdminAuthGuard,
} from 'src/guard/jwt-auth.guard';
import { RequireActiveGuard } from 'src/guard/require-active.guard';
import { UserRefreshPasswordInput } from './dto/refreshPw.input';
import { ChangePasswordInput } from './dto/changePw.input';
import { CurrentUserInterface } from 'src/interfaces/current-user.interface';
import { UpdateUserStatusInput } from './dto/updateStatus.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => Boolean)
  @UseGuards(JwtAccessAuthGuard)
  async requireSendEmailVerifyUser(
    @CurrentUser() user: CurrentUserInterface,
  ): Promise<boolean> {
    return this.usersService.requireSendEmailVerifyUser(
      user.email,
      user.firstName,
      user.secretOtp,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAccessAuthGuard)
  async verifyUser(
    @CurrentUser() user: CurrentUserInterface,
    @Args('otp') otp: string,
  ): Promise<boolean> {
    // Verify OTP entered by the user
    return this.usersService.verifyUser(user.id, user.secretOtp, otp);
  }

  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAdminAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }

  @Query(() => User)
  @UseGuards(JwtAccessAuthGuard)
  getProfile(@CurrentUser() user: CurrentUserInterface) {
    return this.usersService.findOne(user.id);
  }

  @Query(() => User)
  @UseGuards(JwtAdminAuthGuard)
  adminGetProfile(@CurrentUser() user: CurrentUserInterface) {
    return this.usersService.adminFindOne(user.id);
  }

  @Mutation(() => User)
  @UseGuards(JwtAccessAuthGuard, RequireActiveGuard)
  updateProfile(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.usersService.update(user.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.remove(id);
  }

  @Mutation(() => Boolean)
  async requireSendEmailResetPassword(@Args('email') email: string) {
    return this.usersService.requireSendEmailResetPassword(email);
  }

  @Mutation(() => Boolean)
  async refreshUserPassword(
    @Args('userRefreshPasswordInput') data: UserRefreshPasswordInput,
  ) {
    return this.usersService.refreshUserPassword(
      data.id,
      data.token,
      data.password,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAccessAuthGuard)
  async changePassword(
    @CurrentUser() user: CurrentUserInterface,
    @Args('changePasswordInput') dto: ChangePasswordInput,
  ) {
    return this.usersService.changePassword(
      user.id,
      dto.currentPassword,
      dto.newPassword,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAdminAuthGuard)
  async updateUserStatus(
    @Args('updateUserStatusInput') updateUserStatusInput: UpdateUserStatusInput,
  ) {
    return await this.usersService.updateUserStatus(
      updateUserStatusInput.id,
      updateUserStatusInput.status,
    );
  }
}
