import { SupabaseService } from '../../services/supabase.service';
export declare class SubscriptionsService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
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
    deliveryTime: {
        from: string;
        to: string;
    };
    status: string;
    nextDelivery: string;
}
//# sourceMappingURL=subscriptions.service.d.ts.map