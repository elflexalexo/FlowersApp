import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../services/supabase.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly supabaseService: SupabaseService) {}
    id: number;
    boxCount: number;
    planPrice: number;
    address: {
      street: string;
      city: string;
      zip: string;
      note?: string;
    };
    recipientName: string;
    phone: string;
    deliveryDays: string[];
    deliveryTime: { from: string; to: string };
    status: string;
    nextDelivery: string;
  }> = [
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
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('subscriptions')
      .select('*')
      .eq('userId', userId);
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
}
