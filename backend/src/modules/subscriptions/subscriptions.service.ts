import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
  async create(dto: CreateSubscriptionDto) {
    // TODO: Save to Supabase or DB
    // For now, just return the received data as a mock
    return { ...dto, id: Date.now(), status: 'ACTIVE' };
  }
}
