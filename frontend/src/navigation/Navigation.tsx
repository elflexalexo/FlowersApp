import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, Text } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';

// Auth Screens
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

// App Screens
import { SubscriptionsListScreen } from '../screens/SubscriptionsListScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ChangePasswordScreen } from '../screens/ChangePasswordScreen';
import HeaderMenu from '../components/HeaderMenu';
import SubscriptionStack from './SubscriptionStack';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const { isAuthenticated, setAuthenticated, setUser, setToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      console.log('🔐 Checking authentication status...');
      const isAuth = await authService.checkAuthStatus();
      
      if (isAuth) {
        console.log('✅ User is authenticated');
        setAuthenticated(true);
        
        try {
          const profile = await authService.getProfile();
          console.log('📝 Profile loaded:', profile.email);
          setUser(profile);
          
          const token = await authService.getStoredToken();
          if (token) {
            console.log('🔑 Token found and set');
            setToken(token);
          }
        } catch (profileError) {
          console.error('❌ Error loading profile:', profileError);
          setError('Failed to load profile');
        }
      } else {
        console.log('❌ User is not authenticated');
        setAuthenticated(false);
      }
    } catch (error) {
      console.error('❌ Auth bootstrap error:', error);
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      console.log('✅ Navigation bootstrapped');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#ff6b9d" />
        <Text style={{ marginTop: 10, color: '#666' }}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ff0000', marginBottom: 10 }}>
          ❌ Navigation Error
        </Text>
        <Text style={{ fontSize: 14, color: '#333', textAlign: 'center' }}>
          {error}
        </Text>
        <Text style={{ fontSize: 12, color: '#666', marginTop: 20, textAlign: 'center' }}>
          Try reloading the app
        </Text>
      </View>
    );
  }

  console.log('🎯 Navigation rendering with auth state:', isAuthenticated);

  return (
    <NavigationContainer
      onReady={() => console.log('✅ Navigation container ready')}
      onStateChange={() => console.log('📍 Navigation state changed')}
    >
      {isAuthenticated ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#ff6b9d',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="SubscriptionsList"
            component={SubscriptionsListScreen}
            options={({ navigation }) => ({
              title: 'My Subscriptions',
              headerRight: () => <HeaderMenu navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="SubscriptionWizard"
            component={SubscriptionStack}
            options={{ title: 'New Subscription', headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: 'Profile' }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
            options={{ title: 'Change Password' }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
