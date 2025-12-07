import { apiClient } from './api';
import * as SecureStore from 'expo-secure-store';
import { User, AuthToken } from '../types';

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

const AUTH_TOKEN_KEY = 'auth_token';
// Platform detection
const isWeb = typeof window !== 'undefined' && typeof window.document !== 'undefined';



// Storage helpers
const storage = {
  async setItem(key: string, value: string) {
    if (isWeb) {
      window.localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },
  async getItem(key: string): Promise<string | null> {
    if (isWeb) {
      return window.localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  },
  async deleteItem(key: string) {
    if (isWeb) {
      window.localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  },
};
const USER_KEY = 'user_data';

export const authService = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    try {
      console.log('📝 Registering user:', payload.email);
      const response = await apiClient.getClient().post<AuthResponse>(
        '/auth/register',
        payload
      );
      
      console.log('✅ Registration successful');
      // Store token securely (web/mobile)
      await storage.setItem(AUTH_TOKEN_KEY, response.data.accessToken);
      console.log('✅ Token stored securely');
      
      return response.data;
    } catch (error: any) {
      console.error('❌ Registration error:', error?.response?.data || error?.message);
      throw error;
    }
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    try {
      console.log('🔐 Logging in user:', payload.email);
      const response = await apiClient.getClient().post<AuthResponse>(
        '/auth/login',
        payload
      );
      
      console.log('✅ Login successful');
      // Store token securely (web/mobile)
      await storage.setItem(AUTH_TOKEN_KEY, response.data.accessToken);
      console.log('✅ Token stored securely');
      
      return response.data;
    } catch (error: any) {
      console.error('❌ Login error:', error?.response?.data || error?.message);
      throw error;
    }
  },

  async getProfile(): Promise<User> {
    try {
      console.log('📋 Fetching profile...');
      const response = await apiClient.getClient().get<User>('/auth/profile');
      console.log('✅ Profile fetched successfully');
      return response.data;
    } catch (error: any) {
      console.error('❌ Get profile error:', error?.response?.data || error?.message);
      throw error;
    }
  },

  async updateProfile(payload: { firstName?: string; lastName?: string; phone?: string; }): Promise<User> {
    try {
      console.log('🔧 Updating profile...');
      const response = await apiClient.getClient().patch<User>('/auth/profile', payload);
      console.log('✅ Profile updated');
      return response.data;
    } catch (error: any) {
      console.error('❌ Update profile error:', error?.response?.data || error?.message);
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      console.log('🚪 Logging out...');
      await storage.deleteItem(AUTH_TOKEN_KEY);
      await storage.deleteItem(USER_KEY);
      console.log('✅ Logged out successfully');
    } catch (error) {
      console.error('❌ Error logging out:', error);
    }
  },

  async getStoredToken(): Promise<string | null> {
    try {
      console.log('🔑 Retrieving stored token...');
      const token = await storage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        console.log('✅ Token found in storage');
      } else {
        console.log('⚠️ No token found in storage');
      }
      return token;
    } catch (error) {
      console.error('❌ Error retrieving token:', error);
      return null;
    }
  },

  async changePassword(currentPassword: string, newPassword: string) {
    try {
      console.log('🔒 Changing password...');
      const response = await apiClient.getClient().patch('/auth/change-password', { currentPassword, newPassword });
      console.log('✅ Password changed');
      return response.data;
    } catch (error: any) {
      console.error('❌ Change password error:', error?.response?.data || error?.message);
      throw error;
    }
  },

  async uploadAvatar(payload: { filename: string; contentType: string; base64: string }) {
    try {
      console.log('📷 Uploading avatar...');
      const response = await apiClient.getClient().post('/auth/avatar', payload);
      console.log('✅ Avatar uploaded');
      return response.data;
    } catch (error: any) {
      console.error('❌ Avatar upload error:', error?.response?.data || error?.message);
      throw error;
    }
  },

  async checkAuthStatus(): Promise<boolean> {
    try {
      console.log('🔍 Checking auth status...');
      const token = await this.getStoredToken();
      if (!token) {
        console.log('⚠️ No token found, user not authenticated');
        return false;
      }

      console.log('✅ Token found, verifying with backend...');
      await this.getProfile();
      console.log('✅ Auth status verified');
      return true;
    } catch (error) {
      console.error('❌ Auth check failed:', error);
      return false;
    }
  },
};
