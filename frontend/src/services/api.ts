import axios, { AxiosInstance, AxiosError } from 'axios';
import { useAuthStore } from '../store/authStore';
import { Platform } from 'react-native';

// Use emulator host for Android, localhost otherwise. This avoids needing adb reverse.
const DEFAULT_LOCAL = 'http://localhost:3000';
const ANDROID_EMULATOR_LOCAL = 'http://10.0.2.2:3000';
const API_URL = process.env.EXPO_PUBLIC_API_URL || (Platform.OS === 'android' ? ANDROID_EMULATOR_LOCAL : DEFAULT_LOCAL);
const API_TIMEOUT = parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || '30000');

// Platform detection
const isWeb = typeof window !== 'undefined' && typeof window.document !== 'undefined';

// Storage helpers
const storage = {
  async getItem(key: string): Promise<string | null> {
    if (isWeb) {
      return window.localStorage.getItem(key);
    } else {
      // On mobile, use expo-secure-store
      try {
        const SecureStore = require('expo-secure-store');
        return await SecureStore.getItemAsync(key);
      } catch (error) {
        console.error('Error accessing secure store:', error);
        return null;
      }
    }
  },
};

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add token
    this.client.interceptors.request.use(
      async (config) => {
        try {
          const token = await storage.getItem('auth_token');
          if (token) {
            config.headers.Authorization = 'Bearer ' + token;
          }
        } catch (error) {
          console.log('Error reading token from storage:', error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          useAuthStore.getState().logout();
        }
        return Promise.reject(error);
      }
    );
  }

  getClient(): AxiosInstance {
    return this.client;
  }
}

export const apiClient = new ApiClient();
