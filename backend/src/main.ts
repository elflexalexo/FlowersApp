import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Enable CORS for React Native
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Check DB connection and print user count
  try {
    const { SupabaseService } = await import('./services/supabase.service');
    const supabaseService = new SupabaseService();
    const client = supabaseService.getClient();
    const { data, error } = await client.from('users').select('*');
    if (error) {
      console.error('❌ Supabase DB connection error:', error.message);
    } else {
      console.log(`✅ Supabase DB connected. Users table row count: ${data ? data.length : 0}`);
    }
  } catch (err) {
    console.error('❌ Supabase DB connection check failed:', err);
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
