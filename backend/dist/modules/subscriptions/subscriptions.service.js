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
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../../services/supabase.service");
const create_subscription_dto_1 = require("./dto/create-subscription.dto");
let SubscriptionsService = class SubscriptionsService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], SubscriptionsService);
 > ;
[
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
        recipientName: 'Test User',
        phone: '777777777',
        deliveryDays: ['Wednesday', 'Friday'],
        deliveryTime: { from: '09:00', to: '17:00' },
        status: 'ACTIVE',
        nextDelivery: '2025-12-15',
    },
];
async;
create(dto, create_subscription_dto_1.CreateSubscriptionDto);
{
    // Save to Supabase
    const client = this.supabaseService.getClient();
    const { data, error } = await client
        .from('subscriptions')
        .insert([{ ...dto, status: 'ACTIVE', nextDelivery: '2025-12-15' }])
        .select();
    if (error)
        throw new Error(error.message);
    return data?.[0];
}
async;
findAllForUser(userId, number);
{
    // Query Supabase for user subscriptions
    const client = this.supabaseService.getClient();
    const { data, error } = await client
        .from('subscriptions')
        .select('*')
        .eq('userId', userId);
    if (error)
        throw new Error(error.message);
    return data;
}
async;
update(id, number, dto, create_subscription_dto_1.CreateSubscriptionDto);
{
    // Update subscription in Supabase
    const client = this.supabaseService.getClient();
    const { data, error } = await client
        .from('subscriptions')
        .update({ ...dto })
        .eq('id', id)
        .select();
    if (error)
        throw new Error(error.message);
    if (!data?.length)
        throw new Error('Subscription not found');
    return data[0];
}
//# sourceMappingURL=subscriptions.service.js.map