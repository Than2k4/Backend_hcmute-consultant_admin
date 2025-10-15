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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const post_schema_1 = require("./schemas/post.schema");
let PostsService = class PostsService {
    deletePost(id) {
        throw new Error('Method not implemented.');
    }
    updatePost(id, body) {
        throw new Error('Method not implemented.');
    }
    createPost(body, userId) {
        throw new Error('Method not implemented.');
    }
    constructor(postModel) {
        this.postModel = postModel;
    }
    async findAll() {
        return this.postModel.find().populate('user', 'username email').sort({ createdAt: -1 }).lean();
    }
    async findById(id) {
        return this.postModel.findById(id).populate('user', 'username email').lean();
    }
    async create(postData, userId) {
        const newPost = new this.postModel({
            ...postData,
            user: new mongoose_2.Types.ObjectId(userId),
        });
        return newPost.save();
    }
    async update(id, updateData) {
        return this.postModel.findByIdAndUpdate(id, updateData, { new: true });
    }
    async delete(id) {
        return this.postModel.findByIdAndDelete(id);
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostsService);
//# sourceMappingURL=post.service.js.map