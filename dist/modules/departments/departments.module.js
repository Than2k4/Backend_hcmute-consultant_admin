"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const department_schema_1 = require("./schemas/department.schema");
const field_schema_1 = require("./schemas/field.schema");
const departments_controller_1 = require("./departments.controller");
const departments_service_1 = require("./departments.service");
const jwt_1 = require("@nestjs/jwt");
const admin_guard_1 = require("../../common/guards/admin.guard");
let DepartmentsModule = class DepartmentsModule {
};
exports.DepartmentsModule = DepartmentsModule;
exports.DepartmentsModule = DepartmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: department_schema_1.Department.name, schema: department_schema_1.DepartmentSchema },
                { name: field_schema_1.Field.name, schema: field_schema_1.FieldSchema },
            ]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1d' },
            }),
        ],
        controllers: [departments_controller_1.DepartmentsController],
        providers: [departments_service_1.DepartmentsService, admin_guard_1.AdminGuard],
    })
], DepartmentsModule);
//# sourceMappingURL=departments.module.js.map