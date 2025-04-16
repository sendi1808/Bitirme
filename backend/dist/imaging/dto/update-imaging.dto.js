"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateImagingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_imaging_dto_1 = require("./create-imaging.dto");
class UpdateImagingDto extends (0, swagger_1.PartialType)(create_imaging_dto_1.CreateImagingDto) {
}
exports.UpdateImagingDto = UpdateImagingDto;
//# sourceMappingURL=update-imaging.dto.js.map