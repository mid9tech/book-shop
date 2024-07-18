import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AboutsService } from './abouts.service';
import { About, RenderAbout } from './entities/about.entity';
import { CreateAboutInput } from './dto/create-about.input';
import { UpdateAboutInput } from './dto/update-about.input';
import { UseGuards } from '@nestjs/common';
import { JwtAdminAuthGuard } from 'src/guard/jwt-auth.guard';
import { ABOUT_TYPE } from 'src/utils/const';

@Resolver(() => About)
export class AboutsResolver {
  constructor(private readonly aboutsService: AboutsService) {}

  @Mutation(() => About)
  @UseGuards(JwtAdminAuthGuard)
  createAbout(@Args('createAboutInput') createAboutInput: CreateAboutInput) {
    return this.aboutsService.create(createAboutInput);
  }

  @Query(() => RenderAbout, { name: 'renderAbout' })
  async findAll() {
    const main = await this.aboutsService.findAll(ABOUT_TYPE.MAIN);
    const child = await this.aboutsService.findAll(ABOUT_TYPE.CHILD);
    const qAndA = await this.aboutsService.findAll(ABOUT_TYPE.Q_AND_A);

    return {
      main: main,
      child: child,
      qAndA: qAndA,
    };
  }

  @Query(() => [About], { name: 'abouts' })
  findByType() {
    return this.aboutsService.findAll();
  }

  @Query(() => About, { name: 'about' })
  @UseGuards(JwtAdminAuthGuard)
  findOne(@Args('id') id: string) {
    return this.aboutsService.findOne(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAdminAuthGuard)
  updateAbout(@Args('updateAboutInput') updateAboutInput: UpdateAboutInput) {
    return this.aboutsService.update(updateAboutInput.id, updateAboutInput);
  }
}
