import { Injectable } from '@nestjs/common';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { ContactsRepository } from './contacts.repository';

@Injectable()
export class ContactsService {
  constructor(private readonly contactsRepository: ContactsRepository) {}

  create(createContactInput: CreateContactInput, ownerId: string) {
    return this.contactsRepository.create(createContactInput, ownerId);
  }

  findAll(ownerId: string) {
    return this.contactsRepository.findMany(ownerId);
  }

  findOne(id: string, ownerId: string) {
    return this.contactsRepository.findOne(id, ownerId);
  }

  update(id: string, ownerId: string, updateContactInput: UpdateContactInput) {
    return this.contactsRepository.update(id, ownerId, updateContactInput);
  }

  remove(id: string, ownerId: string) {
    return this.contactsRepository.remove(id, ownerId);
  }
}
