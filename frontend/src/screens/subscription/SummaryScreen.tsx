import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSubscriptionFlow } from '../../stores/useSubscriptionFlow';
import { useAuthStore } from '../../store/authStore';
import { createSubscription } from '../../services/subscriptionService';

export default function SummaryScreen({ navigation }: any) {
  const { boxCount, planPrice, address, deliveryDay, reset } = useSubscriptionFlow();
  const token = useAuthStore((s) => s.token);

    const handleConfirm = async () => {
      const payload = { boxCount, planPrice, address, deliveryDay };
      // Validate payload
      if (
        typeof payload.boxCount !== 'number' ||
        typeof payload.planPrice !== 'number' ||
        !payload.address ||
        typeof payload.address.street !== 'string' ||
        typeof payload.address.city !== 'string' ||
        typeof payload.address.zip !== 'string' ||
        !['Wednesday', 'Friday'].includes(payload.deliveryDay)
      ) {
        console.log('❌ Invalid payload:', payload);
        alert('Please fill out all fields correctly before confirming.');
        return;
      }
      console.log('📦 Submitting payload:', payload);
      try {
        await createSubscription(payload, token!);
        reset();
        navigation.navigate('SubscriptionsList'); // Navigate to the main subscriptions list
      } catch (error) {
        console.log('❌ Subscription creation error:', error);
        alert('Subscription creation failed. Please check your details and try again.');
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Summary</Text>
      <Text>Boxes: {boxCount}</Text>
      <Text>Price: ${planPrice}</Text>
      <Text>Address: {address.street}, {address.city}, {address.zip}</Text>
      <Text>Note: {address.note}</Text>
      <Text>Delivery Day: {deliveryDay}</Text>
      <Button title="Confirm Subscription" onPress={handleConfirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 20 },
});
