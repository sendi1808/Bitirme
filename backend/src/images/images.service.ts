import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>,
  ) {}

  async create(imageData: {
    url: string;
    fileName: string;
    fileType: string;
    fileSize: number;
  }): Promise<Image> {
    const image = this.imagesRepository.create(imageData);
    return this.imagesRepository.save(image);
  }

  async findOne(id: string): Promise<Image> {
    return this.imagesRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.imagesRepository.delete(id);
  }
} 