import { CreateSubscriptionDto } from './dto/create-subscription.dto';
export declare class SubscriptionsService {
    private mockSubscriptions;
    create(dto: CreateSubscriptionDto): Promise<{
        id: number;
        status: string;
        nextDelivery: string;
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
    findAllForUser(userId: number): Promise<{
        id: number;
        boxCount: number;
        planPrice: number;
        address: {
            street: string;
            city: string;
            zip: string;
            note?: string;
        };
        deliveryDay: "Wednesday" | "Friday";
        status: string;
        nextDelivery: string;
    }[]>;
}
//# sourceMappingURL=subscriptions.service.d.ts.map