import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import * as fs from 'fs';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto, imageUrl: string) {
    const newProduct = this.productRepository.create({
      ...createProductDto,
      price: +createProductDto.price, // Pastikan price adalah number
      imageUrl: imageUrl, // Simpan path gambar ke database
    });
    return this.productRepository.save(newProduct);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    imagePath: string | null,
  ) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Jika ada gambar baru diunggah, hapus gambar lama
    if (imagePath && product.imageUrl) {
      if (fs.existsSync(product.imageUrl)) {
        // Cek apakah file lama ada
        fs.unlinkSync(product.imageUrl); // Hapus file lama
      }
    }
    // Siapkan data untuk update
    const updatedData = {
      ...updateProductDto,
      price: updateProductDto.price ? +updateProductDto.price : product.price,
    };

    if (imagePath) {
      updatedData['imageUrl'] = imagePath;
    }

    await this.productRepository.update(id, updatedData);
    return this.productRepository.findOneBy({ id });
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async remove(id: number) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Hapus file gambar jika ada
    if (product.imageUrl && fs.existsSync(product.imageUrl)) {
      fs.unlinkSync(product.imageUrl);
    }

    const result = await this.productRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return { message: `Product with ID ${id} has been successfully deleted` };
  }
}
