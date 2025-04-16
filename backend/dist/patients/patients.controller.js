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
exports.PatientsController = void 0;
const common_1 = require("@nestjs/common");
const patients_service_1 = require("./patients.service");
const create_patient_dto_1 = require("./dto/create-patient.dto");
const update_patient_dto_1 = require("./dto/update-patient.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let PatientsController = class PatientsController {
    constructor(patientsService) {
        this.patientsService = patientsService;
    }
    create(createPatientDto) {
        return this.patientsService.create(createPatientDto);
    }
    findAll() {
        return this.patientsService.findAll();
    }
    findByTcId(tcId) {
        return this.patientsService.findByTcId(tcId);
    }
    findOne(id) {
        return this.patientsService.findOne(id);
    }
    update(id, updatePatientDto) {
        return this.patientsService.update(id, updatePatientDto);
    }
    remove(id) {
        return this.patientsService.remove(id);
    }
};
exports.PatientsController = PatientsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Yeni hasta oluştur' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Hasta başarıyla oluşturuldu.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Geçersiz giriş verileri' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_patient_dto_1.CreatePatientDto]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tüm hastaları listele' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Hastaların listesi başarıyla alındı.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('tc/:tcId'),
    (0, swagger_1.ApiOperation)({ summary: 'TC Kimlik Numarasına göre hasta bul' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Hasta başarıyla bulundu.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Hasta bulunamadı' }),
    __param(0, (0, common_1.Param)('tcId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "findByTcId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'ID ile hasta bul' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Hasta başarıyla bulundu.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Hasta bulunamadı' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Hastayı güncelle' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Hasta başarıyla güncellendi.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Hasta bulunamadı' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_patient_dto_1.UpdatePatientDto]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Hastayı sil' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Hasta başarıyla silindi.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Hasta bulunamadı' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "remove", null);
exports.PatientsController = PatientsController = __decorate([
    (0, swagger_1.ApiTags)('patients'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('patients'),
    __metadata("design:paramtypes", [patients_service_1.PatientsService])
], PatientsController);
//# sourceMappingURL=patients.controller.js.map