import { Controller, Get, Render } from '@nestjs/common';
import { AboutsService } from './abouts.service';
import { SITE_DOMAIN } from 'src/utils/const';

@Controller('/')
export class AboutsController {
  constructor(private readonly aboutService: AboutsService) {}

  @Get('/about')
  @Render('pages/about')
  async order() {
    const abouts = await this.aboutService.findAll();

    return {
      backend_base_url: SITE_DOMAIN,
      abouts: abouts,
    };
  }
}
