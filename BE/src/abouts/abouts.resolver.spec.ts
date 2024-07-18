import { Test, TestingModule } from '@nestjs/testing';
import { AboutsResolver } from './abouts.resolver';
import { AboutsService } from './abouts.service';
import { mockAbout, mockAboutService } from './abouts.service.spec';

describe('AboutsResolver', () => {
  let resolver: AboutsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AboutsResolver,
        {
          provide: AboutsService,
          useValue: mockAboutService,
        },
      ],
    }).compile();

    resolver = module.get<AboutsResolver>(AboutsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findAll', () => {
    it('should returns all about', async () => {
      expect(await resolver.findAll()).toEqual({
        main: undefined,
        child: undefined,
        qAndA: undefined,
      });
    });
  });

  describe('findByType', () => {
    it('should returns all about', async () => {
      expect(await resolver.findByType()).toEqual(undefined);
    });
  });

  describe('findOne', () => {
    it('should returns about with correct id', async () => {
      expect(await resolver.findOne('1')).toEqual(undefined);
    });
  });

  describe('update', () => {
    it('should returns about information updated', async () => {
      expect(
        await resolver.updateAbout({
          title: 'title',
          description: 'description',
          image: 'image',
          status: true,
          id: '1',
        }),
      ).toEqual(mockAbout[0]);
    });
  });
});
