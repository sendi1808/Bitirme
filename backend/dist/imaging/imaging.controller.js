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
exports.ImagingController = void 0;
const common_1 = require("@nestjs/common");
const imaging_service_1 = require("./imaging.service");
const create_imaging_dto_1 = require("./dto/create-imaging.dto");
const update_imaging_dto_1 = require("./dto/update-imaging.dto");
const update_diagnosis_dto_1 = require("./dto/update-diagnosis.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ImagingController = class ImagingController {
    constructor(imagingService) {
        this.imagingService = imagingService;
    }
    create(createImagingDto) {
        return this.imagingService.create(createImagingDto);
    }
    findAll() {
        return this.imagingService.findAll();
    }
    findPendingDiagnosis() {
        return this.imagingService.findPendingDiagnosis();
    }
    findByPatient(patientId) {
        return this.imagingService.findAll();
    }
    findOne(id) {
        return this.imagingService.findOne(id);
    }
    update(id, updateImagingDto) {
        return this.imagingService.update(id, updateImagingDto);
    }
    updateDiagnosis(id, updateDiagnosisDto) {
        return this.imagingService.updateDiagnosis(id, updateDiagnosisDto);
    }
    remove(id) {
        return this.imagingService.remove(id);
    }
    async generateReport(id, res) {
        const imaging = await this.imagingService.findOne(id);
        const report = await this.imagingService.generateReport(imaging);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="report-${id}.pdf"`);
        res.end(report);
    }
};
exports.ImagingController = ImagingController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Yeni görüntü oluştur' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Görüntü başarıyla oluşturuldu.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Geçersiz giriş verileri' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_imaging_dto_1.CreateImagingDto]),
    __metadata("design:returntype", void 0)
], ImagingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tüm görüntüleri listele' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Görüntülerin listesi başarıyla alındı.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ImagingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('pending'),
    (0, swagger_1.ApiOperation)({ summary: 'Tanı konulmamış görüntüleri listele' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tanı konulmamış görüntülerin listesi başarıyla alındı.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ImagingController.prototype, "findPendingDiagnosis", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    (0, swagger_1.ApiOperation)({ summary: 'Hasta ID\'sine göre görüntüleri listele' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Hasta görüntüleri başarıyla bulundu.' }),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImagingController.prototype, "findByPatient", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'ID ile görüntü bul' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Görüntü başarıyla bulundu.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Görüntü bulunamadı' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImagingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Görüntüyü güncelle' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Görüntü başarıyla güncellendi.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Görüntü bulunamadı' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_imaging_dto_1.UpdateImagingDto]),
    __metadata("design:returntype", void 0)
], ImagingController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/diagnosis'),
    (0, swagger_1.ApiOperation)({ summary: 'Görüntü tanısını güncelle' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Görüntü tanısı başarıyla güncellendi.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Görüntü bulunamadı' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_diagnosis_dto_1.UpdateDiagnosisDto]),
    __metadata("design:returntype", void 0)
], ImagingController.prototype, "updateDiagnosis", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Görüntüyü sil' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Görüntü başarıyla silindi.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Görüntü bulunamadı' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImagingController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/report'),
    (0, swagger_1.ApiOperation)({ summary: 'Görüntü raporunu indir' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Rapor başarıyla indirildi.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Rapor bulunamadı' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ImagingController.prototype, "generateReport", null);
exports.ImagingController = ImagingController = __decorate([
    (0, swagger_1.ApiTags)('imaging'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('imaging'),
    __metadata("design:paramtypes", [imaging_service_1.ImagingService])
], ImagingController);
//# sourceMappingURL=imaging.controller.js.map