import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import * as Tesseract from 'tesseract.js';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
    constructor(
        private readonly prisma: PrismaService,
        @Inject(ConfigService) private configService: ConfigService,
    ) { }

    async uploadImage(file: Express.Multer.File): Promise<Prisma.InvoiceCreateInput> {
        const uploadDir = this.configService.get<string>('UPLOAD_DIR');
        const filePath = path.join(uploadDir, file.filename);

        // Save the file
        fs.writeFileSync(filePath, file.buffer);

        // Process OCR
        const ocrResult = await Tesseract.recognize(filePath, 'eng');

        // Save to database
        const invoice = await this.prisma.invoice.create({
            data: {
                imageUrl: filePath,
                ocrResult: ocrResult.data.text,
            },
        });

        return invoice;
    }
}
