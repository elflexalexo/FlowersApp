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
exports.SubscriptionsController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const subscriptions_service_1 = require("./subscriptions.service");
const create_subscription_dto_1 = require("./dto/create-subscription.dto");
let SubscriptionsController = class SubscriptionsController {
    constructor(subscriptionsService) {
        this.subscriptionsService = subscriptionsService;
    }
    async create(dto, req) {
        // Attach userId to the subscription
        return this.subscriptionsService.create({ ...dto, userId: req.user.id });
    }
    async findAll(req) {
        return this.subscriptionsService.findAllForUser(req.user.id);
    }
    async update(id, dto, req) {
        // Only allow update if user owns the subscription
        return this.subscriptionsService.update(id, { ...dto, userId: req.user.id });
    }
    async cancel(id, req) {
        // Only allow cancel if user owns the subscription
        return this.subscriptionsService.cancel(id, req.user.id);
    }
    async pauseOrSkip(id, body, req) {
        // Only allow pause/skip if user owns the subscription
        return this.subscriptionsService.pauseOrSkip(id, req.user.id, body.nextDelivery);
    }
};
exports.SubscriptionsController = SubscriptionsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_subscription_dto_1.CreateSubscriptionDto, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_subscription_dto_1.CreateSubscriptionDto, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "cancel", null);
__decorate([
    (0, common_1.Patch)(':id/pause'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "pauseOrSkip", null);
exports.SubscriptionsController = SubscriptionsController = __decorate([
    (0, common_1.Controller)('subscriptions'),
    (0, common_2.UseGuards)(jwt_guard_1.JwtGuard),
    __metadata("design:paramtypes", [subscriptions_service_1.SubscriptionsService])
], SubscriptionsController);
//# sourceMappingURL=subscriptions.controller.js.map