import { Module } from '@nestjs/common';
import { FileUploadController } from './upload.controller';
import { ConfigModule } from '@nestjs/config';
import { UploadService } from './upload.service';

@Module({
  imports: [ConfigModule],
  providers: [UploadService],
  controllers: [FileUploadController],
})
export class FileUploadModule {}
