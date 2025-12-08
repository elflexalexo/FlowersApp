import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
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
    findAll(req: any): Promise<{
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
//# sourceMappingURL=subscriptions.controller.d.ts.map