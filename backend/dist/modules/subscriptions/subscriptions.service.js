"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
let SubscriptionsService = class SubscriptionsService {
    constructor() {
        this.mockSubscriptions = [
            {
                id: 1,
                boxCount: 2,
                planPrice: 40,
                address: {
                    street: 'Prague',
                    city: 'Prag',
                    zip: '18200',
                    note: 'Im the best',
                },
                deliveryDay: 'Friday',
                status: 'ACTIVE',
                nextDelivery: '2025-12-15',
            },
        ];
    }
    async create(dto) {
        // TODO: Save to Supabase or DB
        // For now, just return the received data as a mock
        const newSub = { ...dto, id: Date.now(), status: 'ACTIVE', nextDelivery: '2025-12-15' };
        this.mockSubscriptions.push(newSub);
        return newSub;
    }
    async findAllForUser(userId) {
        // TODO: Query Supabase for user subscriptions
        // For now, return all mock subscriptions
        return this.mockSubscriptions;
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)()
], SubscriptionsService);
//# sourceMappingURL=subscriptions.service.js.map