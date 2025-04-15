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
exports.CTController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const ct_service_1 = require("./ct.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let CTController = class CTController {
    constructor(ctService) {
        this.ctService = ctService;
    }
    async uploadFile(file, patientId) {
        const filePath = `/uploads/ct/${patientId}/${Date.now()}-${file.originalname}`;
        const createCTScanDto = {
            patientId,
            doctorId: '1',
            scanDate: new Date().toISOString(),
            imageUrl: filePath,
            diagnosis: file.diagnosis || '',
            notes: file.notes || ''
        };
        return this.ctService.create(createCTScanDto);
    }
    findAll() {
        return this.ctService.findAll();
    }
    findOne(id) {
        return this.ctService.findOne(id);
    }
    findByPatient(patientId) {
        return this.ctService.findByPatientId(patientId);
    }
    remove(id) {
        return this.ctService.remove(id);
    }
};
exports.CTController = CTController;
__decorate([
    (0, common_1.Post)('upload/:patientId'),
    (0, swagger_1.ApiOperation)({ summary: 'CT görüntüsü yükle' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Görüntü başarıyla yüklendi' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Geçersiz dosya formatı' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
                patientId: {
                    type: 'string',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CTController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CTController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CTController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CTController.prototype, "findByPatient", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CTController.prototype, "remove", null);
exports.CTController = CTController = __decorate([
    (0, swagger_1.ApiTags)('CT'),
    (0, common_1.Controller)('ct'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [ct_service_1.CTService])
], CTController);
//# sourceMappingURL=ct.controller.js.map