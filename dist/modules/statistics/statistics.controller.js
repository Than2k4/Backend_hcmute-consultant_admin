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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsController = void 0;
const common_1 = require("@nestjs/common");
const statistics_service_1 = require("./statistics.service");
const response_1 = require("../../common/response");
const admin_guard_1 = require("../../common/guards/admin.guard");
let StatisticsController = class StatisticsController {
    constructor(statisticsService) {
        this.statisticsService = statisticsService;
    }
    async getOverviewStatistics() {
        try {
            const data = await this.statisticsService.getOverviewStatistics();
            return new response_1.DataResponse(200, 'Thống kê tổng quan hệ thống thành công', data);
        }
        catch (error) {
            console.error('Error in getOverviewStatistics:', error);
            return new response_1.ExceptionResponse(500, 'Lỗi khi thống kê tổng quan');
        }
    }
    async getQuestionStatistics() {
        try {
            const data = await this.statisticsService.getQuestionStatistics();
            return new response_1.DataResponse(200, 'Thống kê câu hỏi hệ thống thành công', data);
        }
        catch (error) {
            console.error('Error in getQuestionStatistics:', error);
            return new response_1.ExceptionResponse(500, 'Lỗi khi thống kê câu hỏi');
        }
    }
    async getAnswerStatistics() {
        try {
            const data = await this.statisticsService.getAnswerStatistics();
            return new response_1.DataResponse(200, 'Thống kê câu trả lời hệ thống thành công', data);
        }
        catch (error) {
            console.error('Error in getAnswerStatistics:', error);
            return new response_1.ExceptionResponse(500, 'Lỗi khi thống kê câu trả lời');
        }
    }
};
exports.StatisticsController = StatisticsController;
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)('overview'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getOverviewStatistics", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)('questions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getQuestionStatistics", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Get)('answers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getAnswerStatistics", null);
exports.StatisticsController = StatisticsController = __decorate([
    (0, common_1.Controller)('statistics'),
    __metadata("design:paramtypes", [statistics_service_1.StatisticsService])
], StatisticsController);
//# sourceMappingURL=statistics.controller.js.map