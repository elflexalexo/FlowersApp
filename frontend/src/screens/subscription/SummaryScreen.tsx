import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSubscriptionFlow } from '../../stores/useSubscriptionFlow';
import { useAuthStore } from '../../store/authStore';
import { createSubscription } from '../../services/subscriptionService';
import { useQueryClient } from '@tanstack/react-query';

export default function SummaryScreen({ navigation }: any) {
  const {
    boxCount,
    planPrice,
    address,
    recipientName,
    phone,
    deliveryDays,
    deliveryTime,
    reset,
  } = useSubscriptionFlow();
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  const handleConfirm = async () => {
    const payload = {
      boxCount,
      planPrice,
      address,
      recipientName,
      phone,
      deliveryDays,
      deliveryTime,
    };
    // Basic validation
    if (
      typeof boxCount !== 'number' ||
      typeof planPrice !== 'number' ||
      !address ||
      typeof address.street !== 'string' ||
      typeof address.city !== 'string' ||
      typeof address.zip !== 'string' ||
      !recipientName ||
      !phone ||
      !deliveryDays.length
    ) {
      console.log('❌ Invalid payload:', payload);
      alert('Please fill out all fields correctly before confirming.');
      return;
    }
    if (!token) {
      alert('You are not logged in. Please log in again.');
      return;
    }
    console.log('📦 Submitting payload:', payload);
    try {
      await createSubscription(payload, token);
      reset();
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      navigation.navigate('SubscriptionsList');
    } catch (error) {
      console.log('❌ Subscription creation error:', error);
      alert('Subscription creation failed. Please check your details and try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Summary</Text>
      <View style={styles.summaryBox}>
        <Text style={styles.label}>Recipient:</Text>
        <Text style={styles.value}>{recipientName}</Text>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{phone}</Text>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{address.street}, {address.city}, {address.zip}</Text>
        {address.note ? <Text style={styles.value}>Note: {address.note}</Text> : null}
        <Text style={styles.label}>Plan:</Text>
        <Text style={styles.value}>{boxCount} box(es)</Text>
        <Text style={styles.label}>Delivery Day:</Text>
        <Text style={styles.value}>{deliveryDays[0]} (09:00 - 18:00)</Text>
        <Text style={styles.label}>Total Price:</Text>
        <Text style={styles.price}>{planPrice} Kč</Text>
      </View>
      <Button title="Confirm Subscription" onPress={handleConfirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 24, fontWeight: 'bold' },
  summaryBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    marginBottom: 24,
    width: 320,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  label: { fontWeight: 'bold', marginTop: 8, color: '#888' },
  value: { fontSize: 16, marginBottom: 2 },
  price: { fontSize: 28, fontWeight: 'bold', color: '#FF69B4', marginTop: 12, marginBottom: 8, textAlign: 'center' },
});
