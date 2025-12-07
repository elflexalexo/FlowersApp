import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView, Image, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';

export const ProfileScreen = ({ navigation }: any) => {
  const { user, setUser, logout } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const handleLogout = async () => {
    await authService.logout();
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    // Validate locally
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert('Validation', 'First and last name are required.');
      return;
    }

    setSaving(true);
    try {
      const updated = await authService.updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim() || undefined,
      });

      setUser(updated as any);
      setEditing(false);
      Alert.alert('Profile updated', 'Your profile has been saved.');
    } catch (err: any) {
      console.error('Update failed', err?.response?.data || err?.message);
      Alert.alert('Error', err?.response?.data?.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const confirmLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: handleLogout },
    ]);
  };

  const pickAvatar = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Not supported', 'Avatar upload from web is not supported in this flow.');
      return;
    }

    try {
      const res = await new Promise<any>((resolve) =>
        launchImageLibrary(
          {
            mediaType: 'photo',
            includeBase64: true,
            maxWidth: 1024,
            maxHeight: 1024,
            quality: 0.8,
          },
          (response) => resolve(response),
        ),
      );

      if (res?.didCancel) return;
      const asset = res?.assets?.[0];
      if (!asset) {
        Alert.alert('Error', 'No image selected');
        return;
      }

      if (!asset.base64) {
        Alert.alert('Error', 'Failed to read image data');
        return;
      }

      // Upload
      setSaving(true);
      try {
        const filename = asset.fileName || `avatar-${Date.now()}.jpg`;
        const contentType = asset.type || 'image/jpeg';
        const base64 = asset.base64;

        const result = await authService.uploadAvatar({ filename, contentType, base64 });
        if (result?.publicUrl) {
          setUser({ ...(user as any), avatar: result.publicUrl } as any);
          Alert.alert('Success', 'Avatar uploaded');
        } else {
          Alert.alert('Uploaded', 'Avatar uploaded but no public URL returned');
        }
      } catch (uploadErr: any) {
        console.error('Upload error', uploadErr?.response?.data || uploadErr?.message);
        Alert.alert('Upload failed', uploadErr?.response?.data?.message || 'Failed to upload avatar');
      } finally {
        setSaving(false);
      }
    } catch (err) {
      console.error('Picker error', err);
      Alert.alert('Error', 'Failed to open image picker');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.header}>
        {user?.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}</Text>
          </View>
        )}
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={() => setEditing(!editing)}>
          <Text style={styles.editButtonText}>{editing ? 'Cancel' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Info</Text>

        <Text style={styles.label}>First name</Text>
        <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} editable={editing} />

        <Text style={styles.label}>Last name</Text>
        <TextInput style={styles.input} value={lastName} onChangeText={setLastName} editable={editing} />

        <Text style={styles.label}>Phone</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} editable={editing} keyboardType="phone-pad" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <Text style={styles.rowLabel}>Email</Text>
        <Text style={styles.rowValue}>{user?.email}</Text>
        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('ChangePassword' as any)}>
          <Text style={styles.linkText}>Change password</Text>
        </TouchableOpacity>
      </View>

      {editing ? (
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.saveButton, saving ? { opacity: 0.6 } : {}]} onPress={handleSave} disabled={saving}>
            <Text style={styles.saveText}>{saving ? 'Saving...' : 'Save changes'}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#fde6ee', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 28, color: '#ff6b9d', fontWeight: '700' },
  avatarImage: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#eee' },
  headerInfo: { flex: 1, marginLeft: 12 },
  name: { fontSize: 20, fontWeight: '700', color: '#222' },
  email: { fontSize: 14, color: '#666', marginTop: 4 },
  editButton: { paddingHorizontal: 12, paddingVertical: 6 },
  editButtonText: { color: '#ff6b9d', fontWeight: '600' },

  section: { marginBottom: 20, paddingVertical: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 8 },
  label: { fontSize: 13, color: '#888', marginTop: 8 },
  input: { borderWidth: 1, borderColor: '#eee', padding: 10, borderRadius: 8, marginTop: 6, backgroundColor: '#fff' },

  rowLabel: { fontSize: 13, color: '#888', marginTop: 8 },
  rowValue: { fontSize: 15, color: '#111', marginTop: 6 },
  linkButton: { marginTop: 8 },
  linkText: { color: '#ff6b9d', fontWeight: '600' },

  actions: { marginTop: 10 },
  logoutButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ff6b9d', padding: 12, borderRadius: 8, alignItems: 'center' },
  logoutText: { color: '#ff6b9d', fontWeight: '700' },
  saveButton: { backgroundColor: '#ff6b9d', padding: 12, borderRadius: 8, alignItems: 'center' },
  saveText: { color: '#fff', fontWeight: '700' },
});
