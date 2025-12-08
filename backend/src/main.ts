import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SupabaseService } from './services/supabase.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Debug: Print JWT secret for troubleshooting
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  
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

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);

  // Check DB connection and print user count (after app is fully initialized)
  try {
    const supabaseService = app.get(SupabaseService);
    if (supabaseService) {
      const client = supabaseService.getClient();
      const { data, error } = await client.from('users').select('*');
      if (error) {
        console.error('❌ Supabase DB connection error:', error.message);
      } else {
        console.log(`✅ Supabase DB connected. Users table row count: ${data ? data.length : 0}`);
      }
    }
  } catch (err) {
    // Silently skip if DB check fails - app still runs
  }
}

bootstrap();
