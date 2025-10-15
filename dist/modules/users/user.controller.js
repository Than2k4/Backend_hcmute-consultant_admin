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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const response_1 = require("../../common/response");
const admin_guard_1 = require("../../common/guards/admin.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getAllUsers() {
        try {
            const users = await this.userService.findAll();
            return new response_1.DataResponse(200, 'Lấy danh sách người dùng thành công', users);
        }
        catch (error) {
            return new response_1.ExceptionResponse(500, 'Lỗi khi lấy danh sách người dùng', error.message);
        }
    }
    async getUserById(id) {
        try {
            const user = await this.userService.findById(id);
            if (!user) {
                return new response_1.ExceptionResponse(404, 'Không tìm thấy người dùng');
            }
            return new response_1.DataResponse(200, 'Lấy thông tin người dùng thành công', user);
        }
        catch (error) {
            return new response_1.ExceptionResponse(500, 'Lỗi khi lấy thông tin người dùng', error.message);
        }
    }
    async deleteUser(id) {
        try {
            const deletedUser = await this.userService.softDelete(id);
            if (!deletedUser) {
                return new response_1.ExceptionResponse(404, 'Không tìm thấy người dùng để xóa');
            }
            return new response_1.DataResponse(200, 'Xóa người dùng thành công', deletedUser);
        }
        catch (error) {
            return new response_1.ExceptionResponse(500, 'Lỗi khi xóa người dùng', error.message);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map