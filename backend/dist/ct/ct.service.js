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
exports.CTService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CTService = class CTService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCTScanDto) {
        return this.prisma.cTScan.create({
            data: {
                filePath: createCTScanDto.imageUrl,
                patient: {
                    connect: { id: createCTScanDto.patientId }
                },
                sliceInfo: '{}',
                uploadedAt: new Date(),
            }
        });
    }
    async findAll() {
        return this.prisma.cTScan.findMany();
    }
    async findOne(id) {
        return this.prisma.cTScan.findUnique({
            where: { id }
        });
    }
    async findByPatientId(patientId) {
        return this.prisma.cTScan.findMany({
            where: { patientId }
        });
    }
    async remove(id) {
        return this.prisma.cTScan.delete({
            where: { id }
        });
    }
};
exports.CTService = CTService;
exports.CTService = CTService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CTService);
//# sourceMappingURL=ct.service.js.map