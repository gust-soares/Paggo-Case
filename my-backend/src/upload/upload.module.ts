// src/upload/upload.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { S3StorageService } from './s3-storage.service';
import { UploadController } from './upload.controller';

@Module({
  imports: [ConfigModule],
  controllers: [UploadController],
  providers: [S3StorageService],
})
export class UploadModule { }
