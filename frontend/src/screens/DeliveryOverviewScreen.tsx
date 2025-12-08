import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getSubscriptions } from '../services/subscriptionService';
import { useAuthStore } from '../store/authStore';

export default function DeliveryOverviewScreen() {
  const token = useAuthStore((s) => s.token);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: () => getSubscriptions(token!),
    enabled: !!token,
  });

  // Flatten all deliveries for overview
  const deliveries = (data || []).map((sub: any) => ({
    id: sub.id,
    nextDelivery: sub.nextDelivery,
    boxCount: sub.boxCount,
    address: `${sub.address.street}, ${sub.address.city}, ${sub.address.zip}`,
    recipient: sub.recipientName,
    status: sub.status,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Overview</Text>
      {isLoading && <Text>Loading...</Text>}
      {isError && <Text style={{ color: 'red' }}>Failed to load deliveries.</Text>}
      {!isLoading && !isError && deliveries.length === 0 && (
        <Text style={styles.subtitle}>No upcoming deliveries.</Text>
      )}
      <FlatList
        data={deliveries}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.deliveryDate}>Next Delivery: {item.nextDelivery || 'N/A'}</Text>
            <Text>Box Count: {item.boxCount}</Text>
            <Text>Recipient: {item.recipient}</Text>
            <Text>Address: {item.address}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ff6b9d',
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  deliveryDate: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#ff6b9d',
  },
});
