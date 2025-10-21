"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const departments_module_1 = require("./modules/departments/departments.module");
const post_module_1 = require("./modules/posts/post.module");
const questions_module_1 = require("./modules/questions/questions.module");
const answers_module_1 = require("./modules/answer/answers.module");
const statistics_module_1 = require("./modules/statistics/statistics.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot((_a = process.env.MONGODB_URI) !== null && _a !== void 0 ? _a : 'mongodb://localhost:27017/defaultdb'),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            departments_module_1.DepartmentsModule,
            post_module_1.PostsModule,
            questions_module_1.QuestionsModule,
            answers_module_1.AnswersModule,
            statistics_module_1.StatisticsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map