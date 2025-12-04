import { SupabaseClient } from '@supabase/supabase-js';
export declare class SupabaseService {
    private supabase;
    constructor();
    getClient(): SupabaseClient;
    /**
     * Get the Supabase client with user context (for RLS policies)
     */
    getClientWithAuth(token: string): SupabaseClient;
}
//# sourceMappingURL=supabase.service.d.ts.map