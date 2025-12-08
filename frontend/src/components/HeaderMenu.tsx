import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, Pressable, StyleSheet, Alert } from 'react-native';
import { useAuthStore } from '../store/authStore';

export default function HeaderMenu({ navigation }: { navigation: any }) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const handleProfile = () => {
    setOpen(false);
    navigation.navigate('Profile');
  };

  const handleLogout = () => {
    setOpen(false);
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => {
        logout();
        // Ensure isAuthenticated is false so navigator switches to Auth stack
        setTimeout(() => {
          navigation.navigate('Login');
        }, 100);
      } }
    ]);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)} style={styles.button}>
        <Text style={styles.icon}>{user?.firstName ? user.firstName[0].toUpperCase() : '☰'}</Text>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.menuContainer}>
            <Pressable onPress={handleProfile} style={styles.item}>
              <Text style={styles.itemText}>Profile</Text>
            </Pressable>
            <Pressable onPress={() => { setOpen(false); /* placeholder for future items */ }} style={styles.item}>
              <Text style={styles.itemText}>Settings</Text>
            </Pressable>
            <Pressable onPress={handleLogout} style={styles.item}>
              <Text style={[styles.itemText, { color: '#d00' }]}>Logout</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: { paddingHorizontal: 12, paddingVertical: 6, marginRight: 8 },
  icon: { fontSize: 18, color: '#333' },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'flex-start' },
  menuContainer: { backgroundColor: '#fff', marginTop: 50, marginRight: 8, alignSelf: 'flex-end', borderRadius: 8, elevation: 6, paddingVertical: 6, minWidth: 160 },
  item: { paddingVertical: 12, paddingHorizontal: 14 },
  itemText: { fontSize: 16 },
});
