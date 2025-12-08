declare class AddressDto {
    street: string;
    city: string;
    zip: string;
    note?: string;
}
declare class DeliveryTimeDto {
    from: string;
    to: string;
}
export declare class CreateSubscriptionDto {
    userId: string;
    boxCount: number;
    planPrice: number;
    address: AddressDto;
    recipientName: string;
    phone: string;
    deliveryDays: string[];
    deliveryTime: DeliveryTimeDto;
}
export {};
//# sourceMappingURL=create-subscription.dto.d.ts.map