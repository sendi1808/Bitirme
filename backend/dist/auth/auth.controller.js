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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const update_credentials_dto_1 = require("./dto/update-credentials.dto");
const request_password_reset_dto_1 = require("./dto/request-password-reset.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto) {
        try {
            const result = await this.authService.login(loginDto);
            return result;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async updatePassword(req, newPassword) {
        try {
            const userId = req.user.sub;
            const result = await this.authService.updatePassword(userId, newPassword);
            return {
                success: result,
                message: result ? 'Şifre başarıyla güncellendi' : 'Şifre güncellenirken bir hata oluştu'
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async verifyEmail(token) {
        const result = await this.authService.verifyEmail(token);
        if (!result) {
            throw new common_1.UnauthorizedException('E-posta doğrulama başarısız');
        }
        return { message: 'E-posta başarıyla doğrulandı' };
    }
    async updateCredentials(updateCredentialsDto, req) {
        return this.authService.updateCredentials(req.user.sicilNo, updateCredentialsDto);
    }
    async requestPasswordReset(requestPasswordResetDto) {
        await this.authService.requestPasswordReset(requestPasswordResetDto);
    }
    async resetPassword(resetPasswordDto) {
        await this.authService.resetPassword(resetPasswordDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Kullanıcı girişi' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Giriş başarılı' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Geçersiz kimlik bilgileri' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('update-password'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Şifre güncelleme' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Şifre başarıyla güncellendi' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Yetkisiz erişim' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('newPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Post)('verify-email'),
    (0, swagger_1.ApiOperation)({ summary: 'E-posta doğrulama' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'E-posta başarıyla doğrulandı' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Geçersiz token' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)('update-credentials'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Kullanıcı bilgilerini güncelleme' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Kullanıcı bilgileri başarıyla güncellendi' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Yetkisiz erişim' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_credentials_dto_1.UpdateCredentialsDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateCredentials", null);
__decorate([
    (0, common_1.Post)('request-password-reset'),
    (0, swagger_1.ApiOperation)({ summary: 'Şifre sıfırlama isteği gönder' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Şifre sıfırlama e-postası gönderildi' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Kullanıcı bulunamadı' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Geçersiz e-posta adresi' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_password_reset_dto_1.RequestPasswordResetDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestPasswordReset", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, swagger_1.ApiOperation)({ summary: 'Şifreyi sıfırla' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Şifre başarıyla sıfırlandı' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Geçersiz veya süresi dolmuş token' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map