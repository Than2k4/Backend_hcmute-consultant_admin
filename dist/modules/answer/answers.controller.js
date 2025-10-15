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
exports.AnswersController = void 0;
const common_1 = require("@nestjs/common");
const answers_service_1 = require("./answers.service");
const response_1 = require("../../common/response");
const admin_guard_1 = require("../../common/guards/admin.guard");
let AnswersController = class AnswersController {
    constructor(answersService) {
        this.answersService = answersService;
    }
    async getAllAnswers() {
        try {
            const data = await this.answersService.findAllAnswers();
            return new response_1.DataResponse(200, 'Lấy danh sách câu trả lời thành công', data);
        }
        catch (error) {
            return new response_1.ExceptionResponse(500, 'Lỗi khi lấy danh sách câu trả lời');
        }
    }
    async getAnswerDetail(id) {
        try {
            const data = await this.answersService.findAnswerById(id);
            if (!data) {
                return new response_1.ExceptionResponse(404, 'Không tìm thấy câu trả lời');
            }
            return new response_1.DataResponse(200, 'Lấy chi tiết câu trả lời thành công', data);
        }
        catch (error) {
            return new response_1.ExceptionResponse(500, 'Lỗi khi lấy chi tiết câu trả lời');
        }
    }
    async deleteAnswer(id) {
        try {
            const deleted = await this.answersService.deleteAnswer(id);
            if (!deleted) {
                return new response_1.ExceptionResponse(404, 'Không tìm thấy câu trả lời để xóa');
            }
            return new response_1.DataResponse(200, 'Xóa câu trả lời thành công', deleted);
        }
        catch (error) {
            return new response_1.ExceptionResponse(500, 'Lỗi khi xóa câu trả lời');
        }
    }
};
exports.AnswersController = AnswersController;
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "getAllAnswers", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "getAnswerDetail", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "deleteAnswer", null);
exports.AnswersController = AnswersController = __decorate([
    (0, common_1.Controller)('answers'),
    __metadata("design:paramtypes", [answers_service_1.AnswersService])
], AnswersController);
//# sourceMappingURL=answers.controller.js.map