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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const user_schema_1 = require("./schemas/user.schema");
const department_schema_1 = require("../departments/schemas/department.schema");
let UserService = class UserService {
    constructor(userModel, departmentModel) {
        this.userModel = userModel;
        this.departmentModel = departmentModel;
    }
    async addConsultant(data, adminUser) {
        if (adminUser.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Chỉ ADMIN mới được thêm tư vấn viên');
        }
        const existed = await this.userModel.findOne({ email: data.email });
        if (existed) {
            throw new common_1.BadRequestException('❌ Email đã tồn tại');
        }
        if (data.phone) {
            const existedPhone = await this.userModel.findOne({ phone: data.phone });
            if (existedPhone) {
                throw new common_1.BadRequestException('❌ Số điện thoại đã tồn tại');
            }
        }
        if (!data.department) {
            throw new common_1.BadRequestException('❌ Vui lòng nhập ID hoặc tên khoa (department)');
        }
        const departmentExists = await this.departmentModel.findById(data.department);
        if (!departmentExists) {
            throw new common_1.BadRequestException('Khoa không tồn tại');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const consultant = await this.userModel.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            username: data.email,
            phone: data.phone || null,
            password: hashedPassword,
            role: 'TUVANVIEN',
            department: departmentExists._id,
            isVerified: true,
            provider: 'local',
        });
        const result = consultant.toObject();
        delete result.password;
        delete result.refreshToken;
        delete result.__v;
        return result;
    }
    async findAll() {
        return this.userModel
            .find()
            .select('-password -refreshToken -verifyCodeAttemptCount -__v')
            .lean();
    }
    async findById(id) {
        return this.userModel
            .findById(id)
            .select('-password -refreshToken -verifyCodeAttemptCount -__v')
            .lean();
    }
    async softDelete(id) {
        return this.userModel.findByIdAndDelete(id);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(department_schema_1.Department.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map