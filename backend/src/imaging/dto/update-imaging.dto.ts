import { PartialType } from '@nestjs/swagger';
import { CreateImagingDto } from './create-imaging.dto';

export class UpdateImagingDto extends PartialType(CreateImagingDto) {} 