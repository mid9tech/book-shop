import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  Render,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SITE_DOMAIN } from 'src/utils/const';

@Controller('/')
export class UserController {
  constructor(private readonly userService: UsersService) {}
  @Get('/')
  @Render('pages/login')
  login() {
    return {
      backend_base_url: SITE_DOMAIN,
    };
  }

  @Get('/user')
  @Render('pages/user')
  async publishers(
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    const users = await this.userService.findAll(limit, page);
    const total = await this.userService.count();

    return {
      backend_base_url: SITE_DOMAIN,
      limit: limit,
      page: page,
      users: users,
      total: total,
    };
  }
}
