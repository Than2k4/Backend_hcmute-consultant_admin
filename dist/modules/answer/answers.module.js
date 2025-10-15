"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswersModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const answers_service_1 = require("./answers.service");
const answers_controller_1 = require("./answers.controller");
const answer_schema_1 = require("./schemas/answer.schema");
const admin_guard_1 = require("../../common/guards/admin.guard");
let AnswersModule = class AnswersModule {
};
exports.AnswersModule = AnswersModule;
exports.AnswersModule = AnswersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: answer_schema_1.Answer.name, schema: answer_schema_1.AnswerSchema }]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1d' },
            }),
        ],
        controllers: [answers_controller_1.AnswersController],
        providers: [answers_service_1.AnswersService, admin_guard_1.AdminGuard],
        exports: [answers_service_1.AnswersService],
    })
], AnswersModule);
//# sourceMappingURL=answers.module.js.map