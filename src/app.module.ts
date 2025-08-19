import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path ke folder uploads
      serveRoot: '/uploads', // URL prefix, e.g., http://localhost:3000/uploads/filename.jpg
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // Tipe database yang kita gunakan
      host: 'localhost', // Alamat server database, 'localhost' jika di komputer yang sama
      port: 5434, // Port default PostgreSQL
      username: 'postgres', // Ganti dengan username database-mu
      password: 'postgres', // GANTI DENGAN PASSWORD DATABASE-MU
      database: 'project_db', // Nama database yang sudah kamu buat
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Otomatis memuat semua file entity
      synchronize: true, // PENTING: Otomatis membuat tabel berdasarkan entity (hanya untuk development)
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}