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
exports.CTScanSchema = exports.CTScan = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let CTScan = class CTScan {
};
exports.CTScan = CTScan;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CTScan.prototype, "patientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CTScan.prototype, "fileName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CTScan.prototype, "filePath", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], CTScan.prototype, "fileSize", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CTScan.prototype, "fileType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            width: Number,
            height: Number,
            depth: Number,
            spacing: [Number],
            origin: [Number],
            direction: [Number]
        }
    }),
    __metadata("design:type", Object)
], CTScan.prototype, "sliceInfo", void 0);
exports.CTScan = CTScan = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], CTScan);
exports.CTScanSchema = mongoose_1.SchemaFactory.createForClass(CTScan);
//# sourceMappingURL=ct.schema.js.map