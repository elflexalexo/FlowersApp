declare class AddressDto {
    street: string;
    city: string;
    zip: string;
    note?: string;
}
export declare class CreateSubscriptionDto {
    boxCount: number;
    planPrice: number;
    address: AddressDto;
    deliveryDay: 'Wednesday' | 'Friday';
}
export {};
//# sourceMappingURL=create-subscription.dto.d.ts.map