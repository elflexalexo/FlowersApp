import { IsNumber, IsObject, IsString, IsOptional, IsIn, ValidateNested } from 'class-validator';
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

export class CreateSubscriptionDto {
  @IsNumber()
  boxCount: number;

  @IsNumber()
  planPrice: number;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsIn(['Wednesday', 'Friday'])
  deliveryDay: 'Wednesday' | 'Friday';
}
