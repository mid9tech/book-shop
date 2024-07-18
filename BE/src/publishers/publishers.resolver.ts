import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PublishersService } from './publishers.service';
import { Publisher } from './entities/publisher.entity';
import { CreatePublisherInput } from './dto/create-publisher.input';
import { UpdatePublisherInput } from './dto/update-publisher.input';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAdminAuthGuard } from 'src/guard/jwt-auth.guard';
import { CurrentUserInterface } from 'src/interfaces/current-user.interface';

@Resolver(() => Publisher)
export class PublishersResolver {
  constructor(private readonly publishersService: PublishersService) {}

  @Mutation(() => Publisher)
  @UseGuards(JwtAdminAuthGuard)
  createPublisher(
    @Args('createPublisherInput') createPublisherInput: CreatePublisherInput,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.publishersService.create(user.id, createPublisherInput);
  }

  @Query(() => [Publisher], { name: 'publishers' })
  findAll() {
    return this.publishersService.findMany();
  }

  @Query(() => Publisher, { name: 'publisher' })
  findOne(@Args('id') id: string) {
    return this.publishersService.findOne(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAdminAuthGuard)
  updatePublisher(
    @Args('updatePublisherInput') updatePublisherInput: UpdatePublisherInput,
  ) {
    return this.publishersService.update(
      updatePublisherInput.id,
      updatePublisherInput,
    );
  }
}
