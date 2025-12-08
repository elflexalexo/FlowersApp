
import { IsNumber, IsObject, IsString, IsOptional, IsIn, ValidateNested, IsArray, ArrayNotEmpty, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  zip: string;

  @IsOptional()
  @IsString()
  note?: string;
}

class DeliveryTimeDto {
  @IsString()
  from: string;

  @IsString()
  to: string;
}

export class CreateSubscriptionDto {
  @IsString()
  userId: string;
  @IsNumber()
  boxCount: number;

  @IsNumber()
  planPrice: number;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsString()
  recipientName: string;

  @IsString()
  phone: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], { each: true })
  deliveryDays: string[];

  @ValidateNested()
  @Type(() => DeliveryTimeDto)
  deliveryTime: DeliveryTimeDto;
}
