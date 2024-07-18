import { Injectable } from '@nestjs/common';
import { CreateAboutInput } from './dto/create-about.input';
import { UpdateAboutInput } from './dto/update-about.input';
import { DatabaseService } from 'src/database/database.service';
import { MyDBException } from 'src/utils/error';
import { ABOUT_TYPE } from 'src/utils/const';

@Injectable()
export class AboutsService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createAboutInput: CreateAboutInput) {
    try {
      return this.databaseService.about.create({ data: createAboutInput });
    } catch (error) {
      return new MyDBException(error.message);
    }
  }

  findAll(type?: ABOUT_TYPE) {
    try {
      return this.databaseService.about.findMany({
        where: { status: true, type: type },
      });
    } catch (error) {
      return new MyDBException(error.message);
    }
  }

  findOne(id: string) {
    try {
      return this.databaseService.about.findFirst({ where: { id: id } });
    } catch (error) {
      return new MyDBException(error.message);
    }
  }

  async update(id: string, updateAboutInput: UpdateAboutInput) {
    try {
      const isOk = await this.databaseService.about.update({
        where: { id: id },
        data: updateAboutInput,
      });

      return isOk ? true : false;
    } catch (error) {
      return new MyDBException(error.message);
    }
  }
}
