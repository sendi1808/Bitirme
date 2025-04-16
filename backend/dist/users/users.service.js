"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor() {
        this.users = [];
    }
    create(createUserDto) {
        const user = {
            id: Math.random().toString(36).substring(2, 15),
            ...createUserDto,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.users.push(user);
        return user;
    }
    findAll() {
        return this.users;
    }
    findOne(id) {
        return this.users.find(user => user.id === id);
    }
    findByEmail(email) {
        return this.users.find(user => user.email === email);
    }
    update(id, updateUserDto) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users[index] = {
                ...this.users[index],
                ...updateUserDto,
                updatedAt: new Date()
            };
            return this.users[index];
        }
        return null;
    }
    remove(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            const deletedUser = this.users[index];
            this.users.splice(index, 1);
            return deletedUser;
        }
        return null;
    }
    updatePassword(id, password) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users[index].password = password;
            this.users[index].passwordResetToken = null;
            this.users[index].passwordResetExpires = null;
            this.users[index].updatedAt = new Date();
            return this.users[index];
        }
        return null;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map