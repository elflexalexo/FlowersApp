import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const SubscriptionsListScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Subscriptions</Text>
      <Text style={styles.subtitle}>No subscriptions yet</Text>
      
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
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
