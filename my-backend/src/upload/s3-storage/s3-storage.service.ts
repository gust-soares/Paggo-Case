// src/upload/s3-storage.service.ts

import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3StorageService {
    private s3: S3;

    constructor(private configService: ConfigService) {
        this.s3 = new S3({
            accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
            region: this.configService.get<string>('AWS_REGION'),
        });
    }

    async uploadFile(file: Express.Multer.File): Promise<string> {
        const params = {
            Bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
            Key: `${Date.now().toString()}-${file.originalname}`,
            Body: file.buffer,
            ACL: 'public-read',
        };

        const data = await this.s3.upload(params).promise();
        return data.Location;
    }
}
