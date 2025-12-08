import { CreateSubscriptionDto } from './dto/create-subscription.dto';
export declare class SubscriptionsService {
    create(dto: CreateSubscriptionDto): Promise<{
        id: number;
        status: string;
        boxCount: number;
        planPrice: number;
        address: {
            street: string;
            city: string;
            zip: string;
            note?: string;
        };
        deliveryDay: "Wednesday" | "Friday";
    }>;
}
//# sourceMappingURL=subscriptions.service.d.ts.map