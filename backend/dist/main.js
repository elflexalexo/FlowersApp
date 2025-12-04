"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("./services/supabase.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Enable validation
    app.useGlobalPipes(new common_1.ValidationPipe({
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
        const supabaseService = app.get(supabase_service_1.SupabaseService);
        if (supabaseService) {
            const client = supabaseService.getClient();
            const { data, error } = await client.from('users').select('*');
            if (error) {
                console.error('❌ Supabase DB connection error:', error.message);
            }
            else {
                console.log(`✅ Supabase DB connected. Users table row count: ${data ? data.length : 0}`);
            }
        }
    }
    catch (err) {
        // Silently skip if DB check fails - app still runs
    }
}
bootstrap();
//# sourceMappingURL=main.js.map