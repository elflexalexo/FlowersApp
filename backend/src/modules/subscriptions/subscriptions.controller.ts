import { Body, Controller, Post, Get, Req, Put, Param, Delete, Patch } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('subscriptions')
@UseGuards(JwtGuard)
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  async create(@Body() dto: CreateSubscriptionDto, @Req() req: any) {
    // Attach userId to the subscription
    return this.subscriptionsService.create({ ...dto, userId: req.user.id });
  }

  @Get()
  async findAll(@Req() req: any) {
    return this.subscriptionsService.findAllForUser(req.user.id);
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: CreateSubscriptionDto, @Req() req: any) {
    // Only allow update if user owns the subscription
    return this.subscriptionsService.update(id, { ...dto, userId: req.user.id });
  }
  @Delete(':id')
  async cancel(@Param('id') id: number, @Req() req: any) {
    // Only allow cancel if user owns the subscription
    return this.subscriptionsService.cancel(id, req.user.id);
  }

  @Patch(':id/pause')
  async pauseOrSkip(
    @Param('id') id: number,
    @Body() body: { nextDelivery: string },
    @Req() req: any
  ) {
    // Only allow pause/skip if user owns the subscription
    return this.subscriptionsService.pauseOrSkip(id, req.user.id, body.nextDelivery);
  }
}
