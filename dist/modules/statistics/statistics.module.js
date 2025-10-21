"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const statistics_service_1 = require("./statistics.service");
const statistics_controller_1 = require("./statistics.controller");
const user_schema_1 = require("../users/schemas/user.schema");
const question_schema_1 = require("../questions/schemas/question.schema");
const answer_schema_1 = require("../answer/schemas/answer.schema");
const post_schema_1 = require("../posts/schemas/post.schema");
const field_schema_1 = require("../departments/schemas/field.schema");
const department_schema_1 = require("../departments/schemas/department.schema");
const admin_guard_1 = require("../../common/guards/admin.guard");
let StatisticsModule = class StatisticsModule {
};
exports.StatisticsModule = StatisticsModule;
exports.StatisticsModule = StatisticsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: question_schema_1.Question.name, schema: question_schema_1.QuestionSchema },
                { name: answer_schema_1.Answer.name, schema: answer_schema_1.AnswerSchema },
                { name: post_schema_1.Post.name, schema: post_schema_1.PostSchema },
                { name: field_schema_1.Field.name, schema: field_schema_1.FieldSchema },
                { name: department_schema_1.Department.name, schema: department_schema_1.DepartmentSchema },
            ]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'secret',
                signOptions: { expiresIn: '1d' },
            }),
        ],
        controllers: [statistics_controller_1.StatisticsController],
        providers: [statistics_service_1.StatisticsService, admin_guard_1.AdminGuard],
    })
], StatisticsModule);
//# sourceMappingURL=statistics.module.js.map