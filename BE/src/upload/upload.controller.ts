import {
  BadRequestException,
  Controller,
  Delete,
  InternalServerErrorException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DatabaseService } from 'src/database/database.service';
import { UploadService } from './upload.service';

@Controller('upload')
export class FileUploadController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    try {
      const result = await this.uploadService.uploadPublicFile(
        file.buffer,
        file.originalname,
      );

      const data = await this.databaseService.image.create({
        data: {
          width: null,
          height: null,
          url: result.Location,
          cloudName: 'AWS S3',
        },
      });

      return {
        message: 'OK',
        statusCode: 200,
        data: data,
      };
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('File upload failed');
    }
  }

  @Delete('/:key')
  async deleteFile(@Param('key') fileKey: string) {
    return this.uploadService.deletePublicFile(fileKey);
  }
}
