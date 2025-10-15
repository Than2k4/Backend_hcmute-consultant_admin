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
exports.QuestionsController = void 0;
const common_1 = require("@nestjs/common");
const questions_service_1 = require("./questions.service");
const admin_guard_1 = require("../../common/guards/admin.guard");
const response_1 = require("../../common/response");
let QuestionsController = class QuestionsController {
    constructor(questionsService) {
        this.questionsService = questionsService;
    }
    async getAllQuestions() {
        try {
            const data = await this.questionsService.findAllQuestions();
            return new response_1.DataResponse(200, 'Lấy danh sách câu hỏi thành công', data);
        }
        catch (error) {
            console.error(error);
            return new response_1.ExceptionResponse(500, 'Lỗi khi lấy danh sách câu hỏi');
        }
    }
    async getQuestionById(id) {
        try {
            const data = await this.questionsService.findQuestionById(id);
            if (!data) {
                return new response_1.ExceptionResponse(404, 'Không tìm thấy câu hỏi');
            }
            return new response_1.DataResponse(200, 'Lấy chi tiết câu hỏi thành công', data);
        }
        catch (error) {
            console.error(error);
            return new response_1.ExceptionResponse(500, 'Lỗi khi lấy chi tiết câu hỏi');
        }
    }
    async deleteQuestion(id) {
        try {
            const data = await this.questionsService.deleteQuestion(id);
            if (!data) {
                return new response_1.ExceptionResponse(404, 'Không tìm thấy câu hỏi để xóa');
            }
            return new response_1.DataResponse(200, 'Xóa câu hỏi thành công', data);
        }
        catch (error) {
            console.error(error);
            return new response_1.ExceptionResponse(500, 'Lỗi khi xóa câu hỏi');
        }
    }
};
exports.QuestionsController = QuestionsController;
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "getAllQuestions", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "getQuestionById", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "deleteQuestion", null);
exports.QuestionsController = QuestionsController = __decorate([
    (0, common_1.Controller)('questions'),
    __metadata("design:paramtypes", [questions_service_1.QuestionsService])
], QuestionsController);
//# sourceMappingURL=questions.controller.js.map