import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useSubscriptionFlow } from '../../stores/useSubscriptionFlow';

export default function AddressInputScreen({ navigation }: any) {
  const setAddress = useSubscriptionFlow((s) => s.setAddress);
  const setRecipientName = useSubscriptionFlow((s) => s.setRecipientName);
  const setPhone = useSubscriptionFlow((s) => s.setPhone);
  const [recipientName, setRecipientNameLocal] = useState('');
  const [phone, setPhoneLocal] = useState('');
  const [street, setStreet] = useState('');
  const [zip, setZip] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const city = 'Praha';

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!recipientName.trim()) newErrors.recipientName = 'Full name is required.';
    if (!phone.trim()) newErrors.phone = 'Phone is required.';
    else if (!/^\d{9,15}$/.test(phone.trim())) newErrors.phone = 'Phone must be 9–15 digits.';
    if (!street.trim()) newErrors.street = 'Street is required.';
    if (!zip.trim()) newErrors.zip = 'ZIP is required.';
    else if (!/^\d{5}$/.test(zip.trim())) newErrors.zip = 'ZIP must be exactly 5 digits.';
    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setRecipientName(recipientName);
    setPhone(phone);
    setAddress({ street, city, zip, note });
    navigation.navigate('DeliveryWindow');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Delivery Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={recipientName}
        onChangeText={setRecipientNameLocal}
        autoCapitalize="words"
      />
      <Text style={styles.hint}>Enter your full name.</Text>
      {errors.recipientName ? <Text style={styles.error}>{errors.recipientName}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhoneLocal}
        keyboardType="phone-pad"
        maxLength={15}
      />
      <Text style={styles.hint}>Phone must be 9–15 digits.</Text>
      {errors.phone ? <Text style={styles.error}>{errors.phone}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Street"
        value={street}
        onChangeText={setStreet}
      />
      {errors.street ? <Text style={styles.error}>{errors.street}</Text> : null}
      <TextInput
        style={[styles.input, styles.cityInput]}
        placeholder="City"
        value={city}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="ZIP Code"
        value={zip}
        onChangeText={setZip}
        keyboardType="numeric"
        maxLength={5}
      />
      <Text style={styles.hint}>ZIP must be exactly 5 digits.</Text>
      {errors.zip ? <Text style={styles.error}>{errors.zip}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Note (optional)"
        value={note}
        onChangeText={setNote}
      />
      <Button
        title="Next"
        onPress={handleNext}
        disabled={Object.keys(validate()).length > 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 20 },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  cityInput: {
    backgroundColor: '#f0f0f0',
    color: '#888',
  },
  error: {
    color: '#d00',
    fontSize: 13,
    marginBottom: 6,
    alignSelf: 'flex-start',
    width: '80%',
  },
  hint: {
    color: '#888',
    fontSize: 12,
    marginBottom: 2,
    alignSelf: 'center',
    textAlign: 'left',
    width: '80%',
    paddingLeft: 10,
    marginTop: -8,
  },
});
