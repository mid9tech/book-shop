import { Module } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { PublishersResolver } from './publishers.resolver';
import { PublishersRepository } from './publishers.repository';
import { PublisherController } from './publisher.controller';

@Module({
  providers: [PublishersResolver, PublishersService, PublishersRepository],
  controllers: [PublisherController],
  exports: [PublishersService],
})
export class PublishersModule {}
