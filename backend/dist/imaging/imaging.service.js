"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const imaging_entity_1 = require("./entities/imaging.entity");
const pdf_lib_1 = require("pdf-lib");
let ImagingService = class ImagingService {
    constructor(imagingRepository) {
        this.imagingRepository = imagingRepository;
    }
    async create(createImagingDto) {
        const imaging = this.imagingRepository.create({
            ...createImagingDto,
            date: new Date()
        });
        return this.imagingRepository.save(imaging);
    }
    async findAll() {
        return this.imagingRepository.find({
            relations: ['patient']
        });
    }
    async findPendingDiagnosis() {
        return this.imagingRepository.find({
            where: { diagnosis: null },
            relations: ['patient']
        });
    }
    async findOne(id) {
        return this.imagingRepository.findOne({
            where: { id },
            relations: ['patient']
        });
    }
    async update(id, updateImagingDto) {
        await this.imagingRepository.update(id, updateImagingDto);
        return this.imagingRepository.findOne({ where: { id } });
    }
    async updateDiagnosis(id, updateDiagnosisDto) {
        const imaging = await this.findOne(id);
        imaging.diagnosis = updateDiagnosisDto.diagnosis;
        if (updateDiagnosisDto.notes) {
            imaging.notes = updateDiagnosisDto.notes;
        }
        return this.imagingRepository.save(imaging);
    }
    async remove(id) {
        await this.imagingRepository.delete(id);
    }
    async generateReport(imaging) {
        const pdfDoc = await pdf_lib_1.PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const content = `
      Hasta Bilgileri:
      Ad Soyad: ${imaging.patient.firstName} ${imaging.patient.lastName}
      TC Kimlik No: ${imaging.patient.tcId}
      
      Görüntüleme Bilgileri:
      Tarih: ${imaging.date.toLocaleDateString()}
      Tür: ${imaging.type}
      Sonuç: ${imaging.diagnosis ? imaging.diagnosis : 'Tanısız'}
    `;
        page.drawText(content, {
            x: 50,
            y: height - 50,
            size: 12,
        });
        return Buffer.from(await pdfDoc.save());
    }
};
exports.ImagingService = ImagingService;
exports.ImagingService = ImagingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(imaging_entity_1.Imaging)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ImagingService);
//# sourceMappingURL=imaging.service.js.map