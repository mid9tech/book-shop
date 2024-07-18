import { Module } from '@nestjs/common';
import { AboutsService } from './abouts.service';
import { AboutsResolver } from './abouts.resolver';
import { AboutsController } from './about.controller';

@Module({
  providers: [AboutsResolver, AboutsService],
  controllers: [AboutsController],
})
export class AboutsModule {}
