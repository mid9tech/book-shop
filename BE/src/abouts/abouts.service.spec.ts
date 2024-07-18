import { Test, TestingModule } from '@nestjs/testing';
import { AboutsService } from './abouts.service';
import { ABOUT_TYPE } from 'src/utils/const';

export const mockAbout = [
  {
    id: '1',
    title: 'title',
    description: 'description',
    image: 'image',
    status: true,
    type: ABOUT_TYPE.CHILD,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'title',
    description: 'description',
    image: 'image',
    status: true,
    type: ABOUT_TYPE.CHILD,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockAboutService = {
  create: jest.fn().mockResolvedValueOnce(mockAbout[0]),
  findAll: jest.fn().mockResolvedValueOnce(mockAbout),
  findOne: jest.fn().mockResolvedValueOnce(mockAbout[0]),
  update: jest.fn().mockResolvedValue(mockAbout[0]),
};

describe('AboutsService', () => {
  let service: AboutsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: AboutsService, useValue: mockAboutService }],
    }).compile();

    service = module.get<AboutsService>(AboutsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should returns about information', async () => {
      expect(
        await service.create({
          title: 'title',
          description: 'description',
          image: 'image',
          type: ABOUT_TYPE.CHILD,
        }),
      ).toEqual(mockAbout[0]);
    });
  });

  describe('findAll', () => {
    it('should returns all about information', async () => {
      expect(await service.findAll()).toEqual(mockAbout);
    });
  });

  describe('findOne', () => {
    it('should returns about information with id', async () => {
      expect(await service.findOne('1')).toEqual(mockAbout[0]);
    });
  });

  describe('update', () => {
    it('should returns about information updated', async () => {
      expect(
        await service.update('1', {
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
