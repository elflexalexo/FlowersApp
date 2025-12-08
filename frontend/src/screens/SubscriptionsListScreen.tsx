import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getSubscriptions } from '../services/subscriptionService';
import { useAuthStore } from '../store/authStore';

export const SubscriptionsListScreen = ({ navigation }: any) => {
  const token = useAuthStore((s) => s.token);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: () => getSubscriptions(token!),
    enabled: !!token,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Subscriptions</Text>
      {isLoading && <ActivityIndicator size="large" color="#ff6b9d" />}
      {isError && <Text style={{ color: 'red', marginBottom: 10 }}>Failed to load subscriptions.</Text>}
      {!isLoading && !isError && (!data || data.length === 0) && (
        <Text style={styles.subtitle}>No subscriptions yet</Text>
      )}
      {!isLoading && !isError && data && data.length > 0 && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Plan: {item.boxCount} boxes/month</Text>
              <Text>Price: ${item.planPrice}</Text>
              <Text>Address: {item.address.street}, {item.address.city}, {item.address.zip}</Text>
              <Text>Delivery Day: {item.deliveryDay}</Text>
              <Text>Status: {item.status}</Text>
              <Text>Next Delivery: {item.nextDelivery}</Text>
            </View>
          )}
        />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SubscriptionWizard')}
      >
        <Text style={styles.buttonText}>Add Subscription</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ff6b9d',
    padding: 15,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
