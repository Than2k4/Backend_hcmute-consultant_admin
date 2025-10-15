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
exports.AnswersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const answer_schema_1 = require("./schemas/answer.schema");
let AnswersService = class AnswersService {
    constructor(answerModel) {
        this.answerModel = answerModel;
    }
    async findAllAnswers() {
        return this.answerModel
            .find()
            .populate('user', 'name email role')
            .populate('question', 'title')
            .sort({ createdAt: -1 })
            .exec();
    }
    async findAnswerById(id) {
        return this.answerModel
            .findById(id)
            .populate('user', 'name email role')
            .populate('question', 'title content')
            .exec();
    }
    async deleteAnswer(id) {
        return this.answerModel.findByIdAndUpdate(id, { statusAnswer: false }, { new: true });
    }
};
exports.AnswersService = AnswersService;
exports.AnswersService = AnswersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(answer_schema_1.Answer.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AnswersService);
//# sourceMappingURL=answers.service.js.map