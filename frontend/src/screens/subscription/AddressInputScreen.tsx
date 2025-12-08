import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useSubscriptionFlow } from '../../stores/useSubscriptionFlow';

export default function AddressInputScreen({ navigation }: any) {
  const setAddress = useSubscriptionFlow((s) => s.setAddress);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [note, setNote] = useState('');

  const handleNext = () => {
    setAddress({ street, city, zip, note });
    navigation.navigate('DeliveryWindow');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Delivery Address</Text>
      <TextInput style={styles.input} placeholder="Street" value={street} onChangeText={setStreet} />
      <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />
      <TextInput style={styles.input} placeholder="Zip" value={zip} onChangeText={setZip} />
      <TextInput style={styles.input} placeholder="Note (optional)" value={note} onChangeText={setNote} />
      <Button title="Next" onPress={handleNext} disabled={!street || !city || !zip} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 20 },
  input: { width: '80%', borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, borderRadius: 4 },
});
