// src/upload/upload.controller.ts

import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3StorageService } from './s3-storage.service';

@Controller('upload')
export class UploadController {
    constructor(private readonly s3StorageService: S3StorageService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const fileUrl = await this.s3StorageService.uploadFile(file);
        return { url: fileUrl };
    }
}



