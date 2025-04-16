import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Imaging } from './entities/imaging.entity';
import { CreateImagingDto } from './dto/create-imaging.dto';
import { UpdateImagingDto } from './dto/update-imaging.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
import { PDFDocument } from 'pdf-lib';

@Injectable()
export class ImagingService {
  constructor(
    @InjectRepository(Imaging)
    private imagingRepository: Repository<Imaging>
  ) {}

  async create(createImagingDto: CreateImagingDto): Promise<Imaging> {
    const imaging = this.imagingRepository.create({
      ...createImagingDto,
      date: new Date()
    });
    return this.imagingRepository.save(imaging);
  }

  async findAll(): Promise<Imaging[]> {
    return this.imagingRepository.find({
      relations: ['patient']
    });
  }

  async findPendingDiagnosis(): Promise<Imaging[]> {
    return this.imagingRepository.find({
      where: { diagnosis: null },
      relations: ['patient']
    });
  }

  async findOne(id: string): Promise<Imaging> {
    return this.imagingRepository.findOne({ 
      where: { id },
      relations: ['patient']
    });
  }

  async update(id: string, updateImagingDto: UpdateImagingDto): Promise<Imaging> {
    await this.imagingRepository.update(id, updateImagingDto);
    return this.imagingRepository.findOne({ where: { id } });
  }

  async updateDiagnosis(id: string, updateDiagnosisDto: UpdateDiagnosisDto): Promise<Imaging> {
    const imaging = await this.findOne(id);
    
    // Tanı bilgilerini güncelle
    imaging.diagnosis = updateDiagnosisDto.diagnosis;
    
    // CT taraması özel alanları
    if (updateDiagnosisDto.notes) {
      imaging.notes = updateDiagnosisDto.notes;
    }
    
    return this.imagingRepository.save(imaging);
  }

  async remove(id: string): Promise<void> {
    await this.imagingRepository.delete(id);
  }

  async generateReport(imaging: Imaging): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    // Rapor içeriğini oluştur
    const content = `
      Hasta Bilgileri:
      Ad Soyad: ${imaging.patient.firstName} ${imaging.patient.lastName}
      TC Kimlik No: ${imaging.patient.tcId}
      
      Görüntüleme Bilgileri:
      Tarih: ${imaging.date.toLocaleDateString()}
      Tür: ${imaging.type}
      Sonuç: ${imaging.diagnosis ? imaging.diagnosis : 'Tanısız'}
    `;

    // PDF'e içeriği ekle
    page.drawText(content, {
      x: 50,
      y: height - 50,
      size: 12,
    });

    // PDF'i buffer'a dönüştür
    return Buffer.from(await pdfDoc.save());
  }
} 