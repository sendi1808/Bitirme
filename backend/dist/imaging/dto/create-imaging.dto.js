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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateImagingDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var ImageType;
(function (ImageType) {
    ImageType["XRay"] = "XRay";
    ImageType["MRI"] = "MRI";
    ImageType["CT"] = "CT";
    ImageType["Other"] = "Other";
})(ImageType || (ImageType = {}));
class CreateImagingDto {
}
exports.CreateImagingDto = CreateImagingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Hasta ID' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateImagingDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/image.jpg', description: 'Görüntü URL' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateImagingDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'XRay', enum: ImageType, description: 'Görüntü tipi' }),
    (0, class_validator_1.IsEnum)(ImageType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateImagingDto.prototype, "imageType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Lomber disk hernisi L4-L5', description: 'Tanı', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateImagingDto.prototype, "diagnosis", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Tanı tarihi' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateImagingDto.prototype, "diagnosisDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Tanı konuldu mu?' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateImagingDto.prototype, "isDiagnosed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Doktor ID', required: false }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateImagingDto.prototype, "doctorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Hasta şiddetli bel ağrısı şikayeti ile başvurdu', description: 'Notlar', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateImagingDto.prototype, "notes", void 0);
//# sourceMappingURL=create-imaging.dto.js.map