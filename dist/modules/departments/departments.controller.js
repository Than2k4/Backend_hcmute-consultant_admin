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
exports.DepartmentsController = void 0;
const common_1 = require("@nestjs/common");
const departments_service_1 = require("./departments.service");
const admin_guard_1 = require("../../common/guards/admin.guard");
const response_1 = require("../../common/response");
let DepartmentsController = class DepartmentsController {
    constructor(departmentsService) {
        this.departmentsService = departmentsService;
    }
    async getAllDepartments() {
        try {
            const data = await this.departmentsService.findAllDepartmentsWithFields();
            return new response_1.DataResponse(200, 'Lấy danh sách khoa và lĩnh vực thành công', data);
        }
        catch (error) {
            console.error(error);
            return new response_1.ExceptionResponse(500, 'Lỗi khi lấy danh sách khoa');
        }
    }
    async createDepartment(createData) {
        try {
            const data = await this.departmentsService.createDepartment(createData);
            return new response_1.DataResponse(201, 'Thêm khoa mới thành công', data);
        }
        catch (error) {
            console.error(error);
            return new response_1.ExceptionResponse(500, 'Lỗi khi thêm khoa mới');
        }
    }
    async getDepartmentById(id) {
        try {
            const data = await this.departmentsService.findDepartmentById(id);
            if (!data)
                return new response_1.ExceptionResponse(404, 'Không tìm thấy khoa');
            return new response_1.DataResponse(200, 'Lấy chi tiết khoa thành công', data);
        }
        catch (error) {
            console.error(error);
            return new response_1.ExceptionResponse(500, 'Lỗi khi lấy chi tiết khoa');
        }
    }
    async updateDepartment(id, updateData) {
        try {
            const data = await this.departmentsService.updateDepartment(id, updateData);
            return new response_1.DataResponse(200, 'Cập nhật khoa thành công', data);
        }
        catch (error) {
            console.error(error);
            return new response_1.ExceptionResponse(500, 'Lỗi khi cập nhật khoa');
        }
    }
    async deleteDepartment(id) {
        try {
            await this.departmentsService.deleteDepartment(id);
            return new response_1.DataResponse(200, 'Xóa khoa thành công', null);
        }
        catch (error) {
            console.error(error);
            return new response_1.ExceptionResponse(500, 'Lỗi khi xóa khoa');
        }
    }
    async createField(createData) {
        try {
            const data = await this.departmentsService.createField(createData);
            return new response_1.DataResponse(201, 'Thêm lĩnh vực mới thành công', data);
        }
        catch (error) {
            console.error(error);
            return new response_1.ExceptionResponse(500, 'Lỗi khi thêm lĩnh vực mới');
        }
    }
    async getFieldById(id) {
        try {
            const data = await this.departmentsService.findFieldById(id);
            if (!data)
                return new response_1.ExceptionResponse(404, 'Không tìm thấy lĩnh vực');
            return new response_1.DataResponse(200, 'Lấy chi tiết lĩnh vực thành công', data);
        }
        catch (error) {
            console.error(error);
            return new response_1.ExceptionResponse(500, 'Lỗi khi lấy chi tiết lĩnh vực');
        }
    }
    async updateField(id, updateData) {
        try {
            const data = await this.departmentsService.updateField(id, updateData);
            return new response_1.DataResponse(200, 'Cập nhật lĩnh vực thành công', data);
        }
        catch (error) {
            console.error(error);
            return new response_1.ExceptionResponse(500, 'Lỗi khi cập nhật lĩnh vực');
        }
    }
    async deleteField(id) {
        try {
            await this.departmentsService.deleteField(id);
            return new response_1.DataResponse(200, 'Xóa lĩnh vực thành công', null);
        }
        catch (error) {
            console.error(error);
            return new response_1.ExceptionResponse(500, 'Lỗi khi xóa lĩnh vực');
        }
    }
};
exports.DepartmentsController = DepartmentsController;
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "getAllDepartments", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "createDepartment", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "getDepartmentById", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "updateDepartment", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "deleteDepartment", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Post)('field'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "createField", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)('field/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "getFieldById", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Patch)('field/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "updateField", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Delete)('field/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "deleteField", null);
exports.DepartmentsController = DepartmentsController = __decorate([
    (0, common_1.Controller)('departments'),
    __metadata("design:paramtypes", [departments_service_1.DepartmentsService])
], DepartmentsController);
//# sourceMappingURL=departments.controller.js.map