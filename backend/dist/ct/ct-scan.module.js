"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CTScanModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const ct_scan_controller_1 = require("./ct-scan.controller");
const ct_scan_service_1 = require("./ct-scan.service");
const ct_scan_schema_1 = require("./schemas/ct-scan.schema");
let CTScanModule = class CTScanModule {
};
exports.CTScanModule = CTScanModule;
exports.CTScanModule = CTScanModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: ct_scan_schema_1.CTScan.name, schema: ct_scan_schema_1.CTScanSchema }])
        ],
        controllers: [ct_scan_controller_1.CTScanController],
        providers: [ct_scan_service_1.CTScanService],
        exports: [ct_scan_service_1.CTScanService]
    })
], CTScanModule);
//# sourceMappingURL=ct-scan.module.js.map