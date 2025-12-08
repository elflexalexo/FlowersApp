import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { SupabaseService } from './services/supabase.service';
import { SubscriptionsController } from './modules/subscriptions/subscriptions.controller';
import { SubscriptionsService } from './modules/subscriptions/subscriptions.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
  ],
  controllers: [AppController, SubscriptionsController],
  providers: [AppService, SupabaseService, SubscriptionsService],
  exports: [SupabaseService],
})
export class AppModule {}
