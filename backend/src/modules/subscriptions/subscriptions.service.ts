import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
  private mockSubscriptions: Array<{
    id: number;
    boxCount: number;
    planPrice: number;
    address: {
      street: string;
      city: string;
      zip: string;
      note?: string;
    };
    deliveryDay: 'Wednesday' | 'Friday';
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
      deliveryDay: 'Friday',
      status: 'ACTIVE',
      nextDelivery: '2025-12-15',
    },
  ];

  async create(dto: CreateSubscriptionDto) {
    // TODO: Save to Supabase or DB
    // For now, just return the received data as a mock
    const newSub = { ...dto, id: Date.now(), status: 'ACTIVE', nextDelivery: '2025-12-15' };
    this.mockSubscriptions.push(newSub);
    return newSub;
  }

  async findAllForUser(userId: number) {
    // TODO: Query Supabase for user subscriptions
    // For now, return all mock subscriptions
    return this.mockSubscriptions;
  }
}
