import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loginError, setLoginError] = useState<string | null>(null);
  const { setUser, setToken, setAuthenticated } = useAuthStore();

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email || email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password || password.trim() === '') {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getErrorMessage = (error: any): string => {
    // Network error
    if (!error?.response) {
      return 'Connection failed. Please check your internet and ensure the backend is running.';
    }

    // 401 Unauthorized - wrong credentials
    if (error?.response?.status === 401) {
      const msg = error.response.data?.message || '';
      if (msg.includes('Invalid email or password')) {
        return 'Incorrect email or password. Please try again.';
      }
      return 'Authentication failed. Please check your credentials.';
    }

    // 400 Bad request
    if (error?.response?.status === 400) {
      return error.response.data?.message || 'Invalid request. Please check your information.';
    }

    // 500 Server error
    if (error?.response?.status === 500) {
      return 'Server error. Please try again later.';
    }

    // Generic fallback
    return error?.response?.data?.message || 'Login failed. Please try again.';
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const result = await authService.login({ 
        email: email.trim().toLowerCase(), 
        password 
      });
      setUser(result.user);
      setToken(result.accessToken);
      setAuthenticated(true);
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      // show inline error and clear password for wrong credentials
      setLoginError(errorMessage);
      if (error?.response?.status === 401) {
        setPassword('');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to FlowersApp</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>
      
      <View style={styles.inputGroup}>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors({ ...errors, email: undefined });
            if (loginError) setLoginError(null);
          }}
          editable={!loading}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>
      
      <View style={styles.inputGroup}>
        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors({ ...errors, password: undefined });
            if (loginError) setLoginError(null);
          }}
          secureTextEntry
          editable={!loading}
          placeholderTextColor="#999"
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>
      
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Register here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ff4444',
    backgroundColor: '#fff5f5',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#ff6b9d',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#ff6b9d',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});
