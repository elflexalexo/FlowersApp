import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { authService } from '../services/authService';

export const ChangePasswordScreen = ({ navigation }: any) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = async () => {
    if (!currentPassword || !newPassword) {
      Alert.alert('Validation', 'Please enter both current and new password');
      return;
    }
    if (newPassword !== confirm) {
      Alert.alert('Validation', 'New password and confirm do not match');
      return;
    }

    setLoading(true);
    try {
      await authService.changePassword(currentPassword, newPassword);
      Alert.alert('Success', 'Password changed successfully');
      navigation.goBack();
    } catch (err: any) {
      Alert.alert('Error', err?.response?.data?.message || err?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      <Text style={styles.label}>Current password</Text>
      <TextInput style={styles.input} secureTextEntry value={currentPassword} onChangeText={setCurrentPassword} />

      <Text style={styles.label}>New password</Text>
      <TextInput style={styles.input} secureTextEntry value={newPassword} onChangeText={setNewPassword} />

      <Text style={styles.label}>Confirm new password</Text>
      <TextInput style={styles.input} secureTextEntry value={confirm} onChangeText={setConfirm} />

      <TouchableOpacity style={[styles.button, loading ? { opacity: 0.6 } : {}]} onPress={handleChange} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Change password'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  label: { fontSize: 13, color: '#666', marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#eee', padding: 10, borderRadius: 8, marginTop: 8 },
  button: { backgroundColor: '#ff6b9d', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: '700' },
});
