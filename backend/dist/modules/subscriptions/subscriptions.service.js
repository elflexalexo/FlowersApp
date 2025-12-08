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
let SubscriptionsService = class SubscriptionsService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async pauseOrSkip(id, userId, nextDelivery) {
        // Only allow pause/skip if user owns the subscription
        const client = this.supabaseService.getClient();
        // Check ownership
        const { data: sub, error: findError } = await client
            .from('subscriptions')
            .select('id, user_id')
            .eq('id', id)
            .single();
        if (findError)
            throw new Error(findError.message);
        if (!sub || sub.user_id !== userId)
            throw new Error('Unauthorized');
        // Update status to PAUSED and set nextDelivery
        const { data, error } = await client
            .from('subscriptions')
            .update({ status: 'PAUSED', nextDelivery })
            .eq('id', id)
            .select();
        if (error)
            throw new Error(error.message);
        return data?.[0];
    }
    async create(dto) {
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
    async findAllForUser(userId) {
        // Query Supabase for user subscriptions
        // Use user-context client for RLS compatibility
        const client = this.supabaseService.getClientWithAuth(String(userId));
        const { data, error } = await client
            .from('subscriptions')
            .select('*')
            .eq('user_id', userId);
        if (error)
            throw new Error(error.message);
        return data;
    }
    async update(id, dto) {
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
    async cancel(id, userId) {
        // Only allow cancel if user owns the subscription
        const client = this.supabaseService.getClient();
        // Check ownership
        const { data: sub, error: findError } = await client
            .from('subscriptions')
            .select('id, user_id')
            .eq('id', id)
            .single();
        if (findError)
            throw new Error(findError.message);
        if (!sub || sub.user_id !== userId)
            throw new Error('Unauthorized');
        // Update status to CANCELLED and update delivery schedule
        const { data, error } = await client
            .from('subscriptions')
            .update({ status: 'CANCELLED', nextDelivery: null })
            .eq('id', id)
            .select();
        if (error)
            throw new Error(error.message);
        return data?.[0];
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], SubscriptionsService);
//# sourceMappingURL=subscriptions.service.js.map