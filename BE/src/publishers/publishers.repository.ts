import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreatePublisherInput } from './dto/create-publisher.input';
import { UpdatePublisherInput } from './dto/update-publisher.input';

@Injectable()
export class PublishersRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createdBy: string, createPublisherInput: CreatePublisherInput) {
    const { name, description, avatar, phoneNumber, address } =
      createPublisherInput;

    return this.databaseService.publisher.create({
      data: { name, description, avatar, address, phoneNumber, createdBy },
    });
  }

  count() {
    return this.databaseService.user.count();
  }

  findMany(limit?: number, offset?: number) {
    return this.databaseService.publisher.findMany({
      take: limit,
      skip: offset,
      where: { status: true },
    });
  }

  findOne(id: string) {
    return this.databaseService.publisher.findFirst({
      where: { id: id, status: true },
    });
  }

  async update(id: string, updatePublisherInput: UpdatePublisherInput) {
    const result = await this.databaseService.publisher.update({
      where: { id: id },
      data: updatePublisherInput,
    });

    return result ? true : false;
  }
}
