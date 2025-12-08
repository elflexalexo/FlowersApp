import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../services/supabase.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async pauseOrSkip(id: number, userId: string, nextDelivery: string) {
    // Only allow pause/skip if user owns the subscription
    const client = this.supabaseService.getClient();
    // Check ownership
    const { data: sub, error: findError } = await client
      .from('subscriptions')
      .select('id, user_id')
      .eq('id', id)
      .single();
    if (findError) throw new Error(findError.message);
    if (!sub || sub.user_id !== userId) throw new Error('Unauthorized');
    // Update status to PAUSED and set nextDelivery
    const { data, error } = await client
      .from('subscriptions')
      .update({ status: 'PAUSED', nextDelivery })
      .eq('id', id)
      .select();
    if (error) throw new Error(error.message);
    return data?.[0];
  }

  async create(dto: CreateSubscriptionDto) {
    // Save to Supabase
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('subscriptions')
      .insert([{ ...dto, status: 'ACTIVE', nextDelivery: '2025-12-15' }])
      .select();
    if (error) throw new Error(error.message);
    return data?.[0];
  }

  async findAllForUser(userId: number) {
    // Query Supabase for user subscriptions
    // Use user-context client for RLS compatibility
    const client = this.supabaseService.getClientWithAuth(String(userId));
    const { data, error } = await client
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId);
    if (error) throw new Error(error.message);
    return data;
  }
  async update(id: number, dto: CreateSubscriptionDto) {
    // Update subscription in Supabase
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('subscriptions')
      .update({ ...dto })
      .eq('id', id)
      .select();
    if (error) throw new Error(error.message);
    if (!data?.length) throw new Error('Subscription not found');
    return data[0];
  }

  async cancel(id: number, userId: string) {
    // Only allow cancel if user owns the subscription
    const client = this.supabaseService.getClient();
    // Check ownership
    const { data: sub, error: findError } = await client
      .from('subscriptions')
      .select('id, user_id')
      .eq('id', id)
      .single();
    if (findError) throw new Error(findError.message);
    if (!sub || sub.user_id !== userId) throw new Error('Unauthorized');
    // Update status to CANCELLED and update delivery schedule
    const { data, error } = await client
      .from('subscriptions')
      .update({ status: 'CANCELLED', nextDelivery: null })
      .eq('id', id)
      .select();
    if (error) throw new Error(error.message);
    return data?.[0];
  }
}
