import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsResolver } from './contacts.resolver';
import { ContactsRepository } from './contacts.repository';

@Module({
  providers: [ContactsResolver, ContactsService, ContactsRepository],
  exports: [ContactsService],
})
export class ContactsModule {}
