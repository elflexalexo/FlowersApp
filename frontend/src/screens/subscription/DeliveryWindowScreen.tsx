import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSubscriptionFlow } from '../../stores/useSubscriptionFlow';

export default function DeliveryWindowScreen({ navigation }: any) {
  const setDeliveryDay = useSubscriptionFlow((s) => s.setDeliveryDay);

  const handleSelect = (day: 'Wednesday' | 'Friday') => {
    setDeliveryDay(day);
    navigation.navigate('Summary');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Delivery Day</Text>
      <Button title="Wednesday" onPress={() => handleSelect('Wednesday')} />
      <Button title="Friday" onPress={() => handleSelect('Friday')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 20 },
});
