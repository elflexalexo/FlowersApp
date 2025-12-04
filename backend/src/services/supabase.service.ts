import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      throw new Error('Missing Supabase credentials in environment variables');
    }

    this.supabase = createClient(url, key);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  /**
   * Get the Supabase client with user context (for RLS policies)
   */
  getClientWithAuth(token: string): SupabaseClient {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;

    if (!url || !key) {
      throw new Error('Missing Supabase credentials');
    }

    const client = createClient(url, key);
    client.auth.setSession({
        access_token: token,
        refresh_token: '',
    });

    return client;
  }
}
