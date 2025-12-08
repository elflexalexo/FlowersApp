import { SupabaseService } from '../../services/supabase.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
export declare class SubscriptionsService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    pauseOrSkip(id: number, userId: string, nextDelivery: string): Promise<any>;
    create(dto: CreateSubscriptionDto): Promise<any>;
    findAllForUser(userId: number): Promise<any[]>;
    update(id: number, dto: CreateSubscriptionDto): Promise<any>;
    cancel(id: number, userId: string): Promise<any>;
}
//# sourceMappingURL=subscriptions.service.d.ts.map