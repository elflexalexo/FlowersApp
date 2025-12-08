
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSubscriptionFlow } from '../../stores/useSubscriptionFlow';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function DeliveryWindowScreen({ navigation }: any) {
  const setDeliveryDays = useSubscriptionFlow((s) => s.setDeliveryDays);
  const setDeliveryTime = useSubscriptionFlow((s) => s.setDeliveryTime);

  const handleSelect = (day: string) => {
    setDeliveryDays([day]);
    setDeliveryTime({ from: '09:00', to: '18:00' });
    navigation.navigate('Summary');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Delivery Day</Text>
      {DAYS.map((day) => (
        <TouchableOpacity
          key={day}
          style={styles.dayButton}
          onPress={() => handleSelect(day)}
        >
          <Text style={styles.dayButtonText}>{day} (09:00 - 18:00)</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.infoText}>We deliver to offices and homes.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 20, marginBottom: 20 },
  dayButton: {
    backgroundColor: '#FF69B4',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    width: 260,
    alignItems: 'center',
  },
  dayButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    marginTop: 24,
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
  },
});
