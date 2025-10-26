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
exports.DepartmentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const department_schema_1 = require("./schemas/department.schema");
const field_schema_1 = require("./schemas/field.schema");
let DepartmentsService = class DepartmentsService {
    constructor(departmentModel, fieldModel) {
        this.departmentModel = departmentModel;
        this.fieldModel = fieldModel;
    }
    async findAllDepartmentsWithFields() {
        const departments = await this.departmentModel.find().lean();
        const results = await Promise.all(departments.map(async (dept) => {
            const fields = await this.fieldModel.find({ department: dept._id }).lean();
            return { ...dept, fields };
        }));
        return results;
    }
    async createDepartment(createData) {
        const newDepartment = new this.departmentModel(createData);
        return await newDepartment.save();
    }
    async findDepartmentById(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id))
            return null;
        const department = await this.departmentModel.findById(id).lean();
        if (!department)
            return null;
        const fields = await this.fieldModel.find({ department: id }).lean();
        return { ...department, fields };
    }
    async updateDepartment(id, updateData) {
        return this.departmentModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
    }
    async deleteDepartment(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new Error('ID khoa không hợp lệ');
        }
        const department = await this.departmentModel.findById(id);
        if (!department) {
            throw new Error('Khoa không tồn tại');
        }
        await this.fieldModel.deleteMany({ department: new mongoose_2.Types.ObjectId(id) });
        await this.departmentModel.findByIdAndDelete(id);
        return { message: 'Đã xóa khoa và tất cả lĩnh vực thuộc khoa đó' };
    }
    async createField(createData) {
        const { name, department } = createData;
        const departmentId = new mongoose_2.Types.ObjectId(department);
        const deptExists = await this.departmentModel.findById(departmentId);
        if (!deptExists)
            throw new Error('Khoa không tồn tại');
        const newField = new this.fieldModel({
            name,
            department: departmentId,
        });
        return await newField.save();
    }
    async findFieldById(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id))
            return null;
        return this.fieldModel.findById(id).populate('department').lean();
    }
    async updateField(id, updateData) {
        return this.fieldModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
    }
    async deleteField(id) {
        await this.fieldModel.findByIdAndDelete(id);
    }
};
exports.DepartmentsService = DepartmentsService;
exports.DepartmentsService = DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(department_schema_1.Department.name)),
    __param(1, (0, mongoose_1.InjectModel)(field_schema_1.Field.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map