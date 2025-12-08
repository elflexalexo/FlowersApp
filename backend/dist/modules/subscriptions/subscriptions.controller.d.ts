import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    create(dto: CreateSubscriptionDto, req: any): Promise<any>;
    findAll(req: any): Promise<any[]>;
    update(id: number, dto: CreateSubscriptionDto, req: any): Promise<any>;
    cancel(id: number, req: any): Promise<any>;
    pauseOrSkip(id: number, body: {
        nextDelivery: string;
    }, req: any): Promise<any>;
}
//# sourceMappingURL=subscriptions.controller.d.ts.map