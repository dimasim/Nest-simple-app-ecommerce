import { Controller, Get, Post, Body, UseGuards,Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; // Impor JwtAuthGuard
import { RolesGuard } from 'src/auth/roles.guard';     // Impor RolesGuard
import { Roles } from 'src/auth/roles.decorator';       // Impor Roles decorator
import { UserRole } from './entities/user.entity'; 
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(UserRole.ADMIN) // 1. Hanya ADMIN yang boleh akses
  @UseGuards(JwtAuthGuard, RolesGuard) // 2. Terapkan kedua guard
  findAll() {
    return this.usersService.findAll(); // Anda perlu membuat method findAll di service
  }
  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
