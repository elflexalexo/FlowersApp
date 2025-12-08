import { Body, Controller, Post, Get, Req } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  async create(@Body() dto: CreateSubscriptionDto) {
    return this.subscriptionsService.create(dto);
  }

  @Get()
  async findAll(@Req() req: any) {
    // TODO: Use req.user.id when auth is wired up
    return this.subscriptionsService.findAllForUser(1);
  }
}
