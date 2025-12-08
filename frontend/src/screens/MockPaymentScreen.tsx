import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';

export default function MockPaymentScreen({ route, navigation }: any) {
  const { subscription } = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handlePay = () => {
    setError('');
    if (!cardNumber || !cardName || !expiry || !cvv) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Simulate status update (in real app, call backend)
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mock Payment</Text>
      <Text style={styles.subtitle}>Pay for Subscription #{subscription.id}</Text>
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        keyboardType="numeric"
        maxLength={16}
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Cardholder Name"
        value={cardName}
        onChangeText={setCardName}
      />
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 8 }]}
          placeholder="MM/YY"
          maxLength={5}
          value={expiry}
          onChangeText={setExpiry}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="CVV"
          keyboardType="numeric"
          maxLength={4}
          value={cvv}
          onChangeText={setCvv}
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity
        style={[styles.button, loading && { backgroundColor: '#ccc' }]}
        onPress={handlePay}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Processing...' : 'Pay Now'}</Text>
      </TouchableOpacity>
      <Modal visible={success} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 20, color: '#0a0', fontWeight: 'bold' }}>Payment Successful!</Text>
            <Text style={{ marginTop: 10 }}>Subscription marked as PAID.</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#ff6b9d',
    padding: 15,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: '#d00',
    fontSize: 14,
    marginBottom: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
  },
});
