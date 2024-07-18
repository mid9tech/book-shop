import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MyDBException } from 'src/utils/error';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';

@Injectable()
export class ContactsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createContactInput: CreateContactInput, ownerId: string) {
    try {
      const {
        fullName,
        district,
        province,
        phoneNumber,
        wards,
        detailAddress,
      } = createContactInput;

      return await this.databaseService.contact.create({
        data: {
          fullName,
          district,
          province,
          phoneNumber,
          wards,
          detailAddress,
          ownerId: ownerId,
        },
      });
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  async findMany(id: string) {
    return await this.databaseService.contact.findMany({
      where: { ownerId: id },
      orderBy: { updatedAt: 'desc' },
    });
  }

  findOne(id: string, ownerId: string) {
    return this.databaseService.contact.findFirst({
      where: {
        id: id,
        ownerId: ownerId,
      },
    });
  }

  async update(
    id: string,
    ownerId: string,
    updateContactInput: UpdateContactInput,
  ) {
    const result = await this.databaseService.contact.update({
      where: { id: id, ownerId: ownerId },
      data: updateContactInput,
    });

    return result ? true : false;
  }

  async remove(id: string, ownerId: string) {
    const result = await this.databaseService.contact.delete({
      where: { id: id, ownerId: ownerId },
    });

    return result ? true : false;
  }
}
