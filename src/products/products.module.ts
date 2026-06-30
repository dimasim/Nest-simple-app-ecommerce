import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Folder penyimpanan file
        filename: (req, file, cb) => {
          // Membuat nama file yang unik
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = file.mimetype.split('/')[1];
          cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
        },
      }),
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
