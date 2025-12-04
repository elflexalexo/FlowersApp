import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Navigation } from './src/navigation/Navigation';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Error boundary component
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // ErrorUtils is only available in React Native (not web)
    // For web, rely on React error boundaries
    // For mobile, you can add ErrorUtils if needed
    // Removed to prevent web crash
  }, []);

  if (hasError) {
    return (
      <View style={{ flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ff0000', marginBottom: 10 }}>
          ❌ App Error Detected
        </Text>
        <Text style={{ fontSize: 14, color: '#333', marginBottom: 20 }}>
          {error}
        </Text>
        <Text style={{ fontSize: 12, color: '#666' }}>
          Check the console logs for more details. Try reloading the app (press 'r' in terminal).
        </Text>
      </View>
    );
  }

  return <>{children}</>;
};

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        console.log('🚀 App is preparing...');
        // Simulate loading resources or perform any async operations
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('✅ App prepared successfully');
      } catch (error) {
        console.error('❌ Error preparing app:', error);
      } finally {
        // Always hide the splash screen when done
        try {
          await SplashScreen.hideAsync();
          console.log('✅ Splash screen hidden');
        } catch (error) {
          console.error('❌ Error hiding splash screen:', error);
        }
        setAppReady(true);
      }
    }

    prepare();
  }, []);

  if (!appReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log('🎨 Rendering Navigation...');

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <Navigation />
        </QueryClientProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
