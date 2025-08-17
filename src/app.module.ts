import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}