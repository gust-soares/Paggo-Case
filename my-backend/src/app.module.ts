import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { S3 } from 'aws-sdk';
import { S3StorageService } from './s3-storage.service'; // Serviço para S3

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true, // Apenas para desenvolvimento
      }),
      inject: [ConfigService],
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        storage: multerS3({
          s3: new S3(),
          bucket: configService.get<string>('AWS_S3_BUCKET_NAME'),
          acl: 'public-read',
          key: (req, file, cb) => {
            cb(null, `${Date.now().toString()}-${file.originalname}`);
          },
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [S3StorageService],
})
export class AppModule { }
