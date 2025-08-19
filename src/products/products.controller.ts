import { Controller, Post,Get, Body,
   UseInterceptors, UploadedFile, UseGuards,
   Patch, Param, Delete } from '@nestjs/common';
   
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Melindungi endpoint, hanya user ter-login yang bisa
  @UseInterceptors(FileInterceptor('image')) // Menangkap file dari field 'image'
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(createProductDto, file.path);
  }

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productsService.create(createProductDto);
  // }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image')) // Tetap tangkap file jika ada
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateProductDto: UpdateProductDto, // Nest otomatis buatkan ini
  ) {
      const imagePath = file ? file.path : null; // Cek apakah file baru diunggah
      return this.productsService.update(+id, updateProductDto, imagePath);

    }
  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Sebaiknya tambahkan RolesGuard untuk admin di sini
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }


}
