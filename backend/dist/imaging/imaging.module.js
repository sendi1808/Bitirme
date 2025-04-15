"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const imaging_controller_1 = require("./imaging.controller");
const imaging_service_1 = require("./imaging.service");
const imaging_entity_1 = require("./imaging.entity");
let ImagingModule = class ImagingModule {
};
exports.ImagingModule = ImagingModule;
exports.ImagingModule = ImagingModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([imaging_entity_1.Imaging])],
        controllers: [imaging_controller_1.ImagingController],
        providers: [imaging_service_1.ImagingService],
        exports: [imaging_service_1.ImagingService],
    })
], ImagingModule);
//# sourceMappingURL=imaging.module.js.map