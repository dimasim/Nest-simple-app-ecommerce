// src/users/entities/user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Mendefinisikan peran (roles) yang ada di aplikasi kita.
// Enum memastikan kita tidak salah ketik saat menentukan role.
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity({ name: 'users' }) // Menentukan nama tabel di database menjadi 'users'
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // Setiap email harus unik, tidak boleh ada yang sama
  email: string;

  @Column()
  password: string; // Kolom untuk menyimpan password yang sudah di-hash

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER, // Secara default, setiap user baru akan memiliki role 'user'
  })
  role: UserRole;
}