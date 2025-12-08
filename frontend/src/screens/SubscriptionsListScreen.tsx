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
              <Text style={styles.cardTitle}>🌸 {item.boxCount} box{item.boxCount > 1 ? 'es' : ''}/month</Text>
              <Text style={styles.price}>Price: <Text style={{color:'#ff6b9d', fontWeight:'bold'}}>{item.planPrice} Kč</Text></Text>
              <Text style={styles.address}><Text style={{fontWeight:'bold'}}>Address:</Text> {item.address.street}, {item.address.city}, {item.address.zip}</Text>
              {item.recipientName && <Text style={styles.recipient}><Text style={{fontWeight:'bold'}}>Recipient:</Text> {item.recipientName}</Text>}
              <Text style={styles.delivery}><Text style={{fontWeight:'bold'}}>Delivery:</Text> {item.deliveryDays ? item.deliveryDays.join(', ') : item.deliveryDay} {item.deliveryTime ? `(${item.deliveryTime.from}–${item.deliveryTime.to})` : ''}</Text>
              <Text style={styles.status}><Text style={{fontWeight:'bold'}}>Status:</Text> {item.status}</Text>
              <Text style={styles.nextDelivery}><Text style={{fontWeight:'bold'}}>Next Delivery:</Text> {item.nextDelivery}</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('EditSubscriptionScreen', { subscription: item })}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#ff6b9d',
  },
  price: {
    fontSize: 16,
    marginBottom: 4,
  },
  address: {
    fontSize: 15,
    marginBottom: 2,
  },
  recipient: {
    fontSize: 15,
    marginBottom: 2,
  },
  delivery: {
    fontSize: 15,
    marginBottom: 2,
  },
  status: {
    fontSize: 15,
    marginBottom: 2,
  },
  nextDelivery: {
    fontSize: 15,
    marginBottom: 2,
  },
});
