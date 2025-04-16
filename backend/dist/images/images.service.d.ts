import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
export declare class ImagesService {
    private readonly imagesRepository;
    constructor(imagesRepository: Repository<Image>);
    create(imageData: {
        url: string;
        fileName: string;
        fileType: string;
        fileSize: number;
    }): Promise<Image>;
    findOne(id: string): Promise<Image>;
    remove(id: string): Promise<void>;
}
